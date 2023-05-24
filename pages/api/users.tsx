import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";

//users.tsx function: 
async function saveUser(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, job, walletAddress, phone, address } = req.body;
    const prisma = new PrismaClient();

    const result = await prisma.users.create({
        data: {
            name,
            email,
            walletAddress,
            job,
            phone,
            address,
        } as unknown as Prisma.usersCreateInput,
    });
    res.status(200).json(result);
}
