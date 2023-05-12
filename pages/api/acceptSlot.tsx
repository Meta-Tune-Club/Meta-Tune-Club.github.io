// pages/api/acceptSlot.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { appointmentId } = req.body;

  const connection = await connectToDatabase();
  await connection.query('UPDATE appointments SET is_accepted = ? WHERE id = ?', [true, appointmentId]);

  res.status(200).json({ status: 'Timeslot accepted' });
}
