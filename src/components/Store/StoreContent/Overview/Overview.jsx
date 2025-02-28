import React, { useState } from 'react';
import StoreItemCard from '../../Cards/StoreItemCard';
import ItemPreview from '../../Cards//ItemPreview';
import dummyImg from '../../../../assets/store/dummy_img.jpg'

function Overview() {
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
      
        // 👕 Pet Clothes (Dogs & Cats)
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
      
        // 🎾 Pet Accessories (Dogs & Cats)
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
      
        // 🧸 Pet Toys (Dogs & Cats)
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

export default Overview;
