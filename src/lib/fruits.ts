export interface Fruit {
  id: string;
  name: string;
  value: number;
  price: number;
  image?: string;
}

export const fruits: Fruit[] = [
  { id: "1", name: "Dragon", value: 2300000, price: 2500000 },
  { id: "2", name: "Soul", value: 2100000, price: 2300000 },
  { id: "3", name: "Venom", value: 2500000, price: 2700000 },
  { id: "4", name: "Shadow", value: 1900000, price: 2100000 },
  { id: "5", name: "Control", value: 1800000, price: 2000000 },
  { id: "6", name: "Dough", value: 2000000, price: 2200000 },
];
