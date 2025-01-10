import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUserData } from '../services/API';

export const Dashboard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<any>();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Bạn cần đăng nhập để truy cập DASHBOARD!');
            navigate('/login');
            return;
        }

        fetchUserData(token)
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    setUser(response.data.data[0])
                    console.log("Đăng nhập thành công\nUser Data:", response.data.data[0]);
                } else {
                    throw new Error(response.data.message);
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

        {
            user &&
            <div className='w-5/6 mx-auto flex bg-slate-700 rounded-md py-5'>
                <div className='w-1/3'>
                    <div>
                        <img src = {user.avatar_url} className='aspect-square rounded-full w-8/12 mx-auto'></img>
                    </div>
                </div>

                <div className='w-2/3 pr-10'>
                    <div className='px-3 pt-5 w-full min-h-40 mx-auto border-gray-500 border-[1px] rounded-md'>
                        <div className='w-fit'>
                            <p className='font-bold'>&nbsp;Introduction&nbsp;</p>
                            <div className='h-[4px] rounded-md w- bg-purple-400'></div>
                        </div>
                        <br/>
                        <p>Xin chào tôi là {user.username}. Sở thích của tôi là ngủ.</p>

                    </div>
                </div>
            </div>
        }

        </div>
    )
}
