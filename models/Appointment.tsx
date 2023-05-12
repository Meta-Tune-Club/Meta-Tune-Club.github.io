import { User } from "./User";
import { Contractor } from "./Contractor"

export interface Appointment {
    id: string;
    user: User;
    contractor: Contractor;
    timeslot: Date;
    isAccepted: boolean;
  }