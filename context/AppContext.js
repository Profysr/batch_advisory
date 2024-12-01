"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";

// Create the context
const AppContext = createContext();

// Create the context provider
export const AppProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const togglePopup = useCallback(() => setShowPopup((prev) => !prev), []);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDivClick = () => {
    document.getElementById("fileInput").click();
  };

  const [dbData, setdbData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("dbData");
      return savedData
        ? JSON.parse(savedData)
        : {
            students: [],
            advisors: [],
            admins: [],
            classes: [],
            courses: [],
            schemeOfStudy: [],
            results: [],
          };
    }
    return {
      students: [],
      advisors: [],
      admins: [],
      classes: [],
      courses: [],
      schemeOfStudy: [],
      results: [],
    };
  });

  // Debounced save to localStorage
  const saveToLocalStorage = debounce((data) => {
    localStorage.setItem("dbData", JSON.stringify(data));
  }, 1000);

  useEffect(() => {
    saveToLocalStorage(dbData);
  }, [dbData]);

  return (
    <AppContext.Provider
      value={{
        showPopup,
        setShowPopup,
        togglePopup,

        isLoading,
        setIsLoading,
        isDragging,
        setIsDragging,
        handleDragOver,
        handleDragLeave,
        handleDivClick,
        dbData,
        setdbData,
        isSidebarOpen,
        setSidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppContext = () => useContext(AppContext);
