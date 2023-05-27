import Link from "next/link";
import MintNft from "./mintNft"; 
import Image from "next/image";
import { getCsrfToken, signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { SigninMessage } from "../utils/SigninMessage";
import bs58 from "bs58";
import { useEffect } from "react";
import React, { FC, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';


require('@solana/wallet-adapter-react-ui/styles.css');

export default function Footer() {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network])
    const { data: session, status } = useSession();
    const loading = status === "loading";

    const wallet = useWallet();
    const walletModal = useWalletModal();
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );

    const handleSignIn = async () => {
        try {
            if (!wallet.connected) {
                walletModal.setVisible(true);
            }

            const csrf = await getCsrfToken();
            if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

            const message = new SigninMessage({
                domain: window.location.host,
                publicKey: wallet.publicKey?.toBase58(),
                statement: `Sign this message to sign in to the app.`,
                nonce: csrf,
            });

            const data = new TextEncoder().encode(message.prepare());
            const signature = await wallet.signMessage(data);
            const serializedSignature = bs58.encode(signature);

            signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature: serializedSignature,
            });
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        if (wallet.connected && status === "unauthenticated") {
        handleSignIn();
        }
    }, [wallet.connected]);

    const me_handleClick = () => {
        window.location.href = "/me";
    };
    const protected_handleClick = () => {
        window.location.href = "/api/examples/protected";
    };
    const customMint_handleClick = () => {
        window.location.href = "/customMint";
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <header>
            <nav className="navbar" style={{
                width: 'auto',
                maxWidth: '100%',
                backgroundColor: 'black',
                height: '200px',
                position: "relative",
                padding: '0px 0px',
            }}>
                <div className="navbar-left" style={{
                    left: '0px',
                    position: 'absolute'
                }}>
                </div>
                <div className="navbar-middle" style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}>
                    <h1 style={{
                    color: 'Blue',
                    }}>Footer</h1>
                </div>
                <div className="navbar-right" style={{
                    position: 'absolute',
                    right: '0px'
                }}>   
                </div>
            </nav>
        </header>
    );
}
