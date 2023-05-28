import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


interface appointments{
  id: number;
  contractor_wallet: string;
  is_accepted: boolean;
}

//edits the job status to accepted and updates the contractor_wallet to the contractor's wallet address
export default async function acceptJob(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
  
    try {
      const appointments = req.body;
      const result = await prisma.appointments.update({
        where: {
            id: appointments.id
        },
        data: {
            contractor_wallet: appointments.contractor_wallet,
            is_accepted: true
        } as Prisma.appointmentsUpdateInput,
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    } finally {
      await prisma.$disconnect();
    }
  }