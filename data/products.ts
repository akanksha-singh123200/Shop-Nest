export interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
}

export const products: ProductType[] = [
  {
    id: 1,
    title: "Running Shoes",
    price: 999,
    image: "/shoes.png",
  },

  {
    id: 2,
    title: "Smart Watch",
    price: 1999,
    image: "/SmartWatch.webp",
  },

  {
    id: 3,
    title: "Wireless Earbuds",
    price: 1499,
    image: "/WirelessEarbuds.jpg",
  },

  {
    id: 4,
    title: "Laptop Bag",
    price: 799,
    image: "/LaptopBag.webp",
  },
];