import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, toMetaplexFile, toBigNumber } from "@metaplex-foundation/js";
import express from 'express';
import multer from "multer";
import path from 'path';
import { useWallet } from "@solana/wallet-adapter-react";
import axios from 'axios';

const QUICKNODE_RPC = 'https://virulent-dry-resonance.solana-devnet.discover.quiknode.pro/d232180e78f7e1771b6b95e0f1cb14d68f025c4f/';
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
const { publicKey, signTransaction } = useWallet();
const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
    .use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: QUICKNODE_RPC,
        timeout: 60000,
    }));

const CONFIG = {
    uploadPath: 'uploads/',
    imgFileName: 'image.png',
    imgType: 'image/png',
    imgName: 'QuickNode Pixel',
    description: 'Pixel infrastructure for everyone!',
    attributes: [
        {trait_type: 'Speed', value: 'Quick'},
        {trait_type: 'Type', value: 'Pixelated'},
        {trait_type: 'Background', value: 'QuickNode Blue'}
    ],
    sellerFeeBasisPoints: 500,//500 bp = 5%
    symbol: 'QNPIX',
    creators: [
        {address: publicKey || new PublicKey(""),
        share: 100}
    ]
};

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, CONFIG.uploadPath);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        const fileUrl = req.protocol + '://' + req.get('host') + '/' + req.file.path;
        res.send(fileUrl);
    } catch (error) {
        console.warn(error);
        res.status(500).send({ message: 'File upload failed.' });
    }
});
async function uploadImage(filePath: string, fileName: string): Promise<string> {
    console.log(`Step 1 - Uploading Image`);
    const imgBuffer = await axios.get(`file://${filePath}/${fileName}`, {
      responseType: 'arraybuffer'
    });
    const formData = new FormData();
    formData.append('image', new Blob([imgBuffer.data]));
    const { data } = await axios.post('/upload', formData);
    console.log("Image URL", data);
    return data;
  }
  
  async function uploadMetadata(imgUri: string, imgType: string, nftName: string, description: string, attributes: { trait_type: string, value: string }[]) {
    console.log("Step 2 - Uploading Metadata");
    const { uri } = await METAPLEX
      .nfts()
      .uploadMetadata({
        name: nftName,
        description: description,
        image: imgUri,
        attributes: attributes,
        properties: {
          files: [
            {
              type: imgType,
              uri: imgUri,
            },
          ],
        },
      });
    console.log(' Metadata URI:', uri);
    return uri;
  }
  
  async function mintNft(metadataUri: string, name: string, sellerFee: number, symbol: string, creators: { address: PublicKey, share: number }[]) {
    console.log("Step 3 - Minting NFT");
    const { nft } = await METAPLEX
      .nfts()
      .create({
        uri: metadataUri,
        name: name,
        sellerFeeBasisPoints: sellerFee,
        symbol: symbol,
        creators: creators,
        isMutable: false,
        maxSupply: toBigNumber(1),
      });
    console.log("Success!🎉");
    console.log(`Minted NFT https://explorer.solana.com/address/${nft.address}?cluster=devnet`);
  }
  
  async function Mint() {
    if (!publicKey) return;
    try {
      //Step 1 - Upload Image
      const imgUri = await uploadImage(CONFIG.uploadPath, CONFIG.imgFileName);
      //Step 2 - Upload Metadata
      const metadataUri = await uploadMetadata(imgUri, CONFIG.imgType, CONFIG.imgName, CONFIG.description, CONFIG.attributes);
      //Step 3 - Mint NFT
      mintNft(metadataUri, CONFIG.imgName, CONFIG.sellerFeeBasisPoints, CONFIG.symbol, CONFIG.creators);
    } catch (error) {
      console.warn(error);
    }
  }
  
  export default Mint;