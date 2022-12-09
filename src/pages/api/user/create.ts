import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/client";
import sha256 from "crypto-js/sha256";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    await handlePOST(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

const hashPassword = (password: string) => {
  return sha256(password).toString();
};

// POST /api/user
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  console.debug("creating user", {
    ...req.body,
    password: hashPassword(req.body.password),
  });
  const user = await prisma.user.create({
    data: { ...req.body, password: hashPassword(req.body.password) },
  });
  res.json(user);
}
