import React, { useState } from 'react';
import StoreItemCard from '../../Cards/StoreItemCard';
import ItemPreview from '../../Cards//ItemPreview';
import dummyImg from '../../../../assets/store/dummy_img.jpg'

function Accessories() {
  const [items] = useState([
    {
        name: "LED Dog Collar",
        price: "15",
        description: "Rechargeable LED collar for night walks.",
        photo: dummyImg,
        link: "https://example.com/led-dog-collar"
      },
      {
        name: "Cat Bow Tie",
        price: "12",
        description: "Stylish bow tie for special occasions.",
        photo: dummyImg,
        link: "https://example.com/cat-bow-tie"
      },
      {
        name: "Adjustable Pet Harness",
        price: "18",
        description: "Comfortable harness for dogs and cats.",
        photo: dummyImg,
        link: "https://example.com/adjustable-harness"
      },
      {
        name: "Personalized Pet Tag",
        price: "10",
        description: "Custom engraved ID tags for pets.",
        photo: dummyImg,
        link: "https://example.com/pet-tag"
      },
      {
        name: "Automatic Water Dispenser",
        price: "40",
        description: "Keeps pets hydrated all day.",
        photo: dummyImg,
        link: "https://example.com/water-dispenser"
      },
      {
        name: "Soft Pet Blanket",
        price: "22",
        description: "Ultra-soft blanket for pet beds.",
        photo: dummyImg,
        link: "https://example.com/pet-blanket"
      },
      {
        name: "Travel Carrier Bag",
        price: "45",
        description: "Portable carrier for small pets.",
        photo: dummyImg,
        link: "https://example.com/carrier-bag"
      },
      {
        name: "Pet Sunglasses",
        price: "16",
        description: "Protects your pet’s eyes from the sun.",
        photo: dummyImg,
        link: "https://example.com/pet-sunglasses"
      },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleClosePreview = () => {
    setSelectedItem(null);
  };

  return (
    <div className={`flex ${selectedItem ? 'gap-4' : ''} p-4`}> 
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${selectedItem ? '3' : '4'} gap-4 flex-grow transition-all`}>
        {items.map((item, index) => (
          <StoreItemCard key={index} item={item} onSelect={handleSelectItem} />
        ))}
      </div>
      {selectedItem && <ItemPreview item={selectedItem} onClose={handleClosePreview} />}
    </div>
  );
}

export default Accessories;
