import axios from 'axios';
import { Currency } from '../interfaces/General';
import { apiClient } from './apiClient';


export async function getCurrencies(): Promise<Currency[]> {
  const apiKey = process.env.API_KEY;
  try {
    const response = await apiClient.get<Currency[]>('/currencies', {
      headers: {
        'X-Device-Id': apiKey, 
        'Authorization': `Bearer ${apiKey}`, 
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 403) {
          throw new Error('The authentication credentials were not provided.');
        } else if (error.response.status === 500) {
          throw new Error('Some internal error happened. Try again or, if the problem persists, contact us.');
        }
      }
    }
    throw new Error('An unknown error occurred.');
  }
}