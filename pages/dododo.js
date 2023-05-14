import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleWalletClick = () => {
    // handle wallet connect here
  };

  const ExternalLinkButton = ({ href, children }) => {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <button>{children}</button>
      </a>
    );
  };

  return (
    <nav className="navbar" style={{
      width: 'auto',
      maxWidth: '100%',
      backgroundImage: 'url(https://bafybeid6hux62xvyzn2xocwaz24euirx7vimgvqoeswpweo7heajudkkom.ipfs.nftstorage.link/)',
      height: '500px',
      position: "relative"
    }}>
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
        <button onClick={handleMenuClick}>Menu</button>
        <button onClick={handleWalletClick}>Connect Wallet</button>
      </div>
      {isMenuOpen && (
        <div className="navbar-menu">
          <ul>
            <Link href="/">Home</Link>
						<Link href="/Mint">Mint</Link>
						<Link href="https://meta-tune-club-staking.vercel.app/">Stake</Link>
						<Link href="/About">About</Link>
						<Link href="/CustomMint">Custom Mint</Link>
          </ul>
        </div>
      )}
    </nav>
    
  );
};

const HomePage = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="content">
      </div>
    </div>
  );
};

export default HomePage;
