import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = req.query.id?.toString();

  if (userId === null || userId === undefined)
    throw new Error(
      `Undefined ID.`,
    );

  if (req.method === "GET") {
    handleGET(userId, req, res);
  } else if (req.method === "POST") {
    handlePOST(userId, req, res);
  } else if (req.method === "DELETE") {
    handleDELETE(userId, req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

// GET /api/user/:id
async function handleGET(userId: string, req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    // include: { id: true, name: true, email: true, image: true },
  });
  res.json(user);
}

// GET /api/user/:id
async function handlePOST(userId: string, req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { ...req.body },
  });
  return res.json(user);
}

// DELETE /api/user/:id
async function handleDELETE(userId: string, req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.delete({
    where: { id: userId },
  });
  res.json(user);
}
