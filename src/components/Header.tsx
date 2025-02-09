import { FaRegFolderOpen, FaRegMoon } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { RiFilePaperLine, RiHome9Line } from 'react-icons/ri';
import { TbCategory, TbLogout2 } from 'react-icons/tb';
import { GoReport } from 'react-icons/go';
import { FiSettings } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GrAchievement, GrAdd } from 'react-icons/gr';
import { LuSunMedium } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { IoMdNotifications } from 'react-icons/io';
import { PiCardsBold } from 'react-icons/pi';
import { MdOutlineQuiz } from 'react-icons/md';

interface MenuItem {
  icon: JSX.Element;
  label: string;
  path?: string;
  onClick?: () => void;
}

const Header = ({ onDrawerChange }: { onDrawerChange: (isOpen: boolean) => void }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isListOpened, setIsListOpened] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLUListElement>(null);
  const userIconRef = useRef<HTMLDivElement>(null);
  const user = JSON.parse(localStorage.getItem('user') ?? '{}')[0];
  const token = localStorage.getItem('token');

  // const [logOut, setLogOut] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    { icon: <RiHome9Line className="text-2xl icon" />, label: 'Trang chủ', path: '/' },
    { icon: <FaRegFolderOpen className="text-2xl icon" />, label: 'Thư viện', path: '/library/sets' },
    { icon: <RiFilePaperLine className="text-2xl icon" />, label: 'Thẻ ghi nhớ' },
    { icon: <TbCategory className="text-2xl icon" />, label: 'Lời giải chuyên gia' },
    { icon: <GoReport className="text-2xl icon" />, label: 'Báo cáo' },
    { icon: <FiSettings className="text-2xl icon" />, label: 'Cài đặt' },
    { icon: <GrAchievement />, label: 'Thành tựu' },
    { icon: <FiSettings />, label: 'Cài đặt' },
    { icon: <LuSunMedium />, label: 'Sáng' },
    { icon: <FaRegMoon />, label: 'Tối' },
    {
      icon: <TbLogout2 />,
      label: 'Đăng xuất',
      onClick: () => {
        logout();
        // setLogOut(true);
        setTimeout(() => { navigate('/login'); }, 500)
      }
    }
  ];

  useEffect(() => {
    onDrawerChange(isOpened);
  }, [isOpened]);

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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderMenuItem = (item: MenuItem, index: number) => (
    <li
      key={index}
      onClick={() => {
        item.onClick?.() || (item.path && navigate(item.path));
      }}
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
  );

  const renderUserDropdown = () => (
    <ul
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className="text-white w-fit absolute z-20 right-5 top-16 rounded-md overflow-hidden"
      style={{ border: '1px solid white' }}
    >
      <li
        onClick={() => navigate('/dashboard')}
        className="hover:bg-slate-600 bg-slate-800 whitespace-nowrap px-16 py-5 flex items-center"
        style={{ borderBottom: '1px solid white' }}
      >
        <img
          className="w-10 rounded-full h-10 hover:scale-110 transition-all duration-200 ease-in-out"
          src={`http://localhost:3001${imagePath}`}
          alt="avatar"
        />
        <p className="pl-4">{user.username}</p>
      </li>
      {menuItems.slice(6).map((item, index) => (
        <li
          key={index}
          onClick={item.onClick}
          className="hover:bg-slate-600 bg-slate-800 whitespace-nowrap px-16 py-3 flex items-center"
        >
          {item.icon}<p className="pl-4">{item.label}</p>
        </li>
      ))}
    </ul>
  );

  const [imagePath, setImagePath] = useState<string>('');

  useEffect(() => {
    setImagePath(localStorage.getItem('image_path') || '')
    console.log('Image path: ', imagePath);
  }, [
    user
  ])

  const addList = [
    {
      element: <PiCardsBold />,
      title: 'Thẻ ghi nhớ',
      path: ''
    }, {
      element: <MdOutlineQuiz />,
      title: 'Quizz',
      path: ''
    }
  ]

  const [isAddListOpened, setIsAddListOpened] = useState<boolean>(false);

  return (
    <>

      <div className="fixed shadow-lg flex items-center justify-between top-0 z-20 bg-slate-900 w-full py-3 px-5">
        <HiMenu
          className="text-4xl cursor-pointer text-white"
          onClick={() => setIsOpened(prev => !prev)}
        />

        {/* MARK: user
         */}
        {token && (
          <div className="flex relative flex-row items-center cursor-pointer">
            <div className='mr-5 hover:bg-blue-700 relative bg-blue-600 p-3 rounded-md text-2xl text-white'>
              <GrAdd  onClick={() => {setIsAddListOpened(prev => !prev)}}/>
              {
                isAddListOpened && 
                <ul className='bg-blue-800 border-[1px] rounded-sm absolute top-[110%] right-[80%]'>
                  {
                    addList.map((item, index) => (
                      <li className={`flex w-full px-3 items-center py-1 gap-3 ${index > 0 ? 'border-t-[1px]' : ''}
                        transition-all duration-100 ease-in
                      `}>
                        {item.element}<p className='text-[12px] whitespace-nowrap'>{item.title}</p>
                      </li>
                    ))
                  }
                </ul>
              }
            </div>

            <div className="flex w-fit items-center bg-slate-600 px-2 py-1 rounded-md">
              <IoMdNotifications className="w-10 h-10 mr-6" />
              <div
                className="border-solid border-black border-2 text-white icon-container relative w-12 h-12 rounded-full overflow-hidden"
                ref={userIconRef}
                onClick={() => setIsListOpened(prev => !prev)}
              >
                <img
                  className="hover:scale-110 aspect-square w-full transition-all duration-200 ease-in-out"
                  src={`http://localhost:3001${imagePath}`}
                  alt="avatar"
                />
              </div>
            </div>
            {isListOpened && renderUserDropdown()}
          </div>
        )}
      </div>

      {/*MARK: side bar
       */}

      <div className="fixed h-screen box-border">
        <div
          className="font-bold pt-16 absolute text-base flex flex-col justify-between h-full bg-slate-900 text-white overflow-hidden p-4 transition-all duration-150 ease-in"
          style={{ width: isOpened ? '17vw' : '5vw' }}
        >
          <div className="mt-4">
            <ul>{menuItems.slice(0, 2).map(renderMenuItem)}</ul>
            <hr className="my-4" />
            <ul>{menuItems.slice(2, 4).map(renderMenuItem)}</ul>
          </div>
          <div className="mt-4">
            <ul>{menuItems.slice(4, 6).map(renderMenuItem)}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;