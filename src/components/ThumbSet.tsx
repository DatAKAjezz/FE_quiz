import { useEffect, useState } from "react";
import { fetchUserInfo } from "../services/API";

export const ThumbSet = (props: { click: any, data: any, class: any }) => {

  const [user, setUser] = useState<any>({});

  useEffect(() => {
    fetchUserInfo(props.data.created_by)
      .then(response => {
        if (response.data.success) {
          setUser(response.data.data);
        }
      })
      .catch(err => console.log('Error: ', err));
  }, [])

  return (
    <div className={`transition-all duration-150 ease-in hover:scale-[103%] hover:shadow-md hover:shadow-emerald-500 ${props.class}`} 
         onClick={props.click}>

      <div className="w-fit pl-2 pt-2">
        <p className="px-1">{props.data.title}</p>
        <div className="bg-cyan-500 rounded-md h-1"></div>
      </div>

      <div className="bg-slate-700 px-2 py-1 ml-2 mt-2 font-bold w-fit rounded-md text-[12px]">
        <p>Số lượng câu: {props.data.cardCount}</p>
      </div>

      <div className=" absolute bottom-4  h-fit left-4 flex w-fit items-center gap-3 font-bold">
        <img className="w-10 aspect-square rounded-full" src={`http://localhost:3001${user?.image_path}`} />
        <p className="text-[12px]">{user?.firstname}&nbsp;{user?.lastname}</p>
      </div>

    </div>
  )
}
