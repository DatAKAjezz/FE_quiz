import { FaRegBell, FaRegFolderOpen, FaRegMoon, FaRegUserCircle } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { RiFilePaperLine, RiHome9Line } from 'react-icons/ri';
import { TbCategory, TbLogout2 } from 'react-icons/tb';
import { GoReport } from 'react-icons/go';
import { FiSettings } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GrAchievement } from 'react-icons/gr';
import { LuSunMedium } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isListOpened, setIsListOpened] = useState<boolean>(false);

  const { logout } = useAuth();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const menuRef = useRef<HTMLUListElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem('user') ?? '{}');

  const menuItems = [
    { icon: <RiHome9Line className="text-2xl icon" />, label: 'Trang chủ', path: '/' },
    { icon: <FaRegFolderOpen className="icon text-2xl " />, label: 'Thư viện', path: '/library' },
    { icon: <FaRegBell className="icon text-2xl " />, label: 'Thông báo', path: '/inform' },
    { icon: <RiFilePaperLine className="icon text-2xl " />, label: 'Thẻ ghi nhớ' },
    { icon: <TbCategory className="icon text-2xl " />, label: 'Lời giải chuyên gia' },
    { icon: <GoReport className="icon text-2xl " />, label: 'Báo cáo' },
    { icon: <FiSettings className="icon text-2xl " />, label: 'Cài đặt' },
    { icon: <GrAchievement />, label: 'Thành tựu' },
    { icon: <FiSettings />, label: 'Cài đặt' },
    { icon: <LuSunMedium />, label: 'Sáng' },
    { icon: <FaRegMoon />, label: 'Tối' },
    { icon: <TbLogout2 />, label: 'Đăng xuất' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        userIconRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !userIconRef.current.contains(event.target as Node)
      ) {
        setIsListOpened(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleUserIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsListOpened(prev => !prev);
  };

  const handleMenuItemClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className='flex items-center justify-between absolute top-0 z-10 bg-gray-800 w-full py-3 px-6'>
        <HiMenu
          className="text-4xl cursor-pointer text-white"
          onClick={() => setIsOpened(prev => !prev)}
        />
        {token && (
          <div className="flex relative flex-row items-center cursor-pointer hover:bg-gray-600 rounded-md">
            <div
              className="text-white icon-container"
              ref={userIconRef}
              onClick={handleUserIconClick}
            >
              <FaRegUserCircle className="icon text-4xl" />
            </div>

            {isListOpened && (
              <ul
                ref={menuRef}
                onClick={handleMenuItemClick}
                className='text-white w-fit absolute right-5 top-16 rounded-md overflow-hidden'
                style={{ border: '1px solid white' }}
              >
                <li className='hover:bg-slate-600 bg-slate-800 whitespace-nowrap px-16 py-5 flex items-center align-middle'
                  style={{ borderBottom: '1px solid white' }}>
                  <FaRegUserCircle className="icon text-2xl" />
                  <p className='pl-4'>{user.username}</p>
                </li>

                {menuItems.slice(7, 9).map((item, index) => (
                  <li key={index} className='hover:bg-slate-600 bg-slate-800 whitespace-nowrap px-16 py-3 flex items-center align-middle'>
                    {item.icon}<p className='pl-4'>{item.label}</p>
                  </li>
                ))}

                <li className='hover:bg-slate-600 bg-slate-800 whitespace-nowrap px-16 py-3 flex items-center align-middle'>
                  {menuItems[9].icon}<p className='pl-4'>{menuItems[9].label}</p>
                </li>

                <li
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className='hover:bg-slate-600 bg-slate-800 whitespace-nowrap px-16 py-3 flex items-center align-middle'
                >
                  {menuItems[11].icon}<p className='pl-4'>{menuItems[11].label}</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="relative h-screen box-border">
        <div
          className='font-bold pt-16 absolute text-base flex flex-col justify-between 
                h-full bg-gray-800 text-white overflow-hidden p-4 transition-all duration-150 ease-in'
          style={{ width: isOpened ? '17vw' : '5vw' }}
        >
          <div className="mt-4">
            <ul>
              {menuItems.slice(0, 3).map((item, index) => (
                <li
                  key={index}
                  className="flex w-fit flex-row items-center mb-6 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
                >
                  <div className="icon-container">{item.icon}</div>
                  <p
                    style={{ whiteSpace: 'nowrap' }}
                    className={`ml-4 w-fit transition-all duration-300 ${isOpened ? 'inline-block' : 'hidden'}`}
                  >
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
            <hr className='my-4' />
            <ul>
              {menuItems.slice(3, 5).map((item, index) => (
                <li
                  key={index}
                  className="flex w-fit flex-row items-center mb-6 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
                >
                  <div className="icon-container">{item.icon}</div>
                  <p
                    style={{ whiteSpace: 'nowrap' }}
                    className={`ml-4 w-fit transition-all duration-300 ${isOpened ? 'inline-block' : 'hidden'}`}
                  >
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <ul>
              {menuItems.slice(5, 7).map((item, index) => (
                <li
                  key={index}
                  className="flex w-fit flex-row items-center mb-6 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
                >
                  <div className="icon-container">{item.icon}</div>
                  <p
                    style={{ whiteSpace: 'nowrap' }}
                    className={`ml-4 w-fit transition-all duration-300 ${isOpened ? 'inline-block' : 'hidden'}`}
                  >
                    {item.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;