import axios from "axios";
import { CreateOrderRequest, CreateOrderResponse, Order } from "../interfaces/General";
import { apiClient } from "./apiClient";

const apiKey = process.env.API_KEY;

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          throw new Error('The authentication credentials were not provided.');
        case 404:
          throw new Error('Invalid currency or minimum amount not reached. Url redirections or symbol missed. DNI Image is missed.');
        case 500:
          throw new Error('Some internal error happened. Try again or, if the problem persists, contact us.');
        default:
          throw new Error('An unknown error occurred.');
      }
    }
  }
  throw new Error('An unknown error occurred.');
};

export async function orders_list(start?: string, end?: string): Promise<Order[]> {
  try {
    const response = await apiClient.get<Order[]>('/orders/', {
      headers: {
        'X-Device-Id': apiKey,
      },
      params: {
        start,
        end,
      },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
  return [];
}

export async function orders_create(orderData: CreateOrderRequest): Promise<CreateOrderResponse | undefined> {
  try {
    const response = await apiClient.post<CreateOrderResponse>('/orders/', orderData, {
      headers: {
        'X-Device-Id': apiKey,
      },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
  return undefined;
}

export async function orders_info_read(identifier: string): Promise<Order | undefined> {
  try {
    const response = await apiClient.get<Order>(`/orders/info/${identifier}`, {
      headers: {
        'X-Device-Id': apiKey,
      },
    });

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
}