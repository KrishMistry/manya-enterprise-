import { Router, Request, Response } from 'express';
import { SERVICES_DATA } from '../../src/data/companyData';

const router = Router();

// GET all services
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    count: SERVICES_DATA.length,
    data: SERVICES_DATA
  });
});

// GET specific service by id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const service = SERVICES_DATA.find(s => s.id === id);

  if (!service) {
    res.status(404).json({
      success: false,
      error: `Service with id '${id}' not found`
    });
    return;
  }

  res.json({
    success: true,
    data: service
  });
});

export default router;
