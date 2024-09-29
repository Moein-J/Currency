interface Currency {
  name: string;
  price: number;
  info: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

type FormValues = {
  email: string;
  name: string;
  price: number;
  information: string;
};
