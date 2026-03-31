import { Router, Request, Response } from 'express';
import { 
  getUserRankProgression, 
  getAllRanks,
  RankProgressionData 
} from '../lib/rankProgression';

const router = Router();

/**
 * GET /api/rank-progression/:userId
 * Get complete rank progression for a user
 */
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userXp = parseInt(req.query.xp as string, 10);

    if (!userId) {
      return res.status(400).json({ 
        error: 'User ID is required' 
      });
    }

    if (isNaN(userXp)) {
      return res.status(400).json({ 
        error: 'XP must be a valid number' 
      });
    }

    const rankProgression: RankProgressionData = await getUserRankProgression(userXp);

    return res.json({
      success: true,
      data: rankProgression
    });
  } catch (error) {
    console.error('Rank progression error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch rank progression',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/rank-progression/ranks/all
 * Get all available ranks
 */
router.get('/ranks/all', async (req: Request, res: Response) => {
  try {
    const ranks = await getAllRanks();

    return res.json({
      success: true,
      data: ranks
    });
  } catch (error) {
    console.error('Get all ranks error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch ranks',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
