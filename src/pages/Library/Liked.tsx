import { useEffect, useState } from 'react'
import { LibraryNav } from '../../components/LibraryNav'
import { fetchWithCustomQuery } from '../../services/API'
import { ThumbSet } from '../../components/ThumbSet';
import { useNavigate } from 'react-router-dom';

export const Liked = () => {
  const [set, setSet] = useState<any[]>([]);
  const user = JSON.parse(localStorage.getItem('user') || '')[0];
  useEffect(() => {
    if (!user) return;
    fetchWithCustomQuery(`SELECT * FROM liked_sets ls
                          JOIN users u ON ls.user_id = u.id
                          where user_id = ${user.user_id}`)
      .then(response => {
        setSet(response.data)
        console.log("Liked set: ", response.data);
      })
      .catch(err => {
        console.log("Error: ", err);
      })
  }, [])

  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-slate-800 text-white px-5">
      <LibraryNav />
      <div className='flex mt-10 ml-12'>
        {
          set.map((item, index) => (
            <ThumbSet click={() => { navigate(`/flashsets/${item.id}/menu`, { state: { data: item } }) }}
              data={item} class='bg-slate-600 relative rounded-md mx-4 w-1/4 min-h-48' />
          ))
        }
      </div>
    </div>
  )
}
