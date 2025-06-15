import React, { useState, useEffect } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useAuth } from '../context/AuthContext';
import { Backdrop } from '@mui/material';
import { useData } from '../context/DataContext';
import { useOutlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { chapterData, allChaptersData, switchChapter } = useData();
  const { isAuthenticated } = useAuth();
  const currentOutlet = useOutlet();
  const [backDropOpen, setBackDropOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (!chapterData && allChaptersData && allChaptersData.length > 1) {
        setBackDropOpen(true);
      }
    }
  }, [chapterData, allChaptersData, isAuthenticated]);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark h-screen flex">
      
      {/* === Fixed Sidebar === */}
      <div className="w-64 h-full fixed left-0 top-0 bg-gray-800 z-20">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* === Content Area === */}
      <div className="flex-1 ml-64 flex flex-col overflow-y-auto">
        
        {/* === Backdrop for chapter selection === */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
          open={backDropOpen}
          onClick={() => {}}
        >
          <div className="w-64 bg-white dark:bg-boxdark">
            <div className="flex items-center justify-between px-4 py-4 border-b border-stroke dark:border-strokedark">
              <h1 className="text-lg font-bold text-black dark:text-white">Chapters</h1>
            </div>
            <div className="p-4">
              {allChaptersData?.map((chapter) => (
                <button
                  key={chapter.chapterId}
                  onClick={() => {
                    switchChapter(chapter.chapterId);
                    setBackDropOpen(false);
                  }}
                  className="block text-black dark:text-white w-full p-2 py-5 my-2 rounded-md bg-gray-300 dark:bg-boxdark dark:hover:bg-gray-800"
                >
                  {chapter.chapterName} - {chapter.organisationName}
                </button>
              ))}
            </div>
          </div>
        </Backdrop>

        {/* === Header === */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* === Main Content === */}
        <main className="p-4 md:p-6 2xl:p-10">
          {currentOutlet}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
