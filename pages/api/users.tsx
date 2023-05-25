//pages/api/users.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { walletAdapterIdentity } from "@metaplex-foundation/js";


//users.tsx function: 
export default async function saveUser(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
  
    try {
      const { name, email, job, walletAddress, phone, address } = req.body;
  
      const result = await prisma.users.create({
        data: {
          name: name,
          email:email,
          job:job,
          walletAddress:walletAddress,
          phone:phone,
          address: address,
          verification_string: "4", // Add the verification string value here
        } as unknown as Prisma.usersUncheckedCreateInput,
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    } finally {
      await prisma.$disconnect();
    }
  }
