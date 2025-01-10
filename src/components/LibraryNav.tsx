import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export const LibraryNav = () => {

    const location = useLocation();
    const segments = location.pathname.split('/');
    const lastSeg = segments[segments.length - 1];

    const menuItems = [
        {
            id: 'sets',
            label: 'Học phần',
            path: '/library/sets'
        },
        {
            id: 'solutions',
            label: 'Lời giải chuyên gia',
            path: '/library/solutions'
        },
        {
            id: 'folders',
            label: 'Thư mục',
            path: '/library/folders'
        },
        {
            id: 'classes',
            label: 'Lớp học',
            path: '/library/classes'
        }
    ];
    const navigate = useNavigate();

    return (
        <nav className="my-5 border-b border-gray-500">
            <ul className="flex space-x-6 px-4 py-2 text-[15px] font-semibold">
                {menuItems.map((item, index) => (
                    <li key={item.id}
                    >

                        <a  onClick={() => {navigate(item.path)}}
                            className={`cursor-pointer hover:text-purple-400 ${item.id === lastSeg ? 'text-white' : 'text-gray-400'
                                }`}
                        >
                            {item.label}
                        </a>
                        {item.id === lastSeg && (
                            <div className="h-[2px] w-full bg-purple-400"></div>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    )
}
