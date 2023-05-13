//components/acceptAppt.tsx
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Appointment } from '../models/Appointment';

export default function AcceptAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await axios.get('/api/appointments');
      setAppointments(response.data);
    };

    fetchAppointments();
  }, []);

  const acceptAppointment = async (appointmentId: string) => {
    await axios.post('/api/acceptSlot', {
      appointmentId,
    });

    // Refresh the appointments list after accepting
    const response = await axios.get('/api/appointments');
    setAppointments(response.data);
  };

  return (
    <div>
      <h1>Accept Appointments</h1>
      {appointments.map((appointment) => (
        <div key={appointment.id}>
          <p>User: {appointment.user.name}</p>
          <p>Contractor: {appointment.contractor.name}</p>
          <p>Timeslot: {appointment.timeslot.toLocaleString()}</p>
          {!appointment.isAccepted && (
            <button onClick={() => acceptAppointment(appointment.id)}>Accept</button>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}