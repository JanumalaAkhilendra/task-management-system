import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).userId;
    
    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const status = req.query.status as Status | undefined;
    
    // Searching
    const search = req.query.search as string | undefined;

    // Build where clause
    const where: any = { userId };
    
    if (status && ['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      where.status = status;
    }
    
    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive'
      };
    }

    // Get tasks and total count
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.task.count({ where })
    ]);

    res.json({
      tasks,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
      return next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    const task = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    return next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, status } = req.body;
    const userId = (req as any).userId;

    // Validation
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (status && !['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || 'PENDING',
        userId
      }
    });

    res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = (req as any).userId;

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validation
    if (status && !['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status })
      }
    });

    res.json(task);
  } catch (error) {
    return next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({ where: { id } });

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

export const toggleTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Check if task exists and belongs to user
    const existingTask = await prisma.task.findFirst({
      where: { id, userId }
    });

    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Toggle status
    const newStatus = existingTask.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';

    const task = await prisma.task.update({
      where: { id },
      data: { status: newStatus }
    });

    res.json(task);
  } catch (error) {
    return next(error);
  }
};