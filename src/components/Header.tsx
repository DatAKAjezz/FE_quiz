import { FaRegBell, FaRegFolderOpen } from 'react-icons/fa'
import { HiMenu } from 'react-icons/hi'
import { RiFilePaperLine, RiHome9Line } from 'react-icons/ri'
import '../index.css'
import { TbCategory } from 'react-icons/tb'
import { useState } from 'react'

const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const menuItems = [
    { icon: <RiHome9Line className='text-3xl mr-4' />, label: 'Trang chủ' },
    { icon: <FaRegFolderOpen className='text-3xl mr-4' />, label: 'Thư viện' },
    { icon: <FaRegBell className='text-3xl mr-4' />, label: 'Thông báo' },
    { icon: <RiFilePaperLine className='text-3xl mr-4' />, label: 'Thẻ ghi nhớ' },
    { icon: <TbCategory className='text-3xl mr-4' />, label: 'Lời giải chuyên gia' },
  ];

  return (  
    <div className={`font-bold text-base flex flex-col ${isOpened ? 'w-1/6' : 'w-16'} pr-4 box-content
                     text-white transition-all duration-300 ease-in`}
         style={{backgroundColor: 'rgb(21, 18, 20)', height: '100vh'}}>
      <div className='flex w-fit flex-row items-center align-middle mt-2'>
        <HiMenu className='ml-4 text-4xl cursor-pointer'
                onClick={() => setIsOpened(prev => !prev)} />
      </div>
      <ul>
        {menuItems.slice(0, 3).map((item, index) => (
          <li key={index} className='custom-menu-li'>
            {item.icon}
            <span className={`menu-item-label ${isOpened ? 'open' : ''}`}>{item.label}</span>
          </li>
        ))}
      </ul>
      <hr className='ml-2 w-full mb-4'/>
      <ul>
        {menuItems.slice(3).map((item, index) => (
          <li key={index} className='custom-menu-li'>
            {item.icon} 
            <span className={`menu-item-label ${isOpened ? 'open' : ''}`}>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Header;
