//components/accSetup.tsx
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

interface users {
    id: number;
    name: string;
    email: string;
    job: string;
    walletAddress: string;
    address: string;
}

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
    const WalletAddress = wallet.publicKey?.toBase58();
    const users = { Name, Email, Job, WalletAddress, Phone, Address };

//saves to the planetscale database using users interface
    const save = async (e: any) => {
        e.preventDefault();
        const req = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(users),
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
                <button onClick={save}>Save</button>
            </form>
        </div>
    );
}

