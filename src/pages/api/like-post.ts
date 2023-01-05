import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/client';
export default async function likePost(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    res.status(405).end();
    return;
  }

  const { id, action } = req.body as { id: string; action: 'like' | 'unlike' };

  console.log('id', id);
  console.log('action', action);

  if (!id || !action) {
    console.log('Missing id or action');
    return res.status(400).json({ error: 'Missing post id or action' });
  }

  if (action === 'like') {
    await prisma.post.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });
  } else if (action === 'unlike') {
    await prisma.post.update({
      where: { id },
      data: { likes: { decrement: 1 } },
    });
  }
  res.status(200).json({ success: true });
}
