import { Metaplex, walletAdapterIdentity, bundlrStorage, toMetaplexFile, MetaplexFileTag, MetaplexFile } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface MintNftProps {
  session: any
}



async function toMetaplexFileFromBrowser(file: File): Promise<MetaplexFile> {
  const ext = file.type.split("/").pop();
  const fileName = file.name || `file.${ext}`;
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return toMetaplexFile(bytes, fileName);
}


function MintNft({ session }: MintNftProps) {
  const connection = new Connection(clusterApiUrl('devnet'));
  const wallet = useWallet();
  const [nftMinted, setNftMinted] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | undefined>(undefined);

  

  useEffect(() => {
    if (!wallet.connected) {
      wallet.connect();
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

    if (!image) {
      console.error('No image selected');
      return;
    }




    const { uri, metadata } = await mx.nfts().uploadMetadata({
        name: name,
        description: description,
        image: await toMetaplexFileFromBrowser(image),
      });
      
      console.log(metadata.image); // prints the URI of the uploaded image
      

    console.log(uri);

    const {nft} = await mx.nfts().create({
      uri:uri,
      name:name,
      sellerFeeBasisPoints:0,
    });

    setNftMinted(true);
  }; 

  return (
    <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Image:
          <input type="file" onChange={(e) => setImage(e.target.files?.[0])} />
        </label>
        
      {session ? (
        <div>
          {nftMinted ? (
            <p>NFT minted!</p>
          ) : (
            <button onClick={handleMintNft}>Mint NFT</button>
          )}
        </div>
      ) : (
        <p>You need to be logged in to mint an NFT.</p>
      )}
    </div>
  );
}

export default MintNft;
function createMetaplexFile(image: File) {
    throw new Error("Function not implemented.");
}

