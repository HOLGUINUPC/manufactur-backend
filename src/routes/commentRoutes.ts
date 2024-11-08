import { Router, Request, Response } from 'express';
import { createComment, getCommentsByPostId, deleteComment } from '../controllers/commentController';

const router = Router();

// Envolver cada controlador en una función anónima
router.post('/comments', (req: Request, res: Response) => {
    createComment(req, res);
});

router.get('/comments', (req: Request, res: Response) => {
    getCommentsByPostId(req, res);
});

router.delete('/comments/:commentId', (req: Request, res: Response) => {
    deleteComment(req, res);
});

export default router;
