import React, { useState } from 'react';
import StoreItemCard from '../../Cards/StoreItemCard';
import ItemPreview from '../../Cards//ItemPreview';
import dummyImg from '../../../../assets/store/dummy_img.jpg'

function PetFood() {
  const [items] = useState([
    // 🥩 Pet Food (Dogs & Cats)
  {
    name: "Premium Dog Food",
    price: "25",
    description: "High-quality dog food with essential nutrients.",
    photo: dummyImg,
    link: "https://example.com/premium-dog-food"
  },
  {
    name: "Cat Kibble",
    price: "20",
    description: "Crunchy kibble for cats with added vitamins.",
    photo: dummyImg,
    link: "https://example.com/cat-kibble"
  },
  {
    name: "Organic Wet Food",
    price: "30",
    description: "Grain-free wet food for dogs and cats.",
    photo: dummyImg,
    link: "https://example.com/organic-wet-food"
  },
  {
    name: "Freeze-Dried Treats",
    price: "15",
    description: "Healthy freeze-dried treats for pets.",
    photo: dummyImg,
    link: "https://example.com/freeze-dried-treats"
  },
  {
    name: "Salmon Jerky",
    price: "18",
    description: "Tasty salmon jerky for dogs.",
    photo: dummyImg,
    link: "https://example.com/salmon-jerky"
  },
  {
    name: "Catnip Crunch",
    price: "12",
    description: "Crunchy cat treats with catnip.",
    photo: dummyImg,
    link: "https://example.com/catnip-crunch"
  },
  {
    name: "Dental Chews",
    price: "14",
    description: "Dental chews for healthy dog teeth.",
    photo: dummyImg,
    link: "https://example.com/dental-chews"
  },
  {
    name: "Grain-Free Puppy Food",
    price: "28",
    description: "Nutritious grain-free food for puppies.",
    photo: dummyImg,
    link: "https://example.com/puppy-food"
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

export default PetFood;
