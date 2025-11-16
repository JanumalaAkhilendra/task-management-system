import { Response } from 'express';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  error: any,
  res: Response,
) => {
  console.error('Error:', error);

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Unique constraint violation' });
    }
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Record not found' });
    }
  }

  // Default error
    return res.status(error.status || 500).json({
    error: error.message || 'Internal server error'
  });
};