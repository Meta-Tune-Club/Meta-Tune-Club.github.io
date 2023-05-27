import { Metaplex, walletAdapterIdentity, bundlrStorage, toMetaplexFile, MetaplexFileTag, MetaplexFile } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

interface MintNftProps {
  session: any
}
interface Attribute {
  trait_type: string;
  value: string;
  key?: string;
}


async function toMetaplexFileFromBrowser(file: File): Promise<MetaplexFile> {
  const ext = file.type.split("/").pop();
  const fileName = file.name || `file.${ext}`;
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  return toMetaplexFile(bytes, fileName);
}

function createMetaplexFile(image: File) {
  throw new Error("Function not implemented.");
}

function MintNft({ session }: MintNftProps) {
  const connection = new Connection(clusterApiUrl('mainnet-beta'));
  const wallet = useWallet();
  const [nftMinted, setNftMinted] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | undefined>(undefined);

//declares and sets attributes based on the Attribute interface and allows the users to set the value trait type and key
  const [attributes, setAttributes] = useState<Attribute[]>([
    {
      trait_type: '',
      value: '',
      key: '',
    }]);
//allows the user to add more attributes
  const addAttribute = () => {
    setAttributes([...attributes, {
      trait_type: '',
      value: '',
      key: '',
    }]);
  };
//allows the user to remove attributes
  const removeAttribute = (index: number) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };
  
    

  const handleMintNft = async () => {
    const mx = Metaplex.make(connection)
      .use(walletAdapterIdentity(wallet));
    mx.use(bundlrStorage({
      address: 'https://node1.bundlr.network',
      providerUrl: 'https://api.mainnet-beta.solana.com',
      timeout: 60000,
    }));

    if (!image) {
      console.error('No image selected');
      return;
    }

    const formattedAttributes = attributes.map((attribute) => ({
      trait_type: attribute.trait_type,
      value: attribute.value,
    }));

    const { uri, metadata } = await mx.nfts().uploadMetadata({
        name: name,
        description: description,
        attributes:formattedAttributes,
        image: await toMetaplexFileFromBrowser(image),
      });
      
      console.log(metadata.image); // prints the URI of the uploaded image ROAR
      

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
        {attributes.map((attribute, index) => (
          <div key={index}>
            <label>
              Trait Type:
              <input type="text" value={attribute.trait_type} onChange={(e) => {
                const newAttributes = [...attributes];
                newAttributes[index].trait_type = e.target.value;
                setAttributes(newAttributes);
              }} />
            </label>
            <label>
              Value:
              <input type="text" value={attribute.value} onChange={(e) => {
                const newAttributes = [...attributes];
                newAttributes[index].value = e.target.value;
                setAttributes(newAttributes);
              }} />
            </label>
            <label>
              Key:
              <input type="text" value={attribute.key} onChange={(e) => {
                const newAttributes = [...attributes];
                newAttributes[index].key = e.target.value;
                setAttributes(newAttributes);
              }} />
            </label>
            <button onClick={() => removeAttribute(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addAttribute}>Add Attribute</button>

        
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
