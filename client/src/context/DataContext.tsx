// context/DataContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Chapter } from '../models/Chapter';
import { Member } from '../models/Member';
import { axiosInstance } from '../utils/config';
import { useAuth } from './AuthContext';

// Define the structure of our context's value
interface DataContextProps {
  memberData: Member | null;
  chapterData: Chapter | null;
  allChaptersData: Chapter[] | null;
  getChapterDetails: (chapterId: string) => Promise<void>;
  switchChapter: (chapterId: string) => void;
}

// Create the context with an initial default value
const DataContext = createContext<DataContextProps | undefined>(undefined);

// Provider component to wrap around the app or component subtree
export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [memberData, setMemberData] = useState<Member | null>(null);
  const [allChaptersData, setAllChaptersData] = useState<Chapter[] | null>(
    null,
  );
  const [chapterData, setChapterData] = useState<Chapter | null>(null);

  const fetchAllChapters = async () => {
    try {
      const response = await axiosInstance('/api/chapter');
      const data = await response.data;
      if (data.length === 1) {
        setChapterData(data[0]);
      }
      setAllChaptersData(data);
    } catch (error) {
      console.error('Fetching all chapters failed:', error);
    }
  };

  const switchChapter = (chapterId: string) => {
    const chapter = allChaptersData?.find((c) => c.chapterId === chapterId);
    setChapterData(chapter || null);
  }

  // Function to fetch chapter details
  const getChapterDetails = async (chapterId: string) => {
    try {
      const response = await axiosInstance(`/api/chapter/${chapterId}`);
      const data = await response.data;
      setChapterData(data);
    } catch (error) {
      console.error('Fetching chapter details failed:', error);
    }
  };

  // Fetch member details
  const fetchMember = async () => {
    try {
      const response = await axiosInstance('/api/member/me');
      const data = await response.data;
      setMemberData(data);
    } catch (error) {
      console.error('Fetching member details failed:', error);
    }
  };

  console.log({ chapterData });

  

  useEffect(() => {
    console.log('I am called');

    if (isAuthenticated) {
      if (!memberData) fetchMember();
      if (!allChaptersData) fetchAllChapters();
    } else {
      setMemberData(null);
      setAllChaptersData(null);
      setChapterData(null);
    }
  }, [isAuthenticated]);

  return (
    <DataContext.Provider
      value={{ memberData, chapterData, allChaptersData, switchChapter, getChapterDetails }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Hook to access the DataContext
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
