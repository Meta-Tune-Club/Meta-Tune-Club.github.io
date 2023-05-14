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

export default function IndexHeader() {
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

    const home_handleClick = () => {
        window.location.href = "/";
    };
    const me_handleClick = () => {
        window.location.href = "/me";
    };
    const protected_handleClick = () => {
        window.location.href = "/api/examples/protected";
    };
    const customMint_handleClick = () => {
        window.location.href = "/customMint";
    };

    return (
        <header>
            <noscript>
                <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
            </noscript>
            <nav className="navbar" style={{
                width: 'auto',
                maxWidth: '100%',
                backgroundImage: 'url(/Office-01_1256.png)',
                height: '500px',
                position: "relative",
                padding: '0px 0px',
            }}>
                <nav className="navbar" style={{
                    background: "linear-gradient(to bottom, rgb(123, 8, 255, 0.9), #8d689e)",
                    height: '500px',
                    width: '100%',
                    position: 'absolute',  
                    padding: '0px 0px',
                    opacity: '45%',
                    top: 0,
                }}>
                </nav>
                <div className="navbar-left" style={{
                    top: '0px',
                    left: '0px',
                    position: 'absolute'
                }}>
                    <a href="/">
                    <Image src="/logo.png" width={40} height={40} alt="Logo"/>
                    </a>
                </div>
                <div className="navbar-middle" style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}>
                    <h1 style={{
                    color: 'Blue',
                    }}>Meta Tune Club</h1>
                </div>
                <div className="navbar-right" style={{
                    position: 'absolute',
                    top: '0px',
                    right: '0px'
                }}>
                    <nav>
                        <div className="danav">
                            <button onClick={home_handleClick}>Home</button>
                            <button onClick={protected_handleClick}>Protected API Route</button>
                            <button onClick={me_handleClick}>Me</button>
                            <button onClick={customMint_handleClick}>Custom Mint</button>
                        </div>
                    </nav>
                    <div className={styles.signedInStatus}>
                    <p
                    className={`nojs-show ${
                        !session && loading ? styles.loading : styles.loaded
                    }`}
                    >
                    {!session && (
                        <>
                        <span className={styles.notSignedInText}>
                            You are not signed in
                        </span>
                        <span className={styles.buttonPrimary} onClick={handleSignIn}>
                            Connect Wallet
                        </span>
                        </>
                    )}
                    {session?.user && (
                        <>
                        {session.user.image && (
                            <span
                            style={{ backgroundImage: `url('${session.user.image}')` }}
                            className={styles.avatar}
                            />
                        )}
                        <span className={styles.signedInText}>
                            <small>Signed in as</small>
                            <br />
                            <strong>{session.user.email ?? session.user.name}</strong>
                        </span>
                        <a style={{
                            color: "white"
                        }}
                            href={`/api/auth/signout`}
                            className={styles.button}
                            onClick={(e) => {
                            e.preventDefault();
                            signOut();
                            }}
                        >
                            Sign out
                        </a>
                        </>
                    )}
                    </p>
                    </div>
                </div>
            </nav>
        </header>
    );
}
