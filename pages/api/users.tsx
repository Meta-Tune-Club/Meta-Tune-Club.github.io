//pages/api/users.tsx
import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import { walletAdapterIdentity } from "@metaplex-foundation/js";

//users.tsx function: 
export default async function saveUser(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
    const users = req.body;
        
    const result = await prisma.users.create({
        data: {
            Name: users.Name,
            Email: users.Email,
            Job: users.Job,
            WalletAddress: users.WalletAddress,
            Phone: users.Phone,
            Address: users.Address,
        } as unknown as Prisma.usersCreateInput,
    });
    res.status(200).json(result);
    await prisma.$disconnect();
}
