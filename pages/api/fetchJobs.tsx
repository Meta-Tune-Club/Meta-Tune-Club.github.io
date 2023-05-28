import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

//fetches all jobs from the appointments table where the boolean is_accepted is false
export default async function fetchJobs(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient();
  
    try {
      const appointments = await prisma.appointments.findMany({
        where: {
            is_accepted: false
        }
      });
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    } finally {
      await prisma.$disconnect();
    }
  }