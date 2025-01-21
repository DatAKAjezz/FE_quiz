import * as React from 'react'
import { FaRegShareSquare } from 'react-icons/fa';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { IoIosMore } from 'react-icons/io';
import { LuCircleGauge } from 'react-icons/lu';
import { MdOutlineBookmarkAdd, MdOutlineBookmarkAdded } from 'react-icons/md';
import { PiCardsBold } from 'react-icons/pi';
import { RiFinderLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom'

export const FlashMenu = () => {

    const location = useLocation();
    const { data } = location.state || {};

    React.useEffect(() => { console.log("Data: ", data) }, [data])

    const [isAdded, setIsAdded] = React.useState<boolean>(false);

    const iconClass = "";

    const [headIconList, setHeadIconList] = React.useState([
        {
            item: <MdOutlineBookmarkAdd />,
        },
        {
            item: <FaRegShareSquare />
        },
        {
            item: <IoIosMore />
        }
    ])

    const typeList = [
        { item: <PiCardsBold />, title: "FlashCard" },
        { item: <LuCircleGauge />, title: "Learning" },
        { item: <HiOutlineClipboardDocumentList />, title: "Test"},
        { item: <RiFinderLine />, title: "Card matching" }]

    return (
        <div className='mt-10 ml-20 w-8/12  round-md bg-slate-700/12'>

            <div className='items-center flex justify-between px-2'>
                <h1 className='text-4xl w-4/6 font-bold'>{data.title}</h1>
                <ul className='w-fit text-3xl flex items-center gap-3 px-3'>
                    {headIconList.map((item, index) =>
                    (
                        <li className='cursor-pointer hover:bg-slate-700 transition-all duration-100 ease-in text-3xl px-2 py-1 border-gray-600 rounded-md border-[3px]'>{item.item}</li>
                    ))
                    }
                </ul>
            </div>

            <ul className='w-full flex justify-evenly mt-32'>
                {typeList.map((item, _) =>
                    <li className='select-none cursor-pointer w-1/5 flex flex-col items-center py-2 text-4xl aspect-video bg-slate-600 
                                    rounded-lg transition-all duration-100 ease-in hover:scale-[105%] hover:shadow-md hover:shadow-cyan-500
                                    drop-shadow-sm'>
                        {item.item}
                        <p className='text-[16px]'>{item.title}</p>   
                    </li>
                )}
            </ul>

            <div className='flex w-fit items-center mt-32'>
                <img className='w-24 mx-6 rounded-full' src = {`http://localhost:3001${data.image_path}`}/>
                <p>Created by  <br/> <span className='text-cyan-500 font-bold'>{data.username}</span></p> 
            </div>

        </div>
    )
}
