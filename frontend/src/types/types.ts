export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  quantity?: number;
  status?: string;
  mobileNumber?: string;
};

export type Order = {
  id: number;
  deliverTo: string;
  mobileNumber: string;
  status: string;
  dishes: Dish[];
};

export interface RouteParams {
  dishId: string;
};

export interface ErrorAlertProps {
  error: { message: string } | null;
};

export type HomeProps = {
  addToCart: (dish: Dish) => void;
};

export interface MenuProps {
  cartCount: number;
};
