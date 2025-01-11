import { useEffect } from 'react'

export const Home = () => {
 
  const token = localStorage.getItem('token');
  const user1 = JSON.parse(localStorage.getItem('user') ?? '')
  const user = user1[0];

  return (
    <div>
      {
        token ? <>This is {user.username} home</> : <>hello</>
      }
    </div>
  )
}
