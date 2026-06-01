import { Router } from 'express';
import userRouter from './user.routes.js';
import {eventRouter} from './event.router.js'
const apiRouter = Router();

apiRouter.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
  });
});

apiRouter.use('/users', userRouter);
apiRouter.use('/event', eventRouter);

export default apiRouter;
