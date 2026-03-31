-- Rank Progression Table
CREATE TABLE IF NOT EXISTS public.rank_progression (
  id BIGSERIAL PRIMARY KEY,
  rank_title TEXT NOT NULL UNIQUE,
  emoji TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_required INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert rank progression data
INSERT INTO public.rank_progression (rank_title, emoji, description, xp_required) VALUES
  ('Wähler', '🗳️', 'Anfänger', 0),
  ('Kandidat', '📋', 'Fortgeschrittener', 500),
  ('Abgeordneter', '🏛️', 'Experte', 2000),
  ('Minister', '👔', 'Meister', 5000),
  ('Bundeskanzler', '👑', 'Legende', 10000)
ON CONFLICT (rank_title) DO NOTHING;

-- Function to get user's current rank based on XP
CREATE OR REPLACE FUNCTION get_user_rank(user_xp INTEGER)
RETURNS TABLE(rank_title TEXT, emoji TEXT, description TEXT, xp_required INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rp.rank_title,
    rp.emoji,
    rp.description,
    rp.xp_required
  FROM public.rank_progression rp
  WHERE rp.xp_required <= user_xp
  ORDER BY rp.xp_required DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to get next rank
CREATE OR REPLACE FUNCTION get_next_rank(user_xp INTEGER)
RETURNS TABLE(rank_title TEXT, emoji TEXT, description TEXT, xp_required INTEGER, xp_until_next INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rp.rank_title,
    rp.emoji,
    rp.description,
    rp.xp_required,
    (rp.xp_required - user_xp) as xp_until_next
  FROM public.rank_progression rp
  WHERE rp.xp_required > user_xp
  ORDER BY rp.xp_required ASC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to get all ranks in progression order
CREATE OR REPLACE FUNCTION get_all_ranks()
RETURNS TABLE(rank_title TEXT, emoji TEXT, description TEXT, xp_required INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rp.rank_title,
    rp.emoji,
    rp.description,
    rp.xp_required
  FROM public.rank_progression rp
  ORDER BY rp.xp_required ASC;
END;
$$ LANGUAGE plpgsql;

-- Function to get rank progress from user profile
CREATE OR REPLACE FUNCTION get_rank_progress_from_profiles(p_user_id UUID)
RETURNS TABLE(xp INTEGER, rank_name TEXT, next_rank TEXT, next_rank_min_xp INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.xp,
    COALESCE(current_rank.rank_title, 'Wähler') as rank_name,
    next_rank_info.rank_title as next_rank,
    next_rank_info.xp_required as next_rank_min_xp
  FROM public.profiles p
  LEFT JOIN LATERAL (
    SELECT rank_title, xp_required
    FROM public.rank_progression rp
    WHERE rp.xp_required <= p.xp
    ORDER BY rp.xp_required DESC
    LIMIT 1
  ) current_rank ON true
  LEFT JOIN LATERAL (
    SELECT rank_title, xp_required
    FROM public.rank_progression rp
    WHERE rp.xp_required > p.xp
    ORDER BY rp.xp_required ASC
    LIMIT 1
  ) next_rank_info ON true
  WHERE p.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON TABLE public.rank_progression TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_rank(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_next_rank(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_all_ranks() TO authenticated;
GRANT EXECUTE ON FUNCTION get_rank_progress_from_profiles(UUID) TO authenticated;
