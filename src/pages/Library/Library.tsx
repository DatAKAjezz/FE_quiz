import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { fetchLibraryData } from '../../services/API.ts'
import { LibraryNav } from '../../components/LibraryNav.tsx';
import { ThumbSet } from '../../components/ThumbSet.tsx';
import { NotificationHehe } from '../../components/Notification.tsx';

export const Library = () => {

  const [history, setHistory] = useState<any[]>([]);


  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [notif, setNotif] = useState<{ message: string, success: string }>({ message: '', success: '' });
  // const [renderNotif, setRenderNotif] = useState<number>(0);

  useEffect(() => {
    if (!token) {
      setNotif({ message: 'Bạn cần đăng nhập để tới Library.', success: 'warning' })
      setTimeout(() => {navigate('/login')}, 1100)
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
        setNotif({message: error.message, success:'error'})
        localStorage.removeItem('token');
        setTimeout(() => {navigate('/login')}, 800)
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
              <div className='w-full flex justify-evenly mt-8 cursor-pointer'>
                {
                  history.map((item, _) => (
                    <ThumbSet data = {item} class = 'bg-slate-600 rounded-md w-1/4 min-h-48'/>
                  ))
                }
              </div>
              :
              <p className='px-5 pt-10'>Học gì đó đê. Quá là trống vắng... </p>
          }
        </div>
      </div>
            {notif.message.length != 0  && <NotificationHehe message={notif.message} success={notif.success} />}

    </div>
  );
}