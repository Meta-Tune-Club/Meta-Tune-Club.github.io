import { useState } from 'react';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar';

export default function CustomNFT() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [royaltyPercentage, setRoyaltyPercentage] = useState();
  const [description, setDescription] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [image, setImage] = useState('');
  const [creatorsShares, setCreatorsShares] = useState([{ address: '', percentage: '' }]);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { key: '', value: '' }]);
  };

  const handleRemoveAttribute = (index) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  const handleAttributeChange = (index, key, value) => {
    const newAttributes = [...attributes];
    newAttributes[index] = { key, value };
    setAttributes(newAttributes);
  };

  const handleAddCreatorsShare = () => {
    setCreatorsShares([...creatorsShares, { address: '', percentage: '' }]);
  };

  const handleRemoveCreatorsShare = (index) => {
    if (creatorsShares.length > 1) {
      const newCreatorsShares = [...creatorsShares];
      newCreatorsShares.splice(index, 1);
      setCreatorsShares(newCreatorsShares);
    }
  };

  const handleCreatorsShareChange = (index, field, value) => {
    const newCreatorsShares = [...creatorsShares];
    newCreatorsShares[index][field] = value;
    setCreatorsShares(newCreatorsShares);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  const handleRoyaltyPercentageChange = (event) => {
    const value = event.target.value;
    const newRoyaltyPercentage = isNaN(value) ? '' : Math.min(parseFloat(value), 50).toString();
    setRoyaltyPercentage(newRoyaltyPercentage);
  };
  

  return (
    <div style={{
        padding: '10vh'
    }}>
      <h1>Create Custom NFT</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Symbol:</label>
          <input type="text" value={symbol} placeholder="Symbol" onChange={(e) => setSymbol(e.target.value)} />
        </div>
        <div>
        <label>Royalty Percentage</label>
          <input type="text" value={royaltyPercentage} placeholder="Royalty" onChange={handleRoyaltyPercentageChange} />
          {royaltyPercentage !== '' && Number(royaltyPercentage) > 50 && <span>Maximum royalty percentage is 50%</span>}
        </div>
        <div>
          <label>Creators Share:</label>
          <ul>
            {creatorsShares.map((creatorsShare, index) => (
              <li key={index}>
                <input type="text" value={creatorsShare.address} placeholder="Address" onChange={(e) => handleCreatorsShareChange(index, 'address', e.target.value)} />
                <input type="text" value={creatorsShare.percentage} placeholder="Percentage" onChange={(e) => handleCreatorsShareChange(index, 'percentage', e.target.value)} />
                <button type="button" onClick={handleRemoveCreatorsShare} style={{backgroundColor: creatorsShares.length === 1 ? 'red' : '', color: creatorsShares.length === 1 ? 'white' : '',}} disabled={creatorsShares.length === 1}>Remove</button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleAddCreatorsShare}>Add Share</button>
        </div>
        <div>
          <label>Attributes:</label>
          <ul>
            {attributes.map((attribute, index) => (
              <li key={index}>
                <input type="text" value={attribute.key} placeholder="Key" onChange={(e) => handleAttributeChange(index, e.target.value, attribute.value)} />
                <input type="text" value={attribute.value} placeholder="Value" onChange={(e) => handleAttributeChange(index, attribute.key, e.target.value)} />
                <button type="button" onClick={() => handleRemoveAttribute(index)}>Remove</button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleAddAttribute}>Add Attribute</button>
        </div>
        <div className='background'
          style={{
            position: 'absolute',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            left: 0,
            top: 0,
          }}>
            <Navbar/>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <Image src={image} alt="Selected Image" width={200} height={200} />}
       </div>
    </form>
</div>)}

