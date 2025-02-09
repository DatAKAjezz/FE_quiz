import { useEffect, useRef, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { LiaFolderMinusSolid } from 'react-icons/lia';
import { LuListChecks } from 'react-icons/lu';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { PiCardsDuotone } from 'react-icons/pi';
import { RiArrowDropDownLine, RiHome9Line } from 'react-icons/ri';
import { TbBrandCodepen } from 'react-icons/tb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchAllQuestionsAndAnswers, updateLearnedCard } from '../../services/API';
import '../../index.css'
import { FaHeart } from 'react-icons/fa';
import { ImWondering2 } from 'react-icons/im';
import { GrFormCheckmark, GrFormClose } from 'react-icons/gr';
import { Switch } from '@mui/material';
import { IoMdCloudDone } from 'react-icons/io';

export const FlashCard = () => {

    let location = useLocation();
    const segments = location.pathname.split('/');
    const type = segments[segments.length - 1];
    const setId = segments[segments.length - 2];

    useEffect(() => {
        console.log("Location: ", location);
    }, [location])

    const params = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [isDropped, setIsDropped] = useState<boolean>(false);
    const [questions, setQuestions] = useState<any>([]);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const [learned, setLearned] = useState<number>(0);
    const [unlearned, setUnlearned] = useState<number>(0);

    const [progressMode, setProgressMode] = useState<boolean>(false);

    const refCard: any = useRef();

    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

    const handleDroppingIn = async (_class: string) => {
        refCard.current.classList.add(_class);
        await delay(300);
        refCard.current.classList.remove(_class);
    }

    useEffect(() => {
        setIsFlipped(false)
    }, [currentQuestion])

    useEffect(() => { setCurrentQuestion(0) }, [location])

    const arr = [
        {
            name: 'Thẻ ghi nhớ',
            el: <LiaFolderMinusSolid />,
        },
        {
            name: 'Học',
            el: <TbBrandCodepen />,
        },
        {
            name: 'Kiểm tra',
            el: <LuListChecks />,
        },
        {
            name: 'Ghép thẻ',
            el: <PiCardsDuotone />,
        },
    ];

    const dropLeft = (e: any) => {
        e.stopPropagation();
        if (currentQuestion > 0) setCurrentQuestion(prev => prev - 1);
        handleDroppingIn('drop-in-left')
    }

    const dropRight = (e: any) => {

        e.stopPropagation();
        if (currentQuestion < questions.length - 1) setCurrentQuestion(prev => prev + 1);
        handleDroppingIn('drop-in-right')
    }

    const incLearned = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentQuestion < questions.length - 1) setCurrentQuestion(prev => prev + 1); else return;
        setLearned(prev => prev + 1);
        handleDroppingIn('drop-in-right')
    }

    const decLearned = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (currentQuestion < questions.length - 1) setCurrentQuestion(prev => prev + 1); else return;
        setUnlearned(prev => prev + 1);
        handleDroppingIn('drop-in-left')
    }

    const goBack = (e: any) => {
        
    }

    const [isCardUpdated, setIsCardUpdated] = useState<boolean>(false);

    useEffect(() => {
        if (setId) {
            fetchAllQuestionsAndAnswers(setId)
                .then((response) => {
                    if (response.success) {
                        setQuestions(response.data);
                        console.log(response.data);
                    } else {
                        console.error('Error:', response.message || 'Unknown error');
                    }
                })
                .catch((err) => {
                    console.error('Error fetching questions:', err.message || err);
                });
        }
    }, [type]);

    useEffect(() => {
        updateLearnedCard(questions[currentQuestion]?.id)
            .then(response => {
                setTimeout(() => {
                    setIsCardUpdated(true);
                }, 1000 + Math.random() * 100)
                setIsCardUpdated(false);
            })
            .catch(err => {
                console.log("Error updating card: ", err);
            })
    }, [currentQuestion])

    useEffect(() => { console.log('Questions: ', questions) }, [questions])

    return (
        <div className='relative w-screen h-screen pt-10'>
            <div className='flex justify-between px-10 w-full'>
                <div className='text-white flex justify-start w-1/3'>
                    <div className='select-none justify-evenly min-w-56 flex items-center gap-3 w-fit bg-purple-800 rounded-md cursor-pointer
                                relative px-5 py-5 ml-5'
                        onClick={() => { setIsDropped(prev => !prev) }}
                    >
                        <div className='text-3xl'>{arr[Number(params.type) - 1].el}</div>
                        <p className='text-xl font-bold'>{arr[Number(params.type) - 1].name}</p>
                        <RiArrowDropDownLine className='text-2xl' />

                        {
                            isDropped &&
                            <table className='w-fit absolute top-full mt-5 rounded-md bg-slate-700'>
                                <tbody style={{ borderWidth: '2px', borderColor: 'white' }}>
                                    {arr.map((item, index) => (
                                        <tr onClick={() => { navigate(`/flashsets/${params.flashId}/${index + 1}`) }}
                                            key={index} className='hover:bg-slate-400'>
                                            <td className='px-3 text-   2xl py-3'>{item.el}</td>
                                            <td className='px-5'>{item.name}</td>
                                        </tr>
                                    ))}

                                    <tr className='gap-0 w-full'>
                                        <td></td>
                                        <td><hr /></td>
                                    </tr>

                                    <tr onClick={() => { navigate('/') }} className='hover:bg-slate-400'>
                                        <td className='px-3 text-2xl py-3'><RiHome9Line /></td>
                                        <td className='px-5'>Trang chủ</td>
                                    </tr>

                                    <tr onClick={() => { navigate('/search') }} className='hover:bg-slate-400'>
                                        <td className='px-3 text-2xl py-3'><IoSearch /></td>
                                        <td className='px-5'>Tìm kiếm</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    </div>
                </div>


                <div className='w-1/3 flex items-center justify-center text-2xl text-white font-bold'>
                    {currentQuestion + 1}/{questions.length}
                </div>


                <div className='w-1/3 justify-end right-10 text-white flex gap-5'>
                    <div className={`${!progressMode ? 'h-0' : 'h-fit'} text-4xl
                        transition-all duration-150 ease-in text-green-600 text-center`}
                        onClick={() => { }}
                    >
                        <FaHeart />
                        <p className='text-3xl'>{learned}</p>
                    </div>
                    <div className={`${!progressMode ? 'h-0' : 'h-fit'} text-4xl 
                        transition-all duration-150 ease-in text-center text-orange-600`}>
                        <ImWondering2 />
                        <p className='text-3xl'>{unlearned}</p>
                    </div>
                </div>
            </div>

            {/*MARK: card
 */}

            <div className='h-full'>
                <div
                    id='card'
                    ref={refCard}
                    onClick={() => { setIsFlipped(prev => !prev) }}
                    className={`text-3xl select-none rounded-md flex items-center mt-10 w-2/3 h-2/3
                             mx-auto cursor-pointer
                            my-auto text-white ${isFlipped ? 'flipped' : ''} transition-all duration-500 ease-in-out`}
                    style={{
                        backgroundImage: 'linear-gradient( 76.3deg,  rgba(44,62,78,1) 12.6%, rgba(69,103,131,1) 82.8% )'
                    }}>

                    {questions.length > 0 &&
                        <p className={`mx-auto transition-all duration-500 ease-in-out ${isFlipped ? 'flipped2' : ''}`}>
                            {isFlipped ? questions[currentQuestion].answers[questions[currentQuestion].correct_answer].answer
                                        : questions[currentQuestion].question}
                        </p>}
                </div>
            </div>

            <div className='text-white flex min-w-[100px] left-1/2 ml-[-50px] items-center text-5xl absolute gap-5 bottom-16'>
                <div className='absolute flex items-center text-sm whitespace-nowrap w-fit right-96 cursor-pointer'>
                    <p>Theo dõi tiến độ</p>
                    <Switch onClick={() => setProgressMode(prev => !prev)} />
                </div>

                {/*MARK: drop left 
                */}

                {
                    progressMode ? <GrFormClose
                        onClick={(e) => {
                            decLearned(e);
                        }}
                        className='bg-red-500 hover:bg-red-600 rounded-md cursor-pointer
                                    ransition-all duration-150 hover:scale-110'
                    />
                        :
                        <MdNavigateBefore onClick={(e: any) => {
                            dropLeft(e);
                        }}
                            className='hover:bg-slate-500 rounded-md bg-slate-700 cursor-pointer'
                        />
                }

                {/*MARK: drop right
                 */}
                {
                    progressMode ?
                        <GrFormCheckmark
                            onClick={(e) => {
                                incLearned(e);
                            }}
                            className='hover:bg-green-600 rounded-md bg-green-500 transition-all duration-150 
                                hover:scale-110 cursor-pointer' />
                        :
                        <MdNavigateNext
                            onClick={(e) => {
                                dropRight(e);
                            }}
                            className='hover:bg-slate-500 rounded-md bg-slate-700 cursor-pointer' />
                }
                {
                    <div className={`absolute text-green-400 font-bold flex items-center text-[16px] 
                    whitespace-nowrap w-fit left-96 cursor-pointer`}>
                        {
                            progressMode && (
                                isCardUpdated ?
                                    <div className='text-[16px] flex'>
                                        <p className='mr-[8px]'>Saved</p><IoMdCloudDone />
                                    </div>
                                    :
                                    <div className='text-[16px] text-blue-500'>
                                        <p>Saving...</p>
                                    </div>
                            )
                        }
                    </div>

                }
            </div>
        </div >
    );
};
