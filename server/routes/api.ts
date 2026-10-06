import { Router } from 'express';
import inquiriesRouter from './inquiries';
import servicesRouter from './services';
import companyRouter from './company';
import healthRouter from './health';

const router = Router();

router.use('/health', healthRouter);
router.use('/company', companyRouter);
router.use('/services', servicesRouter);
router.use('/inquiries', inquiriesRouter);

export default router;
