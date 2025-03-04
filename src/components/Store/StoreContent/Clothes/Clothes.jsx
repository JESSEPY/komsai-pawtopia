import React, { useState } from "react";
import StoreItemCard from "../../Cards/StoreItemCard";
import ItemPreview from "../../Cards//ItemPreview";
import dummyImg from "../../../../assets/store/dummy_img.jpg";

function Clothes() {
  const [items] = useState([
    {
      name: "Pawsh Couture UAAP Collection UP Dog Apparel",
      price: "199.00",
      description: "These jerseys are absolute pet favorites.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10245723-Pawsh-Couture-UAAP-Collection-UP-Dog-Apparel-Small-front_500x.jpg?v=1648602904",
      link: "https://www.petexpress.com.ph/products/uaap-collection-dog-apparel-up",
    },
    {
      name: "Pawsh Couture UAAP Collection NU Dog Apparel",
      price: "199.00",
      description:
        "UAAP Collection dog apparel is breathable, comfortable and practical.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/NU-JERSEY_7902f12a-f3b6-4dea-9765-517ecfa75e8c_500x.jpg?v=1618409020",
      link: "https://www.petexpress.com.ph/products/uaap-collection-dog-apparel-nu",
    },
    {
      name: "Pawsh Couture Inspawrations Love Dog Apparel",
      price: "149.00",
      description:
        "Made of breathable & comfortable fabric, your pet will surely love fitting into this.",
      photo:
        "https://cdn.shopify.com/s/files/1/0386/4113/9843/files/Pawsh_Couture_Inspawrations_Love_Dog_Apparel_a_480x480.png?v=1649232716",
      link: "https://www.petexpress.com.ph/products/pawsh-couture-inspawrations-love-dog-apparel?pr_prod_strat=e5_desc&pr_rec_id=60fab72dd&pr_rec_pid=6754611363971&pr_ref_pid=6552209653891&pr_seq=uniform",
    },
    {
      name: "Pawsh Couture Inspawrations Pray Dog Apparel",
      price: "149.00",
      description:
        "Made mainly from cotton jersey, this is perfect for daily wear.",
      photo:
        "https://cdn.shopify.com/s/files/1/0386/4113/9843/files/Pawsh_Couture_Inspawrations_Pray_Dog_Apparel_a_480x480.png?v=1649231859",
      link: "https://www.petexpress.com.ph/products/pawsh-couture-inspawrations-pray-dog-apparel?pr_prod_strat=e5_desc&pr_rec_id=08693aac1&pr_rec_pid=6754608611459&pr_ref_pid=6754611363971&pr_seq=uniform",
    },
    {
      name: "Pawsh Couture Board Shorts Digi Grey Camouflage Dog Apparel",
      price: "149.00",
      description:
        "This piece is perfect for your pet's everyday activities even water activities.",
      photo:
        "https://cdn.shopify.com/s/files/1/0386/4113/9843/files/BOARD_SHORTS-DIGI_CAMO_GREY_S-XXL_PIC_1_480x480.png?v=1612171626",
      link: "https://www.petexpress.com.ph/products/pawsh-couture-board-shorts-digi-camouflage-grey",
    },
    {
      name: "Pawsh Couture Board Shorts Purple Polka Dog Apparel",
      price: "149.00",
      description:
        "This piece is perfect for your pet's everyday activities even water activities.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10268805--1_04086c42-22a6-4b3e-a617-353ebb65310d_500x.jpg?v=1623312616",
      link: "https://www.petexpress.com.ph/products/pawsh-couture-board-shorts-purple-polka",
    },
    {
      name: "Pawsh Couture Marley Bunny Dog Apparel Red",
      price: "179.00",
      description:
        "The overall breathable fabric makes this tee a practical piece even in tropical climates.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10289926PawshCoutureMarleyBunnyDogApparelSmallReda_500x.png?v=1680256351",
      link: "https://www.petexpress.com.ph/products/pawsh-couture-marley-bunny-dog-apparel-red",
    },
    {
      name: "Pawsh Couture Abby Dress Hearts Dog Apparel Blue",
      price: "199.00",
      description:
        "This limited-edition dress is made of lightweight and breathable fabric materials with cute bunny prints.",
      photo:
        "https://www.petexpress.com.ph/cdn/shop/products/10290069PawshCoutureAbbyDressHeartsDogApparelSmallBluea_500x.png?v=1680256718",
      link: "https://www.petexpress.com.ph/products/pawsh-couture-abby-dress-hearts-dog-apparel-blue?pr_prod_strat=e5_desc&pr_rec_id=a7bee447b&pr_rec_pid=7878736543875&pr_ref_pid=7878736412803&pr_seq=uniform",
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

export default Clothes;
