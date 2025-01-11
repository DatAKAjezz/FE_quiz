import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchLibraryData } from '../../services/API.ts'
import { LibraryNav } from '../../components/LibraryNav.tsx';
import { CiIndent } from 'react-icons/ci';

export const Library = () => {

  const [history, setHistory] = useState<any[]>([]);


  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert('Bạn cần đăng nhập để tới thư viện!')
      navigate('/login');
      return;
    }


    fetchLibraryData(token)
      .then(response => {
        if (response.data.success) {
          setHistory(response.data.data);
          console.log("History: ", response.data.data);
        }
      })
      .catch(error => {
        alert('Có lỗi xảy ra: ' + error.message);
        localStorage.removeItem('token');
        navigate('/login');
      })

  }, [token])

  // const options = ['Gần đây', 'Đã tạo', 'Yêu thích'];

  return (
    <div className="w-full h-full bg-slate-800 text-white px-5">
      <LibraryNav />
      {/*MARK: history  
      */}
      <div className='w-full h-fit mt-10'>
        <h3 className='w-fit ml-12 font-bold px-4' style={{ borderBottom: '3px solid rgb(63, 70, 213)' }}>Lịch sử</h3>
        <div>
          {
            history.length > 0 ?
              <ul className='w-full flex justify-evenly mt-8 cursor-pointer'>
                {
                  history.map((item, index) => (
                    <li key={index} className=' hover:-translate-x-1 hover:-translate-y-1 w-1/4 px-2 rounded-md hover:shadow-lx
                                               bg-slate-700 min-h-48 transition-all duration-150 ease-in-out 
                                               active:translate-x-0 active:translate-y-0 relative' >
                      <p className='font-bold pt-3 pl-4'>{item.title}</p>
                      {/* <CiIndent className='absolute translate-x-36 translate-y-12 text-2xl' /> */}
                    </li>
                  ))
                }
              </ul>
              :
              <p className='px-5 pt-10'>Học gì đó đê. Quá là trống vắng... </p>
          }
        </div>
      </div>

    </div>
  );
}