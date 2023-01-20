export interface SignUp {
    name:string,
    password:string,
    email:string
}
export interface login {
  password: string;
  email: string;
}
export interface product {
  name : string;
  price : number;
  category : string;
  description : string;
  image : string;
  color : string;
  id : number;
  quantity : number;
  productId : undefined | number;
}

export interface cart {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  color: string;
  id: number | undefined;
  quantity: number | undefined;
  userId : number;
  productId : number;
}

export interface priceSummary {
  price : number;
  discount : number;
  delivery : number;
  total : number;
  tax : number;
}

export interface order {
  email : string;
  address : string;
  contact : string;
  totalPrice : number;
  userId : number;
  id : number | undefined;
}