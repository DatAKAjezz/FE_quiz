import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Library = () => {

  const [activeOption, setActiveOption] = useState<number>(0);
  const [history, setHistory] = useState([]);

  const menuItems = [
    {
      id: 'hocphan',
      label: 'Học phần',
    },
    {
      id: 'loigiaichuyengia',
      label: 'Lời giải chuyên gia',
    },
    {
      id: 'thumuc',
      label: 'Thư mục',
    },
    {
      id: 'lophoc',
      label: 'Lớp học'
    }
  ];
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert('Bạn cần đăng nhập để tới thư viện!')
      navigate('/login');
      return;
    }

    fetch('http://localhost:3001/library', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error("Unauthorized")
        return response.json()
      })
      .then(data => {
        if (data.success) {
          setHistory(data.data);
          console.log("History: ", history);
        }
      })

  }, [token])

  return (
    <div className="w-full h-full bg-slate-800 text-white px-5">
      <nav className="border-b border-gray-500">
        <ul className="flex space-x-6 px-4 py-2 text-[15px] font-semibold">
          {menuItems.map((item, index) => (
            <li key={item.id}
              onClick={() => { setActiveOption(index) }}
            >

              <a href={`#${item.id}`}
                className={`hover:text-purple-400 ${index == activeOption ? 'text-white' : 'text-gray-400'
                  }`}
              >
                {item.label}
              </a>
              {index == activeOption && (
                <div className="h-[2px] w-full bg-purple-400"></div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/*MARK: history 
      */}
      <div className='w-full h-fit mt-10'>
        <h3 className='w-fit ml-12 font-bold px-4' style={{borderBottom: '3px solid rgb(63, 70, 213)'}}>Lịch sử</h3>
        <div>
          {
            history.length > 0 ?
              <ul className='w-full flex justify-evenly mt-8'>
                {
                  history.map((item, index) => (
                    <li key = {index} className='w-1/4 px-2 rounded-md bg-slate-700 min-h-48' >
                      <p className='font-bold pt-3 pl-4'>{item.title}</p>
                    </li>
                  ))
                }
              </ul>
              :
              <>Học gì đó đê. Quá là trống vắng. </>
          }
        </div>
      </div>

    </div>
  );
}