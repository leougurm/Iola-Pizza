import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getUserFromRequest } from '../../../lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  // GET - fetch single food
  if (req.method === 'GET') {
    try {
      const food = await prisma.food.findUnique({
        where: { id },
      });

      if (!food) {
        return res.status(404).json({ error: 'Food not found' });
      }

      return res.status(200).json(food);
    } catch (error) {
      console.error('Error fetching food:', error);
      return res.status(500).json({ error: 'Failed to fetch food' });
    }
  }

  // PUT - update food (requires auth)
  if (req.method === 'PUT') {
    const user = getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { name, description, price, category, ingredients, images, isAvailable } = req.body;

      const food = await prisma.food.update({
        where: { id },
        data: {
          name,
          description,
          price: parseFloat(price),
          category,
          ingredients,
          images,
          isAvailable,
        },
      });

      return res.status(200).json(food);
    } catch (error) {
      console.error('Error updating food:', error);
      return res.status(500).json({ error: 'Failed to update food' });
    }
  }

  // DELETE - delete food (requires auth)
  if (req.method === 'DELETE') {
    const user = getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      await prisma.food.delete({
        where: { id },
      });

      return res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
      console.error('Error deleting food:', error);
      return res.status(500).json({ error: 'Failed to delete food' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
