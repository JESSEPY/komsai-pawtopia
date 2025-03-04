import React, { useState } from "react";
import StoreItemCard from "../../Cards/StoreItemCard";
import ItemPreview from "../../Cards//ItemPreview";
import dummyImg from "../../../../assets/store/dummy_img.jpg";

function PetFood() {
  const [items] = useState([
    // 🥩 Pet Food (Dogs & Cats)
    {
      name: "Orijen Senior Dry Dog Food 2kg",
      price: "1,364.00",
      description: "High-quality dog food with essential nutrients.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/files/10308540OrijenSeniorDryDogFood2kgA_500x.png?v=1720594542",
      link: "https://www.petexpress.com.ph/products/orijen-senior-dry-dog-food-2kg?_pos=1&_sid=0d64f6fa3&_ss=r",
    },
    {
      name: "Taste of The Wild Puppy Pacific Stream Dry Dog Food 2kg",
      price: "1,092.00",
      description: "Pacific Stream puppy formula with smoked salmon",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/files/103088_2_500x.png?v=1725609076",
      link: "https://www.petexpress.com.ph/products/taste-of-the-wild-puppy-pacific-stream-dry-dog-food-2kg?pr_prod_strat=jac&pr_rec_id=98d7ff6dc&pr_rec_pid=8450098462851&pr_ref_pid=8391075856515&pr_seq=uniform",
    },
    {
      name: "Taste of The Wild Pacific Stream Dry Dog Food 2kg",
      price: "1,044.00",
      description: "Pacific Stream Canine formula with smoked Salmon",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/files/103088_1_5bb31732-a6b5-4c09-811c-40b6970ecd40_500x.png?v=1725609249",
      link: "https://www.petexpress.com.ph/products/taste-of-the-wild-pacific-stream-dry-dog-food-2kg?pr_prod_strat=e5_desc&pr_rec_id=404f50ec8&pr_rec_pid=8450097971331&pr_ref_pid=8450098462851&pr_seq=uniform",
    },
    {
      name: "Carnilove Adult Salmon Dry Dog Food 12kg",
      price: "4,199.00",
      description:
        "Grain-free and Potato-free formula suitable for adult dogs of all breeds.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10236768-Carnilove-Salmon-Adult-12kg-iii_500x.jpg?v=1614823294",
      link: "https://www.petexpress.com.ph/products/carnilove-salmon-adult-12kg?pr_prod_strat=e5_desc&pr_rec_id=29a51190d&pr_rec_pid=5024639287427&pr_ref_pid=8450097971331&pr_seq=uniform",
    },
    {
      name: "Aozi Wet Dog Food 100g (15 pouches)",
      price: "885.00",
      description:
        "Natural Balanced Nutrition. No Preservatives. No Artificial Flavoring. No Coloring. No GMO",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10283717-Aozi-Liver-Wet-Dog-Food-100g-front_500x.png?v=1664271080",
      link: "https://www.petexpress.com.ph/products/aozi-salmon-wet-dog-food-100g-12-pouches?_pos=1&_sid=9e9a592de&_ss=r",
    },
    {
      name: "Aozi Salmon and Liver Wet Dog Food 430g (2 cans)",
      price: "210.00",
      description: "For Dogs of All Breeds and Life Stages",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/files/10276829AoziSalmon_LiverWetDogFood430gA_500x.jpg?v=1694416176",
      link: "https://www.petexpress.com.ph/products/aozi-salmon-and-liver-wet-dog-food-430g-2-cans?pr_prod_strat=e5_desc&pr_rec_id=1dafbfd7e&pr_rec_pid=6737730863235&pr_ref_pid=6537101836419&pr_seq=uniform",
    },
    {
      name: "Pet Plus Training Treats Beef Dog Treats 50g",
      price: "49.00",
      description: "Highly palatable dog treat that is safe for digestion",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10275861-Pet-Plus-Training-Treats-Beef-Dog-Treats-50g-front_500x.png?v=1646027557",
      link: "https://www.petexpress.com.ph/products/pet-plus-training-treats-beef-dog-treats-50g?pr_prod_strat=jac&pr_rec_id=65458dd05&pr_rec_pid=6737731584131&pr_ref_pid=6737730863235&pr_seq=uniform",
    },
    {
      name: "Pet Plus Train and Reward Mix Sandwiches Dog Treats 350g",
      price: "224.00",
      description:
        "A dog biscuit that is made of cereals with significant source of protein",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10289771-Pet-Plus-Train-and-Reward-Mix-Sandwiches-350g-front_500x.png?v=1680248014",
      link: "https://www.petexpress.com.ph/products/pet-plus-train-and-reward-mix-sandwiches-350g?pr_prod_strat=e5_desc&pr_rec_id=dc81e2ea6&pr_rec_pid=7878731137155&pr_ref_pid=6737731584131&pr_seq=uniform",
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

export default PetFood;
