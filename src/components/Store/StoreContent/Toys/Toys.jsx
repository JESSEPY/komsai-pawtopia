import React, { useState } from 'react';
import StoreItemCard from '../../Cards/StoreItemCard';
import ItemPreview from '../../Cards//ItemPreview';
import dummyImg from '../../../../assets/store/dummy_img.jpg'

function Toys() {
  const [items] = useState([
    {
        name: "Chew Toy for Dogs",
        price: "10",
        description: "Durable chew toy to keep dogs entertained.",
        photo: dummyImg,
        link: "https://example.com/chew-toy"
      },
      {
        name: "Interactive Cat Toy",
        price: "14",
        description: "Battery-powered toy to engage your cat.",
        photo: dummyImg,
        link: "https://example.com/interactive-cat-toy"
      },
      {
        name: "Rope Tug Toy",
        price: "8",
        description: "Great for tug-of-war games with dogs.",
        photo: dummyImg,
        link: "https://example.com/rope-tug-toy"
      },
      {
        name: "Laser Pointer",
        price: "12",
        description: "Fun and interactive laser pointer for cats.",
        photo: dummyImg,
        link: "https://example.com/laser-pointer"
      },
      {
        name: "Squeaky Plush Toy",
        price: "9",
        description: "Soft plush toy with a squeaker inside.",
        photo: dummyImg,
        link: "https://example.com/squeaky-toy"
      },
      {
        name: "Treat Dispensing Ball",
        price: "15",
        description: "Interactive toy that dispenses treats.",
        photo: dummyImg,
        link: "https://example.com/treat-dispensing-ball"
      },
      {
        name: "Cat Tunnel",
        price: "20",
        description: "Collapsible tunnel for cats to play in.",
        photo: dummyImg,
        link: "https://example.com/cat-tunnel"
      },
      {
        name: "Rubber Fetch Ball",
        price: "7",
        description: "Bouncy rubber ball for fetch games.",
        photo: dummyImg,
        link: "https://example.com/fetch-ball"
      }
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

export default Toys;
