export interface Dish {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  quantity: number;
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
  orderId: string;
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

export interface OrderFormProps {
  order: Order;
  setOrder?: React.Dispatch<React.SetStateAction<Order>>;
  onSubmit?: (order: Order) => void;
  children?: React.ReactNode;
  readOnly: boolean;
  showStatus: boolean;
};

export interface FetchError extends Error {
  status?: number;
  response?: Response;
};

export type DishFormProps = {
  onSubmit: (dish: Dish) => void;
  onCancel: () => void;
  initialState?:Dish;
};

export interface DishCardProps {
  dish: Dish;
  children: React.ReactNode;
};