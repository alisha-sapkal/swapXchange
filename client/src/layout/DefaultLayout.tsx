import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';
import { useAuth } from '../context/AuthContext';
import { Backdrop } from '@mui/material';
import { useData } from '../context/DataContext';
import { useOutlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* choose chapter */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropOpen}
        onClick={() => {}}
      >
        {/* choose chapter using cards */}
        <div className="w-64 bg-white dark:bg-boxdark">
          <div className="flex items-center justify-between px-4 py-4 border-b border-stroke dark:border-strokedark">
            <h1 className="text-lg font-bold text-black">Chapters</h1>
          </div>
          <div className="p-4">
            {allChaptersData?.map((chapter) => (
              <button
                key={chapter.chapterId}
                onClick={() => {
                  switchChapter(chapter.chapterId);
                  setBackDropOpen(false);
                }}
                className="block text-black w-full p-2 py-5 my-2 rounded-md bg-gray-300 dark:bg-boxdark dark:hover:bg-gray-800"
              >
                {chapter.chapterName} - {chapter.organisationName}
              </button>
            ))}
          </div>
        </div>
      </Backdrop>

      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {isAuthenticated && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {currentOutlet}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
