import axios from 'axios';
import { apiClient } from './apiClient';
import { DeviceCreateRequest, DeviceCreateResponse } from '../interfaces/General';


export async function device_create(deviceId: string, deviceData: DeviceCreateRequest): Promise<DeviceCreateResponse> {
  try {
    const response = await apiClient.post<DeviceCreateResponse>('/device/', deviceData, {
      headers: {
        'X-Device-Id': deviceId,
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