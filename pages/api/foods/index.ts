import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { getUserFromRequest } from '../../../lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET - fetch all foods
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      console.log(111);
      console.log(category);
      const foods = await prisma.food.findMany({
        where: category ? { category: category as string } : undefined,
        orderBy: { createdAt: 'desc' },
      });
      console.log(2222);

      return res.status(200).json(foods);
    } catch (error) {
      console.error('Error fetching foods:', error);
      return res.status(500).json({ error: 'Failed to fetch foods' });
    }
  }

  // POST - create new food (requires auth)
  if (req.method === 'POST') {
    const user = getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { name, description, price, category, ingredients, images, isAvailable } = req.body;

      const food = await prisma.food.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          category,
          ingredients: ingredients || [],
          images: images || [],
          isAvailable: isAvailable ?? true,
        },
      });

      return res.status(201).json(food);
    } catch (error) {
      console.error('Error creating food:', error);
      return res.status(500).json({ error: 'Failed to create food' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
