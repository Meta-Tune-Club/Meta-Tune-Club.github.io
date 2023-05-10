import { Metaplex, walletAdapterIdentity, bundlrStorage } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { BundlrStorageDriver } from "@metaplex-foundation/js/dist/types/plugins";
import { useRouter } from 'next/router';

function MintNft() {
    const connection = new Connection(clusterApiUrl('devnet'));
    const wallet = useWallet();
    const [nftMinted, setNftMinted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!wallet.connected) {
        }
    }, [wallet.connected]);

    const handleMintNft = async () => {
        const mx = Metaplex.make(connection)
            .use(walletAdapterIdentity(wallet));
        mx.use(bundlrStorage({
            address: 'https://devnet.bundlr.network',
            providerUrl: 'https://api.devnet.solana.com',
            timeout: 60000,
        }));

        const { uri } = await mx.nfts().uploadMetadata({
            name: "My NFT",
            description: "My description",
            image: "https://arweave.net/123",
        });

        console.log(uri); // https://arweave.net/789

        const {nft} = await mx.nfts().create({
            uri:uri,
            name:"placeholder",
            sellerFeeBasisPoints:0,
        });

        setNftMinted(true);
    };

    return (
        <div>
            {nftMinted ? (
                <p>NFT minted!</p>
            ) : (
                <button onClick={handleMintNft}>Mint NFT</button>
            )}
        </div>
    );
}
  
export default MintNft;
