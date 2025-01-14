import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchChangeUserIntroduction, fetchUserContributions, fetchUserData } from '../services/API';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { LuMapPin, LuPenLine } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { IoShareSocialOutline } from 'react-icons/io5';
import { RiImageAddLine } from 'react-icons/ri';
import axios from 'axios';

export const Dashboard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<any>();
    const [contributions, setContributions] = useState<any[]>([]);
    const [adjustMode, setAdjustMode] = useState<boolean>(false);
    const refInputIntro = useRef<HTMLTextAreaElement>(null);
    const [introMessage, setIntroMessage] = useState<string>('');

    const fetchUser = () => {
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
                }
            })
            .catch((error) => {
                alert('Có lỗi xảy ra: ' + error.message);
                localStorage.removeItem('token');
                navigate('/login');
            });
    }

    useEffect(() => {
        fetchUser();
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

    useEffect(() => {
        const handleClickOutSide = (event: any) => {
            event.preventDefault();
            if (event.target === refInputIntro.current) {
                return;
            }
            setAdjustMode(false);
        }
        window.addEventListener('mousedown', handleClickOutSide);

        return () => {
            window.removeEventListener('mousedown', handleClickOutSide);
        }

    }, [])
    const handleInputIntroductionChange = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const x = await fetchChangeUserIntroduction(user.user_id, introMessage);
            try {
                if (x.success) {
                    console.log('User info updated successfully.');
                    fetchUser();
                } else {
                    console.log('User info update failed.');
                }
            } catch (error) {
                console.log('Error: ', error);
            }
        }
    }

    const handleAutoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    // MARK: image
    const [image, setImage] = useState<any>(null);
    const [images, setImages] = useState<any>([]);

    const handleImageChange = (e: any) => {
        setImage(e.target.files[0]);
    }

    const fetchImage = async () => {
        if (!user) return;
        try {
            const res = await axios.get(`http://localhost:3001/images/${user.id}`);
            setImages(res.data.data);
        } catch (err) {
            console.error(err); 
        }
    };

    const handleUpload = async () => {
        if (!image || !user) return alert('No image provided');

        const formData = new FormData();
        formData.append('image', image);
        formData.append('userId', user.id);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            alert(response.data.message);
            fetchImage();

        }
        catch (err) { console.log('Error at uploading image: ', err) };

    }

    useEffect(() => {
        fetchImage();
        
    }, [user]);


    return (
        <div className='w-full h-full rounded-sm bg-slate-800 pt-16'>
            {
                user &&
                <div className='w-11/12 mx-auto flex flex-wrap shadow-xl bg-slate-700 rounded-md py-5'
                    style={{ backgroundColor: 'rgb(38, 48, 77)' }}
                >
                    <div className='w-3/12'>

                        <div className='w-9/12 px-5 py-3 rounded-md mx-auto' style={{ backgroundColor: 'rgb(38, 48, 77)' }}>

                            <div className='relative w-full mx-auto rounded-full group'>

                                <img             
                                    src={`http://localhost:3001${images[0]?.image_path}`}
                                    className="rounded-full aspect-square w-full mx-auto transition-opacity duration-300 group-hover:opacity-50" />
                                <RiImageAddLine
                                    className="absolute text-white text-3xl opacity-0 transition-opacity duration-300 
                                               group-hover:opacity-100 group-hover:scale-110"
                                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                                    title="upload image"
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
                                />
                            </div>
                            <button onClick={handleUpload}>Upload</button>

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
                                        target='_blank'
                                    >
                                        {user.social_link}dsadsd
                                    </a>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/*MARK: right
  */}
                    <div className='w-9/12 pr-10'>
                        <div className='relative px-3 pt-5 w-full min-h-40 mx-auto border-gray-500 border-[1px] rounded-md'>
                            <div className='w-fit'>
                                <p className='font-bold'>&nbsp;Introduction&nbsp;</p>
                                <div className='h-[4px] rounded-md w- bg-purple-400'></div>
                            </div>
                            <br />

                            {
                                adjustMode ?
                                    <textarea

                                        ref={refInputIntro}
                                        autoFocus
                                        className='border-white w-full shadow-md'
                                        style={{ backgroundColor: 'rgb(38, 48, 77)' }}
                                        value={introMessage}
                                        onChange={(event) => {
                                            setIntroMessage(event.target.value);
                                            handleAutoResize(event)
                                        }}
                                        onKeyDown={(event) => handleInputIntroductionChange(event)}
                                    />

                                    :
                                    <p className='text-sm px-2 whitespace-normal'>{user.readme}</p>

                            }

                            <LuPenLine className='absolute top-5 right-5 cursor-pointer hover:text-purple-400 
                                                  transition-all duration-200 ease-in-out text-xl'
                                onClick={() => { setAdjustMode(prev => !prev); }}
                            />

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
