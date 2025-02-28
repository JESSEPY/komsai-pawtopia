const ShelterEventsMockData = [
  {
    userId: 1,
    username: "HappyPawsShelter",
    profileImg: "http://pawtopia.scarlet2.io/images/image.png",
    isVerified: true,
    events: [
      {
        eventDescription:
          'Join us for "Paws of Hope," a donation drive dedicated to supporting rescued animals in need. Taking place on January 15, 2025, from 10:00 AM to 5:00 PM at the Community Center in Pawville, this event is your chance to make a difference. We’re accepting donations of pet food, blankets, toys, grooming kits, and cleaning supplies, as well as monetary contributions to support veterinary care and shelter maintenance.',
        datePosted: "2024-12-20",
        eventImg: "http://pawtopia.scarlet2.io/images/event",
      },
      {
        eventDescription:
          "Special fundraiser event for building a new shelter wing. Your support can make a huge difference.",
        datePosted: "2024-12-18",
        eventImg: "http://pawtopia.scarlet2.io/images/event",
      },
    ],
  },
  {
    userId: 2,
    username: "CozyTails",
    profileImg: "http://pawtopia.scarlet2.io/images/shelter2-profile.png",
    isVerified: false,
    events: [
      {
        eventDescription:
          "Attend our pet care workshop to learn the essentials of caring for your furry friends. Limited spots available—register now!",
        datePosted: "2024-12-15",
        eventImg: "http://pawtopia.scarlet2.io/images/pet-care-workshop.jpg",
      },
    ],
  },
];

export default ShelterEventsMockData;
