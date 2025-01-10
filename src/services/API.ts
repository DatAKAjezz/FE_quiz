import axios from 'axios'
import { LibraryData } from './types'

const axioss = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Content-Type": 'application/json'
    }
})

export const fetchLibraryData = (token: string): Promise<LibraryData> => {
    return axioss.get('/library', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const fetchUserData = async (token: string): Promise<any> => {
    try {
        const response = await axioss.get('/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response;
    }
    catch (error) {
        console.log('Error fetching user data: ', error);
        throw error;
    }
}

export const fetchUserContributions = async (userId: string): Promise<any> => {
    try {
      const response = await axioss.get(`/api/contributions/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contributions:', error);
      throw error; 
    }
  };
  

