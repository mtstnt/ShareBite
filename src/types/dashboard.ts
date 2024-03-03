export type Order = {
  id: number;
  itemId: number;
  quantity: number;
};

export type Participant = {
  id: number;
  name: string;
  orders: Order[];
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
  isHost: boolean,
};
