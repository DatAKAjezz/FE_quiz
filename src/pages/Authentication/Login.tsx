import axios from 'axios';
import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiMiniXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar, VariantType } from 'notistack';

export const Login = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    // dat 1

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        console.log(formData);
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                })

            const result = response.data;

            if (result.success) {
                enqueueSnackbar('Dang nhap thanh cong...', { variant: 'success' })
                localStorage.setItem('token', result.token);
                navigate('/dashboard');
            }
            else {
                enqueueSnackbar('Invalid credentials', { variant: 'error' })
            }
        }
        catch (err) {
            console.log('Error: ', err);
        }
    }

    return (
        <div className='overflow-hidden w-11/12 flex mx-auto mt-20  rounded-xl bg-white' style={{ height: '80vh' }}>
            <div className='overflow-hidden w-1/2 bg-cover' style={{ backgroundImage: `URL('/loginbg.jpg')` }}>
                {/* left */}
            </div>

            <div className='w-1/2 relative'>
                <HiMiniXMark
                    onClick={() => { navigate('/') }}
                    className='absolute right-3 top-3 hover:bg-zinc-200 cursor-pointer rounded-md text-3xl' />
                <div className='w-fit flex pl-24 pt-20 pb-16 text-3xl font-bold'>
                    <p className='w-fit bg-sky-700 rounded-md px-5 py-3 text-white cursor-pointer' onClick={() => { navigate('/auth/login') }}>Log in</p>
                    <p className='w-fit ml-5  px-5 py-3 cursor-pointer' onClick={() => { navigate('/auth/signup') }}>Sign up</p>
                </div>
                <form onSubmit={handleSubmit} className='submit-container mx-auto w-9/12 rounded-md flex flex-col h-fit'>
                    <div>
                        <div className='flex flex-wrap'>
                            <label htmlFor='username' className='w-full'>Username </label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className='bg-slate-100 rounded-sm w-full h-10 px-4'
                                placeholder='Enter your username'
                            />
                        </div>
                        <div className='flex flex-wrap pt-5 relative'>
                            <label htmlFor='password' className='w-full'>Password </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className='bg-slate-100 rounded-sm w-full h-10 mb-5 px-4 focus:border-blue-500'
                                placeholder='Enter your password'
                            />
                            {
                                showPassword ? <FaRegEye className='absolute bottom-8 right-7 cursor-pointer'
                                    onClick={() => { setShowPassword(prev => !prev) }} />
                                    : <FaRegEyeSlash className='absolute bottom-8 right-7 cursor-pointer'
                                        onClick={() => { setShowPassword(prev => !prev) }} />
                            }
                        </div>
                    </div>
                    <button className='hover:bg-slate-800 w-1/4 bg-slate-600 text-white px-1 py-2 rounded-md' type='submit'>Đăng nhập</button>
                </form>
            </div>
        </div>
    )
}
