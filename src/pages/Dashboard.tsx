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
                localStorage.setItem('user', JSON.stringify(data.message))
                console.log("dang nhap thanh cong")
            })
        .catch(() => {
            alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.')
            localStorage.removeItem('token');
            navigate('/login');
        })   
    }, [navigate])
    
    return (
        <div>
            <div className='w-full h-full rounded-sm bg-slate-700'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit quidem ducimus nostrum in eos, voluptas odio temporibus sunt accusantium inventore ratione exercitationem dolorem sed ad, amet architecto, explicabo rerum labore!
            </div>
            <p>{message}</p>
        </div>
    )
}
