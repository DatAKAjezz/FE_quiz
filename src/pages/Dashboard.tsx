import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUserContributions, fetchUserData } from '../services/API';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { LuMapPin } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { IoShareSocialOutline } from 'react-icons/io5';

export const Dashboard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<any>();
    const [contributions, setContributions] = useState<any[]>([]);

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

    useEffect(() => {
        if (user) {
            console.log('User ID: ', user.id);
            fetchUserContributions(user.id)
                .then(response => {
                    if (response.success) {
                        setContributions(response.data);
                    }
                    else {
                        throw new Error(response.message);
                    }
                })
        }
    }, [user])

    useEffect(() => {
        if (contributions) {
            console.log('Contributions: ', contributions);
        }
    }, [contributions]);

    return (
        <div className='w-full h-full rounded-sm bg-slate-800 pt-16'>

            {
                user &&
                <div className='w-11/12 mx-auto flex flex-wrap shadow-xl bg-slate-700 rounded-md py-5'
                    style={{ backgroundColor: 'rgb(38, 48, 77)' }}
                >
                    <div className='w-3/12'>
                        <div className='w-9/12 px-5 py-3 rounded-md mx-auto' style={{ backgroundColor: 'rgb(38, 48, 77)' }}>
                            <img src={user.avatar_url} className='aspect-square rounded-full w-full mx-auto'></img>
                            <p className='font-bold text-center mt-3' style={{ fontSize: '20px' }}>{user.firstname} {user.lastname}</p>
                        </div>
                        <div className='ml-10 m-6 text-sm'>
                            <div className='flex items-center w-fit gap-3'>
                                <LuMapPin id='address' /><label htmlFor='address' className=''>{user.address}</label>
                            </div>
                            <div className='mt-1 flex items-center w-fit gap-3'>
                                <MdOutlineEmail id='email' /><label htmlFor='email' className=''>{user.email}</label>
                            </div>
                            <div className='transition-all duration-150 ease-in-out 
                                            mt-1 flex items-center overflow-hidden w-fit gap-3
                                            hover:text-purple-400'>
                                <IoShareSocialOutline id='social' />
                                <label htmlFor='social' className=''>
                                    <a style={{
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        width: '220px',
                                        overflow: 'hidden',
                                        display: 'inline-block'
                                    }}
                                        href={user.social_link}
                                    >
                                        {user.social_link}dsadsd
                                    </a>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className='w-9/12 pr-10'>
                        <div className='px-3 pt-5 w-full min-h-40 mx-auto border-gray-500 border-[1px] rounded-md'>
                            <div className='w-fit'>
                                <p className='font-bold'>&nbsp;Introduction&nbsp;</p>
                                <div className='h-[4px] rounded-md w- bg-purple-400'></div>
                            </div>
                            <br />
                            <p className='text-sm px-2'>{user.readme}</p>

                        </div>

                        <div className='w-full mx-auto mt-10 border-gray-400 px-5 py-5 rounded-md'
                            style={{ borderWidth: '2px' }}>
                            {
                                contributions ? (
                                    <CalendarHeatmap
                                        startDate={new Date('2024-01-01')}
                                        endDate={new Date('2024-12-31')}
                                        values={contributions.map(({ date, count }) => ({ date: date, count: count }))}
                                        titleForValue={(value) => {
                                            if (!value) return "No contributions";
                                            return `${value.count}` + (value.count > 1 ? ' contributions' : ' contribution');
                                        }}
                                    />
                                ) : (
                                    <p>Đang tải dữ liệu đóng góp...</p>
                                )
                            }

                        </div>

                    </div>

                </div>
            }

        </div>
    )
}
