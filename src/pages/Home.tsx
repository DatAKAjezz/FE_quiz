import React, { useEffect } from 'react'

export const Home = () => {
 
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '')

  useEffect(() => {console.log(user)}, [user])

  return (
    <div>
      {token ? 
      <>
        This is {user.username} Home
      </> 

        : 

      <>
        This is Home
      </>}
    </div>
  )
}
