const ShelterProfilesMockData = [
  {
    user_id: 1,
    username: "Maro Org",
    isVerified: true,
    AdoptablesCount: 10,
    SuccessfulAdoptionCount: 25,
    profileDescription:
      "We are a non-profit animal shelter devoted to rescuing, rehabilitating, and rehoming abandoned and stray pets. Since our founding, we have successfully rescued and cared for over 300 animals, providing them with the love, medical attention, and support they deserve. Our mission is to create a safe haven for animals in need and connect them with loving forever homes. We also engage the community through educational programs and advocate for responsible pet ownership. Every life matters, and together, we can make a difference.",
    profilePicUrl: "http://pawtopia.scarlet2.io/images/image.png",
    coverPhotoUrl: "http://pawtopia.scarlet2.io/images/image.png",
    Adoptable: [
      {
        name: "Buddy",
        breed: "Golden Retriever",
        description: "Friendly and loves to play fetch.",
      },
      {
        name: "Whiskers",
        breed: "Tabby Cat",
        description: "Calm and loves to cuddle.",
      },
    ],
    Events: [
      {
        username: "HappyPawsShelter",
        isVerified: true,
        description: "Adoption fair this weekend!",
        img: "adoption-fair.jpg",
      },
      {
        username: "HappyPawsShelter",
        isVerified: true,
        description: "Pet care workshop.",
        img: "pet-care-workshop.jpg",
      },
    ],
    Donate: [
      {
        donateLink: "https://donate.happypawshelter.com",
        story: "Your donations help us care for pets until they find a home.",
      },
    ],
    Story: [
      {
        title: "Bella's Journey",
        description: "A heartwarming story of a rescue turned family member.",
        date: "2024-12-01",
        username: "HappyPawsShelter",
        link: "https://happypawshelter.com/bella-journey",
      },
      {
        title: "Max's Adoption Day",
        description: "Celebrating Max's adoption into his forever home.",
        date: "2024-11-15",
        username: "HappyPawsShelter",
        link: "https://happypawshelter.com/max-adoption",
      },
    ],
  },
  {
    user_id: 2,
    username: "CozyTails",
    isVerified: false,
    AdoptablesCount: 5,
    SuccessfulAdoptionCount: 12,
    profileDescription: "Helping pets find loving homes since 2015.",
    profilePicUrl: "https://example.com/cozytails-profile-pic.jpg",
    coverPhotoUrl: "https://example.com/cozytails-cover-photo.jpg",
    Adoptable: [
      {
        name: "Snowy",
        breed: "Siberian Husky",
        description: "Energetic and loves the snow.",
      },
      {
        name: "Coco",
        breed: "Cockatiel",
        description: "Talkative and loves to sing.",
      },
    ],
    Events: [
      {
        username: "CozyTails",
        isVerified: false,
        description: "Holiday adoption drive.",
        img: "holiday-drive.jpg",
      },
    ],
    Donate: [
      {
        donateLink: "https://donate.cozytails.com",
        story: "Support our shelter and help pets in need.",
      },
    ],
    Story: [
      {
        title: "Lucky's New Family",
        description: "From stray to cherished family member.",
        date: "2024-10-10",
        username: "CozyTails",
        link: "https://cozytails.com/lucky-story",
      },
    ],
  },
];

export default ShelterProfilesMockData;
