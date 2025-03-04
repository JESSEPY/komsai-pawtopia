import React, { useState } from "react";
import StoreItemCard from "../../Cards/StoreItemCard";
import ItemPreview from "../../Cards//ItemPreview";
import dummyImg from "../../../../assets/store/dummy_img.jpg";

function Accessories() {
  const [items] = useState([
    {
      name: "Zee.Dog Gotham Adjustable Air Mesh Dog Harness",
      price: "899.00",
      description:
        "Fully adjustable neck and waist adjustments for perfect fit and security",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/PET-10271471-ZeeDog-Gotham-Adjustable-Air-mesh-xtra-small-dog-harness-2_500x.png?v=1635989438",
      link: "https://www.petexpress.com.ph/products/zee-dog-gotham-adjustable-air-mesh-dog-harness?pr_prod_strat=e5_desc&pr_rec_id=d0cbdbd3d&pr_rec_pid=6660881711235&pr_ref_pid=7714794963075&pr_seq=uniform",
    },
    {
      name: "Zee.Dog Ella Adjustable Air Mesh Dog Harness",
      price: "899.00",
      description: "Lightweight breathable mesh dries up quickly",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/PET-10271482-ZeeDog-Ella-Adjustable-Airmesh-xsml-dog-harness-1_500x.png?v=1635990386",
      link: "https://www.petexpress.com.ph/products/zee-dog-ella-adjustable-air-mesh-dog-harness?pr_prod_strat=e5_desc&pr_rec_id=a7c10d0b3&pr_rec_pid=6660882202755&pr_ref_pid=6660881711235&pr_seq=uniform",
    },
    {
      name: "Adjustable Pet Harness",
      price: "899.00",
      description: "Velcro neck enclosure",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/PET-10271486-ZeeDog-Prisma-Adjustable-Airmesh-xsml-dog-harness-1_500x.png?v=1635990722",
      link: "https://www.petexpress.com.ph/products/zee-dog-prisma-adjustable-air-mesh-dog-harness?pr_prod_strat=e5_desc&pr_rec_id=2e0135539&pr_rec_pid=6660882333827&pr_ref_pid=6660882202755&pr_seq=uniform",
    },
    {
      name: "Zee.Dog Atlanta Adjustable Air Mesh Dog Harness",
      price: "898.00",
      description: "Breathable and light mesh fabric",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/PET-10271490-ZeeDog-Atlanta-Adjustable-Airmesh-xsml-dog-harness-1_500x.png?v=1635990945",
      link: "https://www.petexpress.com.ph/products/zee-dog-atlanta-adjustable-air-mesh-dog-harness?pr_prod_strat=e5_desc&pr_rec_id=1561b979c&pr_rec_pid=6660882464899&pr_ref_pid=6660882333827&pr_seq=uniform",
    },
    {
      name: "M-Pets Flash Retractable 3m Dog Leash White Orange",
      price: "899.00",
      description:
        "Leads Premium Durable Pet Walking Leads Traction Rope Pet Products",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/files/10304302M-PetsFlashRetractable3mDogLeashWhiteOrangeB_500x.png?v=1728022105",
      link: "https://www.petexpress.com.ph/products/m-pets-flash-retractable-3m-dog-leash-white-orange?pr_prod_strat=jac&pr_rec_id=42ac04b36&pr_rec_pid=8469284716675&pr_ref_pid=6660882464899&pr_seq=uniform",
    },
    {
      name: "M-Pets Hiking Dog Harness Extra Large Black Orange",
      price: "2,199.00",
      description: "HIKING DOG HARNESS",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/files/10310253M-PetsHikingDogHarnessExtraLargBlackOrangeA_500x.png?v=1728021699",
      link: "https://www.petexpress.com.ph/products/m-pets-hiking-dog-harness-extra-large-black-orange?pr_prod_strat=e5_desc&pr_rec_id=38536ce13&pr_rec_pid=8469285666947&pr_ref_pid=8469284716675&pr_seq=uniform",
    },
    {
      name: "M-Pets Hiking Dog Collar Extra Large Black Orange",
      price: "479.00",
      description: "HIKING DOG COLLAR",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/files/10310257M-PetsHikingDogCollarExtraLargBlackOrangeA_500x.png?v=1728021665",
      link: "https://www.petexpress.com.ph/products/m-pets-hiking-dog-collar-extra-large-black-orange?pr_prod_strat=e5_desc&pr_rec_id=14651194a&pr_rec_pid=8469285929091&pr_ref_pid=8469285666947&pr_seq=uniformz ",
    },
    {
      name: "Doggo Strong Harness Black Medium",
      price: "399.00",
      description: "Doggo Medium Strong Harness",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10269108-ES-DOGGO---STRONG-HARNESS---MEDIUM-SIZE---BLACK_500x.jpg?v=1615709297",
      link: "https://www.petexpress.com.ph/products/doggo-strong-harness-black-medium?pr_prod_strat=e5_desc&pr_rec_id=c1ca6798c&pr_rec_pid=6543919054979&pr_ref_pid=8469285929091&pr_seq=uniform",
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

export default Accessories;
