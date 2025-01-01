import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
    
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token){
            alert('Bạn cần đăng nhập để truy cập DASHBOARD!');
            navigate('login');
            return;
        }
        fetch('http://localhost:3001/dashboard', {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then(response => {
            if (!response.ok) throw new Error("Unauthorized")
            return response.json();
        })
        .then(data => {
                setMessage(data.message)
                console.log("dang nhap thanh cong")
            })
        .catch(() => {
            alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.')
            localStorage.removeItem('token');
            navigate('/login');
        })   
    }, [navigate])
    
    return (
        <div className='bg-slate-700'>
            <div>Dashboard</div>
            <p>{message}</p>
        </div>
    )
}
