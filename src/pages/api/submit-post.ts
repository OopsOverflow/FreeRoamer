import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const {
      title,
      timeToComplete,
      activityType,
      difficulty,
      description,
      imageUrls,
      mapUrl,
      userId,
      distance,
      averageElevationGain,
    } = req.body as {
      title: string;
      timeToComplete: string;
      activityType: string;
      difficulty: string;
      description: string;
      imageUrls: string[];
      mapUrl: string;
      userId: string;
      distance: number;
      averageElevationGain: number;
    };

    const post = await prisma.post.create({
      data: {
        title,
        timeToComplete,
        activityType,
        difficulty,
        description,
        mapUrl,
        author: {
          connect: {
            id: userId,
          },
        },
        images: imageUrls,
        distance: distance.toString().slice(0, 5),
        elevationGain: averageElevationGain.toString().slice(0, 5),
      },
    });

    console.log('post', post);

    res.status(200).json(post);
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: error });
  }
}
