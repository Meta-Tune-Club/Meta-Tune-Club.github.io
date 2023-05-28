import { Prisma, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


interface appointments{
    user_id: string;
    contractor_id: string;
    timeslot: string;
    is_accepted: boolean;
}

//saves the job to the planetscale database using appointments interface
export default async function saveAppointment(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
  
    try {
      const appointments = req.body;
      const result = await prisma.appointments.create({
        data: appointments,
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    } finally {
      await prisma.$disconnect();
    }
  }