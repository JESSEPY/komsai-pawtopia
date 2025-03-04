import React, { useState } from "react";
import StoreItemCard from "../../Cards/StoreItemCard";
import ItemPreview from "../../Cards//ItemPreview";
import dummyImg from "../../../../assets/store/dummy_img.jpg";

function Overview() {
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

export default Overview;
