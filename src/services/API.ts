import axios from 'axios'
import { LibraryData } from './types'

const axioss = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Content-Type": 'application/json'
    }
})

export const fetchLibraryData = (token: string): Promise<LibraryData> => {
    return axioss.get('/library/history', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export const fetchAllFlashcardSets = async (): Promise<any> => {
    try {
        const response = await axioss.get('/flashcardsets/all', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.data.success){
            return response.data;
        }
        else{
            console.log('Failed to fetch all flashcardsets at api!');
        }
    }
    catch(error){
        console.log('Error fetching all flashcard sets: ', error)
    }

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

export const fetchChangeUserIntroduction = async (userId: string, message: string): Promise<{ success: boolean }> => {
    try {
        const response = await axioss.put('/modify/introduction', {
            userId,
            message
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })

        if (response.data.success) {
            console.log('User message updated successfully', response.data.data);
            return { success: true };
        } else {
            console.log('Error:', response.data.message);
            return { success: false };
        }
    }
    catch (error) {
        console.log('Error adjusting user introduction: ', error);
        throw error;
    }
}

export const fetchAllQuestions = async (setId: string): Promise<any> =>{
    try{
        const response = await axioss.get(`/api/getall/${setId}`,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
        if (response.data.success){
            console.log(response);
            return {success: true, data: response.data.data}
        }
        else{
            console.log('Error: ', response.data.message);
            return {success: false};
        }
    }
    catch (error){
        console.log('Error fetching all question of sets id: ' + setId + ' ' + error);
        throw error;
    }
}

