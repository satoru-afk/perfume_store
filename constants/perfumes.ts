export interface Perfume {
  id: number
  name: string
  family: string
  description: string
  price: number
  imageUrl: string
  rating: number
  reviews: number
  notes?: string[] // Optional: for product detail page
  size?: number // Optional: in ml
  isFeatuer?: boolean // Optional: for feature component
}

export const perfumes: Perfume[] = [
  {
    id: 1,
    name: "Asteroid B-612", 
    family: "Woody Floral",
    description: "A tender blend of rose, vanilla, and cedarwood, capturing the essence of the Little Prince's beloved flower.",
    price: 98,
    imageUrl: "/images/perfume-1.jpeg",
    rating: 4,
    reviews: 128,
    size: 50,
    notes: ["Rose", "Vanilla", "Cedarwood"],
    isFeatuer: true
  },
  {
    id: 2,
    name: "Starry Night",
    family: "Fougère Amber",
    description: "A celestial composition of lavender, tonka bean, and musk that evokes the magic of a thousand stars.",
    price: 120,
    imageUrl: "/images/perfume-2.jpeg",
    rating: 5,
    reviews: 89,
    size: 100,
    notes: ["Lavender", "Tonka Bean", "Musk"],
    isFeatuer: true
  },
  {
    id: 3,
    name: "Desert Mirage",
    family: "Spicy Oriental",
    description: "Mysterious blend of saffron, sandalwood, and amber that tells the story of the desert's hidden wells.",
    price: 110,
    imageUrl: "/images/perfume-3.jpeg",
    rating: 4,
    reviews: 76,
    size: 75,
    notes: ["Saffron", "Sandalwood", "Amber"],
    isFeatuer: true
  },
  {
    id: 4,
    name: "Ocean's Whisper",
    family: "Floral Aquatic",
    description: "A refreshing mix of sea salt, jasmine, and driftwood, reminiscent of a serene ocean breeze.",
    price: 85,
    imageUrl: "/images/perfume-4.jpeg",
    rating: 4,
    reviews: 95,
    size: 50,
    notes: ["Sea Salt", "Jasmine", "Driftwood"]
  },
  {
    id: 5,
    name: "Crimson Bloom",
    family: "Floral Fruity",
    description: "A vibrant blend of red berries, peony, and vanilla, capturing the essence of a blooming garden.",
    price: 90,
    imageUrl: "/images/perfume-5.jpeg",
    rating: 5,
    reviews: 110,
    size: 75,
    notes: ["Red Berries", "Peony", "Vanilla"]
  },
  {
    id: 6,
    name: "Midnight Ember",
    family: "Spicy Woody",
    description: "A warm and inviting scent with notes of cinnamon, oud, and patchouli, perfect for cozy evenings.",
    price: 130,
    imageUrl: "/images/perfume-6.jpeg",
    rating: 4,
    reviews: 68,
    size: 100,
    notes: ["Cinnamon", "Oud", "Patchouli"]
  },
  {
    id: 7,
    name: "Golden Hour",
    family: "Citrus",
    description: "A bright and uplifting fragrance with notes of bergamot, neroli, and vetiver, like a sunset in a bottle.",
    price: 75,
    imageUrl: "/images/perfume-7.jpeg",
    rating: 5,
    reviews: 135,
    size: 50,
    notes: ["Bergamot", "Neroli", "Vetiver"]
  },
  {
    id: 8,
    name: "Whispering Woods",
    family: "Woody",
    description: "A grounding scent with notes of cedar, fir, and moss, reminiscent of a peaceful forest retreat.",
    price: 95,
    imageUrl: "/images/perfume-8.jpeg",
    rating: 4,
    reviews: 82,
    size: 75,
    notes: ["Cedar", "Fir", "Moss"]
  }, {
    id: 9,
    name: "Velvet Rose",
    family: "Floral",
    description: "A luxurious blend of rose, raspberry, and amber that envelops you in a soft, velvety embrace.",
    price: 115,
    imageUrl: "/images/perfume-9.jpeg",
    rating: 5,
    reviews: 150,
    size: 100,
    notes: ["Rose", "Raspberry", "Amber"]
  }, {
    id: 10,
    name: "Elysian Fields",
    family: "Floral",
    description: "A fresh and airy scent with notes of green apple, jasmine, and white musk, evoking a serene garden.",
    price: 80,
    imageUrl: "/images/perfume-10.jpeg",
    rating: 4,
    reviews: 77,
    size: 50,
    notes: ["Green Apple", "Jasmine", "White Musk"]
  }

]

  
