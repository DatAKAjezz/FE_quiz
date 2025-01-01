import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { HiMiniXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [pass2, setPass2] = useState('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePass2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPass2(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== pass2) {
            window.alert('Mật khẩu không khớp');
            return;
        }
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.success) {
                alert('Đăng ký thành công!');
                navigate('/login');
            } else {
                alert(result.message || 'Đăng ký thất bại. Vui lòng thử lại.');
            }
        } catch (err) {
            console.error('Error: ', err);
            alert('Lỗi kết nối đến server. Vui lòng thử lại sau.');
        }
    };

    return (
        <div
            className="overflow-hidden w-11/12 flex mx-auto mt-20 rounded-xl bg-white"
            style={{ height: '80vh' }}
        >
            <div
                className="overflow-hidden w-1/2 bg-cover"
                style={{ backgroundImage: `URL('/loginbg.jpg')` }}
            ></div>
            <div className="w-1/2 relative">
                <HiMiniXMark className='absolute right-3 top-3 hover:bg-zinc-200 cursor-pointer rounded-md text-3xl' />
                <div className="w-fit flex pl-24 pt-20 pb-16 text-3xl font-bold">
                    <p
                        className="w-fit rounded-md px-5 py-3 cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </p>
                    <p
                        className="w-fit bg-sky-700 text-white rounded-md ml-5 px-5 py-3 cursor-pointer"
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="submit-container mx-auto w-9/12 rounded-md flex flex-col h-fit"
                >
                    <div>
                        <div className="flex flex-wrap">
                            <label htmlFor="username" className="w-full">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="bg-slate-100 rounded-sm w-full h-10 px-4"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="flex flex-wrap pt-5 relative">
                            <label htmlFor="password" className="w-full">
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' :  "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="bg-slate-100 rounded-sm w-full h-10 mb-5 px-4 focus:border-blue-500"
                                placeholder="Enter your password"
                            />
                            {
                                showPassword ?      <FaRegEye className='absolute bottom-8 right-7 cursor-pointer'
                                                        onClick={() => {setShowPassword(prev => !prev)}}/> 
                                                :   <FaRegEyeSlash className='absolute bottom-8 right-7 cursor-pointer'
                                                            onClick={() => {setShowPassword(prev => !prev)}}/>
                            }
                        </div>
                        <div className="flex flex-wrap relative">
                            <label htmlFor="confirmPassword" className="w-full">
                                Confirm Password
                            </label>
                            <input
                                type={showPassword2  ? 'text' :  "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={pass2}
                                onChange={handlePass2}
                                required
                                className="bg-slate-100 rounded-sm w-full h-10 mb-5 px-4 focus:border-blue-500"
                                placeholder="Confirm your password"
                            />
                            {
                                showPassword2 ?      <FaRegEye className='absolute bottom-8 right-7 cursor-pointer'
                                                    onClick={() => {setShowPassword2(prev => !prev)}}/> 
                                                :   <FaRegEyeSlash className='absolute bottom-8 right-7 cursor-pointer'
                                                        onClick={() => {setShowPassword2(prev => !prev)}}/>
                            }                           
                        </div>
                    </div>
                    <button
                        className="hover:bg-slate-800 w-1/4 bg-slate-600 text-white px-1 py-2 rounded-md"
                        type="submit"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
};
