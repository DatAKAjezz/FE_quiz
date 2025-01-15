import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchChangeUserIntroduction, fetchUserContributions, fetchUserData } from '../services/API';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { LuMapPin, LuPenLine } from 'react-icons/lu';
import { MdOutlineCancel, MdOutlineEmail } from 'react-icons/md';
import { IoShareSocialOutline } from 'react-icons/io5';
import { RiImageAddLine } from 'react-icons/ri';
import axios from 'axios';
import { NotificationHehe } from '../components/Notification';
import { TbPencilMinus } from 'react-icons/tb';

export const Dashboard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [contributions, setContributions] = useState<any[]>([]);
    const [adjustMode, setAdjustMode] = useState<boolean>(false);
    const refInputIntro = useRef<HTMLTextAreaElement>(null);
    const [introMessage, setIntroMessage] = useState<string>('');

    const [notif, setNotif] = useState<{ message: string, success: string }>({ message: '', success: '' });
    const [renderNotif, setRenderNotif] = useState<number>(0);
    const [adjustProfileMode, setAdjustProfileMode] = useState<boolean>(false);

    useEffect(() => { setRenderNotif(prev => prev + 1) }, [notif])

    const fetchUser = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setNotif({ message: 'Bạn cần đăng nhập để tới Dashboard.', success: 'warning' })
            setTimeout(() => {
                navigate('/login');
            }, 800)
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
                setNotif({ message: error.message, success: 'error' })
                localStorage.removeItem('token');
                setTimeout(() => {
                    navigate('/login');
                }, 800)
            });
    }

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (user != null) {
            console.log('User ID: ', user.user_id);
            fetchUserContributions(user.user_id)
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
            const x = await fetchChangeUserIntroduction(user?.user_id, introMessage);
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

    const handleUpload = async () => {
        if (!image || !user) {
            setNotif({ message: 'No image provided', success: 'warning' })
            return;
        };
        console.log(user);
        const formData = new FormData();
        formData.append('image', image);
        formData.append('userId', user.user_id);

        try {
            const response = await axios.post('http://localhost:3001/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            setNotif({ message: response.data.message, success: 'success' })
            fetchImage();

        }
        catch (err) { console.log('Error at uploading image: ', err) };

    }
    const [imagePath, setImagePath] = useState<string>('');

    const fetchImage = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/images/${user?.user_id}`);
            const fetchedImages = res.data.data;
            setImages(fetchedImages);

            if (fetchedImages && fetchedImages.length > 0) {
                localStorage.setItem('image_path', fetchedImages[0].image_path);
                setImagePath(fetchedImages[0].image_path);
            }
            console.log('Image fetched successfully: ', fetchedImages);
        } catch (err) {
            console.log('Error fetching images: ', err);
            setImagePath('./default_avt.jpg');
        }

    };

    useEffect(() => {
        if (user?.user_id) {
            fetchImage();
        }
    }, [user]);

    // MARK: return
    return (
        <div className='w-full h-full rounded-sm bg-slate-800 pt-16'>
            {
                user &&
                <div className='w-11/12 mx-auto flex flex-wrap shadow-xl bg-slate-700 rounded-md py-5'
                    style={{ backgroundColor: 'rgb(38, 48, 77)' }}
                >
                    <div className='w-3/12'>

                        <div className='w-9/12 px-5 py-3 rounded-md mx-auto flex items-center flex-col relative'
                            style={{ backgroundColor: 'rgb(38, 48, 77)' }}>
                            {!adjustProfileMode ? <TbPencilMinus className='absolute right-0 text-[20px] cursor-pointer text-gray-300'
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setAdjustProfileMode(prev => !prev)
                                }} />
                                : <MdOutlineCancel className='absolute right-0 text-[24px] cursor-pointer text-red-700'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setAdjustProfileMode(prev => !prev)
                                    }} />}
                            <div className='relative rounded-full w-full mx-auto group'>

                                <img
                                    src={`http://localhost:3001${imagePath}` || './default_avt.jpg'}
                                    className="rounded-full bg-center aspect-square w-full mx-auto transition-opacity duration-300 
                                               group-hover:opacity-50"
                                />
                                <RiImageAddLine
                                    className="absolute text-white text-3xl opacity-0 transition-all duration-300 
                                               group-hover:opacity-100 group-hover:scale-110"
                                    style={{ top: "80%", left: "50%", transform: "translate(-50%, -50%)" }}
                                    title="upload image"
                                />

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute rounded-full opacity-0 w-full h-1/2 bottom-0 left-0 cursor-pointer"
                                />
                            </div>
                            {adjustProfileMode && <button className='bg-slate-700 border-black border-2 rounded-md mt-2 px-2'
                                onClick={handleUpload}>Upload</button>}

                            <p className='font-bold text-center mt-3' style={{ fontSize: '20px' }}>{user.firstname} {user.lastname}</p>
                        </div>

                        <div className='ml-10 m-6 text-sm'>
                            <div className='flex items-center w-fit gap-3'>
                                <LuMapPin id='address' /><label htmlFor='address' className=''>{user.address}</label>
                            </div>
                            <div className='mt-[6px] flex items-center w-fit gap-3'>
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

            {notif.message.length != 0 && renderNotif > 0 && <NotificationHehe key={renderNotif} message={notif.message} success={notif.success} />}

        </div>
    )
}
