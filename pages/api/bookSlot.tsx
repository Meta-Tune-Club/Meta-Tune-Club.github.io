// pages/api/bookSlot.ts
import { NextApiRequest, NextApiResponse } from 'next';
import  { v4 as uuidv4 } from "uuid"
import { connectToDatabase } from '../../lib/dbConnect';
import { Appointment } from '../../models/Appointment';
import { User } from '../../models/User';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@metaplex-foundation/js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, contractorId, timeslot } = req.body;
  const wallet = useWallet();

  const appointment: Appointment = {
    id: uuidv4(),
    user: { wallet: "2", name: 'John Doe', email: "email", phone: "phone"},
    contractor: { wallet: "2", name: 'Contractor Name', email: "email", phone: "phone" },
    timeslot: new Date(timeslot),
    isAccepted: false,
  };

  const connection = await connectToDatabase();
  await connection.query(
    'INSERT INTO appointments (id, user_id, contractor_id, timeslot, is_accepted) VALUES (?, ?, ?, ?, ?)',
    [appointment.id, appointment.user.wallet, appointment.contractor.wallet, appointment.timeslot, appointment.isAccepted]
  );

  res.status(200).json({ status: 'Timeslot booked' });
}
