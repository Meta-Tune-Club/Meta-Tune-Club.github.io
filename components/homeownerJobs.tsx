import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import format from "date-fns/format";
import parse from "date-fns/parse";

interface HomeownerJobsProps {
  session: any;
}

interface Appointments {
  user_wallet: string;
  contractor_wallet: string;
  timeslot: string;
  is_accepted: boolean;
}

export default function HomeownerJobs({ session }: HomeownerJobsProps) {
  const wallet = useWallet();
  const user_wallet = session.user.name;
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const is_accepted = false;

  const handleDateChange = (event: { target: { value: string } }) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event: { target: { value: string } }) => {
    setSelectedTime(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Convert selectedDate and selectedTime to DateTime format
    const dateObject = parse(selectedDate, "yyyy-MM-dd", new Date());
    const timeObject = parse(selectedTime, "HH:mm", new Date());
    const dateTimeFormat =
      format(dateObject, "yyyy-MM-dd") +
      "T" +
      format(timeObject, "HH:mm:ss.SSSxxx");
    setTimeslot(dateTimeFormat);

  };

  const handleSave = (event: { preventDefault: () => void }) => {  
    event.preventDefault();
    saveAppointment();
    };

  //saves the function using the timeslot and user_wallet and the createJob function
    const saveAppointment = async () => {
        const appointments: Appointments = {
            user_wallet,
            contractor_wallet: "",
            timeslot,
            is_accepted,
        };
        console.log(appointments);
        const res = await fetch("/api/createJob", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(appointments),
        });
        const data = await res.json();
        console.log(data);
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="date" value={selectedDate} onChange={handleDateChange} />
        <input type="time" value={selectedTime} onChange={handleTimeChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
