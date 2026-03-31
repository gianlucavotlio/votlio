-- Term Matching Progress Table
CREATE TABLE IF NOT EXISTS public.term_matching_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  level INTEGER NOT NULL,
  unlocked BOOLEAN DEFAULT FALSE,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, level)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_term_matching_user_id ON public.term_matching_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_term_matching_unlocked ON public.term_matching_progress(unlocked, completed);

-- Function to initialize term matching for a user
CREATE OR REPLACE FUNCTION init_term_matching()
RETURNS void AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get current user ID from auth context
  v_user_id := auth.uid();
  
  -- Check if already initialized
  IF NOT EXISTS (SELECT 1 FROM public.term_matching_progress WHERE user_id = v_user_id) THEN
    -- Initialize level 1 as unlocked, levels 2-3 as locked
    INSERT INTO public.term_matching_progress (user_id, level, unlocked, completed, score)
    VALUES 
      (v_user_id, 1, TRUE, FALSE, 0),
      (v_user_id, 2, FALSE, FALSE, 0),
      (v_user_id, 3, FALSE, FALSE, 0)
    ON CONFLICT (user_id, level) DO NOTHING;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to complete a term matching level
CREATE OR REPLACE FUNCTION complete_term_matching(
  p_level INTEGER,
  p_correct INTEGER,
  p_total INTEGER
)
RETURNS TABLE(
  passed BOOLEAN,
  points_earned INTEGER,
  next_level_unlocked BOOLEAN,
  is_replay BOOLEAN
) AS $$
DECLARE
  v_user_id UUID;
  v_passed BOOLEAN;
  v_points INTEGER;
  v_next_level_unlocked BOOLEAN;
  v_is_replay BOOLEAN;
  v_already_completed BOOLEAN;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();

  -- Check if this level was already completed (this is a replay)
  SELECT completed INTO v_already_completed
  FROM public.term_matching_progress
  WHERE user_id = v_user_id AND level = p_level;

  v_is_replay := COALESCE(v_already_completed, FALSE);

  -- Determine if passed (all correct)
  v_passed := (p_correct = p_total);

  -- Calculate points (100 XP for completion on first try, 0 if replay)
  v_points := CASE WHEN v_passed AND NOT v_is_replay THEN 100 ELSE 0 END;

  -- Update the completed level
  UPDATE public.term_matching_progress
  SET
    completed = v_passed,
    score = v_points,
    updated_at = CURRENT_TIMESTAMP
  WHERE user_id = v_user_id AND level = p_level;

  -- If passed and NOT a replay, unlock next level and award XP
  v_next_level_unlocked := FALSE;

  IF v_passed AND NOT p_is_replay THEN
    -- Unlock next level (if exists)
    UPDATE public.term_matching_progress
    SET
      unlocked = TRUE,
      updated_at = CURRENT_TIMESTAMP
    WHERE user_id = v_user_id AND level = (p_level + 1) AND level <= 3
    RETURNING TRUE INTO v_next_level_unlocked;

    -- Award XP to profile
    UPDATE public.profiles
    SET
      xp = xp + v_points,
      updated_at = CURRENT_TIMESTAMP
    WHERE user_id = v_user_id;

    -- Check if the update worked
    v_next_level_unlocked := COALESCE(v_next_level_unlocked, (p_level < 3));
  END IF;

  -- Return result with is_replay flag
  RETURN QUERY
  SELECT v_passed, v_points, v_next_level_unlocked, v_is_replay;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON TABLE public.term_matching_progress TO authenticated;
GRANT INSERT, UPDATE ON TABLE public.term_matching_progress TO authenticated;
GRANT EXECUTE ON FUNCTION init_term_matching() TO authenticated;
GRANT EXECUTE ON FUNCTION complete_term_matching(INTEGER, INTEGER, INTEGER) TO authenticated;
