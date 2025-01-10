import axios from 'axios'
import { LibraryData, UserData } from './types'

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

export const fetchUserData = (token: string): Promise<UserData> => {
    return axioss.get('/dashboard',{
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        }})
}

