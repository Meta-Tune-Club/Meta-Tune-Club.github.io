import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import mint from "../Mint";
import about from "../About";
import stake from "../Stake";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<div>
			<img src = 'https://bafybeifxyklvwpfpel2ck6hyzudiwsa2xt4brhfwb2pemtxsetsp4zocwe.ipfs.nftstorage.link/' style={{
					width: '10vh',
					left: 0,
					top: 0,
					position: 'absolute',
				}}/>
			<header style={{
				padding: '2.1vh'
			}}>
				<nav ref={navRef} style={{
				top: 0,
				left: 0,
				margin: 'auto',
				}}>
						<Link href="/">Home</Link>
						<Link href="/Mint">Mint</Link>
						<Link href="https://meta-tune-club-staking.vercel.app/">Stake</Link>
						<Link href="/About">About</Link>
						<Link href="/CustomMint">Custom Mint</Link>
						<Link href="/UserInfo">Account Setup</Link>
					<button
						className="nav-btn nav-close-btn"
						onClick={showNavbar}>
						<FaTimes />
					</button>
				</nav>
				<button
					className="nav-btn"
					onClick={showNavbar}>
					<FaBars />
				</button>
			</header>
		</div>
	);
}

export default Navbar;