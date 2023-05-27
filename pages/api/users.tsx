//pages/api/users.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { walletAdapterIdentity } from "@metaplex-foundation/js";
import { error } from "console";


//users.tsx function: 
export default async function saveUser(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
  
    try {
      const users = JSON.parse(req.body);
      const result = await prisma.users.create({
        data: users,
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    } finally {
      await prisma.$disconnect();
    }
  }
