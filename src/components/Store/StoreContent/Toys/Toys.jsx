import React, { useState } from "react";
import StoreItemCard from "../../Cards/StoreItemCard";
import ItemPreview from "../../Cards//ItemPreview";
import dummyImg from "../../../../assets/store/dummy_img.jpg";
import { motion } from "framer-motion";

function Toys() {
  const [items] = useState([
    {
      name: "Approved Plush Paw Shape Dog Toy",
      price: "169.75",
      description: "Durable chew toy to keep dogs entertained.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10257362B-Approved-Plush-Paw-Shape-Dog-Toy-Blue-front_500x.jpg?v=1648720986",
      link: "https://www.petexpress.com.ph/products/approved-plush-paw-shape-dog-toy",
    },
    {
      name: "Approved Rope Slipper Dog Toy",
      price: "79.75",
      description:
        "Great puppy toys for teething, chewing, tossing, fetching, interactive playing, and stress relief.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10253354B-Approved-Rope-Slipper-Dog-ToySmall-Blue-front_500x.jpg?v=1648719826",
      link: "https://www.petexpress.com.ph/products/approved-rope-slipper-dog-toy",
    },
    {
      name: "Nina Ottosson Smart Puzzle Level 1 Dog Toy",
      price: "799.00",
      description: "Hide, seek and treat with this dog game by Nina Ottosson!",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/Nina-Ottosson-Dog-Smart-Puzzle-Dog-Toy---Level-1_500x.jpg?v=1622738282",
      link: "https://www.petexpress.com.ph/products/nina-ottosson-dog-smart-puzzle-dog-toy-level-1",
    },
    {
      name: "Approved Plush Gray Elephant Dog Toy",
      price: "269.75",
      description:
        "Washable Material Keep Safe & Clean - The toy is made with the washable polyester material. ",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10257360G-Approved-Plush-Gray-Elephant-Dog-Toy-front_500x.jpg?v=1648799850",
      link: "https://www.petexpress.com.ph/products/approved-plush-gray-elephant-dog-toy",
    },
    {
      name: "Doggo Squeaker Dog Toy",
      price: "339.00",
      description: "Soft plush toy with a squeaker inside.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10270789DoggoSqueakerDogToya_500x.jpg?v=1687229389",
      link: "https://www.petexpress.com.ph/products/doggo-squeaker-dog-toy?pr_prod_strat=jac&pr_rec_id=aa49dbbf9&pr_rec_pid=7901744431235&pr_ref_pid=6752727957635&pr_seq=uniform",
    },
    {
      name: "Approved Teether Triangle with Rope Dog Toy",
      price: "99.75",
      description:
        "Helps encourage playfulness and love bonding between you and your pet",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10246763B-Approved-Teether-Triangle-with-Rope-Dog-Toy-Blue-front_500x.png?v=1648718216",
      link: "https://www.petexpress.com.ph/products/approved-teether-triangle-with-rope-dog-toy?pr_prod_strat=jac&pr_rec_id=d14b586d4&pr_rec_pid=6751938445443&pr_ref_pid=7901744431235&pr_seq=uniform",
    },
    {
      name: "Approved Dumbell with Spike Dog Toy 6 inches",
      price: " 99.75",
      description:
        "These pet toys can help redirect bad biting behavior and improve dental health.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10207836B-Approved-Dumbell-with-Spike-Dog-Toy-6-inches-Blue-main_500x.png?v=1648709776",
      link: "https://www.petexpress.com.ph/products/approved-dumbell-with-spike-dog-toy-6-inches?pr_prod_strat=jac&pr_rec_id=f5c12b94b&pr_rec_pid=6751525994627&pr_ref_pid=6751938445443&pr_seq=uniform",
    },
    {
      name: "Nina Ottosson Hide N Slide Interactive Level 2",
      price: "1,299.00",
      description: "Fun starts here with the Dog Hide N' Slide. ",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/Nina-Ottoson-Hide-n-Slide-Interactive-Dog-Toy-Level-2_500x.jpg?v=1619164123",
      link: "https://www.petexpress.com.ph/products/nina-ottosson-dog-hide-n-slide-interactive-dog-toy-level-2?pr_prod_strat=jac&pr_rec_id=4ac851a2e&pr_rec_pid=6562092875907&pr_ref_pid=6751525994627&pr_seq=uniform",
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
    <div className={`flex ${selectedItem ? "gap-4" : ""} p-4`}>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${
          selectedItem ? "3" : "4"
        } gap-4 flex-grow transition-all`}
      >
        {items.map((item, index) => (
          <StoreItemCard key={index} item={item} onSelect={handleSelectItem} />
        ))}
      </div>
      {selectedItem && (
        <ItemPreview item={selectedItem} onClose={handleClosePreview} />
      )}
    </div>
  );
}

export default Toys;
