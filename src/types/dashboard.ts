export type Order = {
  itemId: number;
  quantity: number;
};

export type Participant = {
  name: string;
  order: Order[];
};

export type Item = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type Bill = {
  code: string;
  title: string;
  description: string;
  date: Date;
  items: Item[];
  participants: Participant[];
};
