import axios from 'axios'

const axioss = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Content-Type": 'application/json'
    },
    timeout: 30000,
})

export default axioss