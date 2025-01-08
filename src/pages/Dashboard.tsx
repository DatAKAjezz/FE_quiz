import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Dashboard = () => {
    
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Bạn cần đăng nhập để truy cập DASHBOARD!');
            navigate('/login');  // Thêm dấu / trước login
            return;
        }
    
        fetch('http://localhost:3001/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) throw new Error("Unauthorized");
            return response.json();
        })
        .then(data => {
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.data));
                setMessage(JSON.stringify(data.data)); // Hiển thị data
                console.log("Đăng nhập thành công\nUser Data:", data.data);
            } else {
                throw new Error(data.message);
            }
        })
        .catch((error) => {
            alert('Có lỗi xảy ra: ' + error.message);
            localStorage.removeItem('token');
            navigate('/login');
        });
    }, [navigate]);
    
    return (
        <div className='w-full h-full rounded-sm bg-slate-800'>

            <ul>
                <li></li>
            </ul>

        </div>
    )
}
