import { Router, Request, Response } from 'express';
import { COMPANY_DETAILS } from '../../src/data/companyData';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: COMPANY_DETAILS
  });
});

export default router;
