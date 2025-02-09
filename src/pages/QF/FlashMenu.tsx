import * as React from 'react'
import { FaRegShareSquare } from 'react-icons/fa';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { IoIosMore } from 'react-icons/io';
import { LuCircleGauge } from 'react-icons/lu';
import { MdBookmarkAdded, MdOutlineBookmarkAdd } from 'react-icons/md';
import { PiCardsBold } from 'react-icons/pi';
import { RiFinderLine } from 'react-icons/ri';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { addLikedSet, fetchAllQuestionsAndAnswers, fetchUserInfo } from '../../services/API';
import axios from 'axios';
import { useSnackbar, VariantType } from 'notistack';

export const FlashMenu = () => {


    const headIconList = [
        {
            item: <FaRegShareSquare />,
        },
        {
            item: <IoIosMore />
        }
    ]

    const [creator, setCreator] = React.useState<any>({});
    const [questionList, setQuestionList] = React.useState<any[]>([]);
    const [isLiked, setIsLiked] = React.useState<boolean>(false);

    const location = useLocation();
    const { data } = location.state || {};
    const params = useParams();

    React.useEffect(() => {
        if (data) console.log("Set Data: ", data);
    }, [data])

    const [notif, setNotif] = React.useState<{ success: VariantType, message: string }>()

    const navigate = useNavigate();

    const checkLiked = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/liked/check/${data?.user_id}/${data?.set_id}`);
            setIsLiked(response.data.exists)
            console.log("Exists: ", response.data.exists);
            if (!response.data.exists) {
                setNotif({ success: 'success', message: "Added to liked." })
            }
            else {
                setNotif({ success: 'info', message: "Removed from liked." })
            }
        }
        catch (err) {
            console.log("Error checking liked status: ", err);
        }
    }

    const { enqueueSnackbar } = useSnackbar();

    const onAddSet = async () => {
        try {
            const user: any = JSON.parse(localStorage.getItem('user') || '')[0];
            if (!user) return;

            const response = await addLikedSet(user?.user_id, data?.set_id);

            setIsLiked(response.isLiked);

            enqueueSnackbar(response.isLiked ? "Added to liked." : "Removed from liked.", { variant: response.isLiked ? 'success' : 'info' })

        }
        catch (err) {
            console.error("Error in onAddSet: ", err);
        }
    }
    React.useEffect(() => {
        const fetchLikedStatus = async () => {
            await checkLiked();
        };
        fetchLikedStatus();
    }, []);

    React.useEffect(() => {
        fetchUserInfo(data.created_by)
            .then(response => {
                setCreator(response.data.data);
                console.log("Creator data: ", response.data.data)
            })
            .catch(err => { console.log("Error: ", err) })
    }, [data])

    React.useEffect(() => {
        fetchAllQuestionsAndAnswers(params.flashId || '')
            .then(response => {
                setQuestionList(response.data);
            })
            .catch(err => { console.log("Error: ", err) })
    }, [params])

    const typeList = [
        { item: <PiCardsBold />, title: "FlashCard", name: 'flashcard' },
        { item: <LuCircleGauge />, title: "Learning", name: 'learning' },
        { item: <HiOutlineClipboardDocumentList />, title: "Test", name: 'test' },
        { item: <RiFinderLine />, title: "Card matching", name: 'card-matching' }]
    React.useEffect(() => { console.log("Forward Data: ", data) }, [data])

    return (
        <div className='flex mt-10'>

            <div className='pl-20 w-9/12  round-md bg-slate-700/12'>

                <div className='items-center flex justify-between px-2'>
                    <h1 className='text-4xl w-4/6 font-bold'>{data.title}</h1>
                    <ul className='w-fit text-3xl flex items-center gap-3 px-3'>
                        <li className='cursor-pointer hover:bg-slate-700 transition-all duration-100 ease-in text-3xl px-2 py-1 border-gray-600 rounded-md border-[3px]'
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddSet();
                            }}
                        >
                            {
                                isLiked ? <MdBookmarkAdded className='text-green-400' /> : <MdOutlineBookmarkAdd />
                            }
                        </li>
                        {headIconList.map((item, index) =>
                        (
                            <li key={index}

                                className='cursor-pointer hover:bg-slate-700 transition-all duration-100 ease-in text-3xl px-2 py-1 border-gray-600 rounded-md border-[3px]'
                            >{item.item}</li>

                        ))
                        }
                    </ul>
                </div>

                <ul className='w-full flex justify-evenly mt-32'>
                    {typeList.map((item, index) =>
                        <li key={index}
                            onClick={() => {
                                navigate(`/ learn/${item.name}/${data.set_id}`)
                            }}
                            className='select-none cursor-pointer w-1/5 flex flex-col items-center py-2 text-4xl aspect-video bg-slate-600 
                                        rounded-lg transition-all duration-100 ease-in hover:scale-[105%] hover:shadow-md hover:shadow-cyan-500
                                        drop-shadow-sm'>
                            {item.item}
                            <p className='text-[16px]'>{item.title}</p>
                        </li>
                    )}
                </ul>

                <hr className='px-2 mt-10' />

                <div className='flex w-fit items-center mt-32'>
                    <img className='w-20 mx-4 rounded-full aspect-square ' src={`http://localhost:3001${creator.image_path}`} />
                    <p>Created by  <br /> <span className='text-cyan-500 font-bold'>{creator?.username}</span></p>
                </div>

                <div className='mt-10'>
                    <h1 className='pl-2 font-bold text-[24px]'>Thuật ngữ trong phần này {'('}{questionList.length}{')'}</h1>
                    <ul>
                        {questionList?.map((item, index) => (
                            <li key={index}
                                className='flex flex-row py-4 my-4 bg-slate-600 rounded-md'>
                                <p className='border-gray-900 border-r-2 w-5/12 p-2'>{item?.question}</p>
                                <p className='w-7/12 pl-4 pr-2'>{item?.answers[item?.correct_answer].answer || '?'}</p>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <div className='rounded-md w-3/12 mx-5 box-border bg-gray-900'>
                <h1 className='font-bold pl-5 py-5'>Comments</h1>
                <hr />
            </div>

        </div>
    )
}
