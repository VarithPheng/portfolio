export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "krama-silk-01",
    name: "Silk Krama Scarf",
    description:
      "Handwoven Cambodian silk krama in traditional checkered pattern.",
    price: 1,
    image:
      "https://images.unsplash.com/photo-1601924921557-45e8e0e8f984?w=400&h=400&fit=crop",
    category: "Accessories",
  },
  {
    id: "pepper-kampot-01",
    name: "Kampot Pepper (100g)",
    description:
      "World-renowned Kampot black pepper, sun-dried and hand-sorted.",
    price: 12.5,
    image:
      "https://images.unsplash.com/photo-1599909533601-aa39e4643ae6?w=400&h=400&fit=crop",
    category: "Food",
  },
  {
    id: "coffee-mondulkiri-01",
    name: "Mondulkiri Coffee Beans",
    description:
      "Single-origin Arabica beans from the highlands of Mondulkiri.",
    price: 18.0,
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Food",
  },
  {
    id: "palmsugar-01",
    name: "Organic Palm Sugar",
    description:
      "Traditional Cambodian palm sugar, unrefined and naturally sweet.",
    price: 8.0,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=400&fit=crop",
    category: "Food",
  },
  {
    id: "bag-rattan-01",
    name: "Handwoven Rattan Bag",
    description: "Artisan-crafted rattan bag, perfect for everyday use.",
    price: 35.0,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
    category: "Accessories",
  },
  {
    id: "ceramics-01",
    name: "Khmer Ceramic Bowl Set",
    description:
      "Set of 4 handmade ceramic bowls with traditional Angkor motifs.",
    price: 42.0,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop",
    category: "Home",
  },
];
