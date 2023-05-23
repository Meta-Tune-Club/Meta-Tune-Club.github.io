import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

interface users {
    id: number;
    name: string;
    email: string;
    role: string;
    walletAddress: string;
}

interface AccSetupProps {
    session: any
  }

//makes a function where the user can save account information following the users interface and saving it in planetscale database
export default function AccSetup({ session } : AccSetupProps) {
    const wallet = useWallet();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const walletAddress = wallet.publicKey?.toBase58();

//saves to the planetscale database using users interface
    const save = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, role, walletAddress }),
        });
        const data = await res.json();
        console.log(data);
    };

    return(
        <div>
            <form>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)}  />
                <button onClick={save}>Save</button>



            </form>
        </div>
    );
}

