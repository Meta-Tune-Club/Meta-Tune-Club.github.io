import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
//users.tsx function: 
async function saveUser(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, role, walletAddress } = req.body;
const prisma = new PrismaClient();

    const result = await prisma.users.create({
        data: {
            name,
            email,
            role,
            walletAddress,
        },
    });
    res.status(200).json(result);
}
