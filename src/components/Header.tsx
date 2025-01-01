import { FaRegBell, FaRegFolderOpen, FaRegMoon, FaRegUserCircle } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { RiFilePaperLine, RiHome9Line } from 'react-icons/ri';
import { TbCategory, TbLogout2 } from 'react-icons/tb';
import { GoReport } from 'react-icons/go';
import { FiSettings } from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GrAchievement } from 'react-icons/gr';
import { LuSunMedium } from 'react-icons/lu';

const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isListOpened, setIsListOpened] = useState<boolean>(false);

  const { isAuthenticated, logout } = useAuth();

  

  const menuItems = [
    { icon: <RiHome9Line className="text-2xl icon" />, label: 'Trang chủ' },
    { icon: <FaRegFolderOpen className="icon text-2xl " />, label: 'Thư viện' },
    { icon: <FaRegBell className="icon text-2xl " />, label: 'Thông báo' },
    { icon: <RiFilePaperLine className="icon text-2xl " />, label: 'Thẻ ghi nhớ' },
    { icon: <TbCategory className="icon text-2xl " />, label: 'Lời giải chuyên gia' },
    { icon: <GoReport className="icon text-2xl " />, label: 'Báo cáo' },
    { icon: <FiSettings className="icon text-2xl " />, label: 'Cài đặt' },
    { icon: <GrAchievement />, label: 'Thành tựu'},
    { icon: <FiSettings/> , label: 'Cài đặt'},
    { icon: <LuSunMedium />, label: 'Sáng'},
    { icon: <FaRegMoon />, label: 'Tối'},
    { icon: <TbLogout2 />, label: 'Đăng xuất'}
  ];

  return (
    <div className="relative h-screen">
      <div
        className='font-bold absolute text-base flex flex-col justify-between 
                   w-fit h-full bg-gray-800 text-white p-4 transition-all duration-300 ease-in'
          >
        <div className="flex justify-between items-center">
          <HiMenu
            className="text-4xl cursor-pointer"
            onClick={() => setIsOpened((prev) => !prev)}
          />
        </div>

        <div className="mt-4">
          <ul>
            {menuItems.slice(0, 5).map((item, index) => (
              <li
                key={index}
                className="flex w-fit flex-row items-center mb-6 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
              >
                <div className="icon-container">{item.icon}</div>
                <p
                  style={{whiteSpace: 'nowrap'}}
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
                  style={{whiteSpace: 'nowrap'}}
                  className={`ml-4 w-fit transition-all duration-300 ${isOpened ? 'inline-block' : 'hidden'}`}
                >
                  {item.label}
                </p>
              </li>
            ))}

            { isAuthenticated &&  <li onClick={() => {setIsListOpened(prev => !prev)}} 
                        className="flex w-fit relative flex-row items-center mb-6 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
                        ><FaRegUserCircle className="icon text-2xl"/> <p></p> 
                        {
                          isListOpened && 
                          <ul className='w-fit absolute left-16 bottom-1 rounded-md overflow-hidden'
                              style={{border: '1px solid white'}}>

                              <li className=' bg-slate-800 whitespace-nowrap px-16 py-5 flex items-center align-middle
                                  '
                                  style={{borderBottom: '1px solid white'}}>
                                  <FaRegUserCircle className="icon text-2xl"/> <p className='pl-4'>Cá nhân</p>
                              </li>

                              {menuItems.slice(7, 9).map((item, index) => (
                                <li className='bg-slate-800 whitespace-nowrap px-16 py-3 flex items-center align-middle
                                    '>
                                    {item.icon}<p className='pl-4'>{item.label}</p>
                                </li>
                              ))}

                              <li className='bg-slate-800 whitespace-nowrap px-16 py-3 flex items-center align-middle
                                  '>
                                  {menuItems[11].icon}<p className='pl-4'>{menuItems[11].label}</p>
                              </li>

                              <li className='bg-slate-800 whitespace-nowrap px-16 py-3 flex items-center align-middle
                                  '>
                                  {menuItems[9].icon}<p className='pl-4'>{menuItems[9].label}</p>
                              </li>

                          </ul>
                        }
                </li>}

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
