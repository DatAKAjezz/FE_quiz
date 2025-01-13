import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export const LayoutWithHeader = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
    return (
      <div className="flex flex-col md:flex-row">
        <Header onDrawerChange={setIsDrawerOpen} />
        <div 
          className="text-white bg-slate-800 min-h-screen transition-all duration-150 ease-in"
          style={{
            marginLeft: isDrawerOpen ? '17vw' : '5vw',
            width: isDrawerOpen ? 'calc(100% - 17vw)' : 'calc(100% - 5vw)',
            paddingTop: '5rem'
          }}
        >
          <Outlet />
        </div>
      </div>
    );
  };
  