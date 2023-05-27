//components/accSetup.tsx
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

interface AccSetupProps {
    session: any
  }

//makes a function where the user can save account information following the users interface and saving it in planetscale database
export default function AccSetup({ session } : AccSetupProps) {
    const wallet = useWallet();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Job, setJob] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");

    const saveForm = async (e: any) => {
        const WalletAddress = session.user.name;
        const users = {
            name: Name,
            email: Email,
            job: Job,
            walletAddress: WalletAddress,
            phone: Phone,
            address: Address,
            verification_string: "verified",
        } as Prisma.usersCreateInput;
        save(e, JSON.stringify(users));
      };
      

//saves to the planetscale database using users interface
    const save = async (e: any, users: any) => {
        e.preventDefault();
        const req = await fetch("/api/users", {
            method: "POST",
            body: (users),
        });
        const data = await req.json();
        console.log(data);
        
    };

    return(
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input type="text" placeholder="Job" value={Job} onChange={(e) => setJob(e.target.value)}  />
                <button onClick={saveForm}>Save</button>
            </form>
        </div>
    );
}

