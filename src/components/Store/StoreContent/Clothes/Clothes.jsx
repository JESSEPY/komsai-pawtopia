import React, { useState } from 'react';
import StoreItemCard from '../../Cards/StoreItemCard';
import ItemPreview from '../../Cards//ItemPreview';
import dummyImg from '../../../../assets/store/dummy_img.jpg'

function Clothes() {
  const [items] = useState([
    {
        name: "Winter Dog Jacket",
        price: "35",
        description: "Keeps your dog warm during cold weather.",
        photo: dummyImg,
        link: "https://example.com/dog-jacket"
      },
      {
        name: "Cat Hoodie",
        price: "28",
        description: "Soft and cozy hoodie for your cat.",
        photo: dummyImg,
        link: "https://example.com/cat-hoodie"
      },
      {
        name: "Raincoat for Pets",
        price: "22",
        description: "Waterproof raincoat for both cats and dogs.",
        photo: dummyImg,
        link: "https://example.com/raincoat-for-pets"
      },
      {
        name: "Christmas Sweater",
        price: "30",
        description: "Festive sweater for holiday pictures.",
        photo: dummyImg,
        link: "https://example.com/christmas-sweater"
      },
      {
        name: "Summer Cooling Vest",
        price: "27",
        description: "Cooling vest for hot weather walks.",
        photo: dummyImg,
        link: "https://example.com/cooling-vest"
      },
      {
        name: "Dog Pajamas",
        price: "20",
        description: "Comfy pajamas for small and large dogs.",
        photo: dummyImg,
        link: "https://example.com/dog-pajamas"
      },
      {
        name: "Reflective Safety Vest",
        price: "18",
        description: "Stay visible during night walks.",
        photo: dummyImg,
        link: "https://example.com/safety-vest"
      },
      {
        name: "Halloween Costume",
        price: "25",
        description: "Cute costumes for pet dress-up.",
        photo: dummyImg,
        link: "https://example.com/halloween-costume"
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

export default Clothes;
