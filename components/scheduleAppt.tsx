// components/BookAppointment.tsx
import axios from 'axios';
import ReactDatePicker from 'react-datepicker';
import { useState } from 'react';

export default function BookAppointment() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const bookSlot = async () => {
    const userId = 'yourUserId'; // Replace with actual user ID
    const contractorId = 'yourContractorId'; // Replace with actual contractor ID

    await axios.post('/api/bookSlot', {
      userId,
      contractorId,
      timeslot: selectedDate.toISOString(),
    });
  };

  return (
    <div>
      <h1>Book Appointment</h1>
      <div>
        <label>Date and Time:</label>
        <ReactDatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
      <button onClick={bookSlot}>Book Slot</button>
    </div>
  );
}