"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); //  header

  const [isLoading, setIsLoading] = useState(false); // popup
  const [isDragging, setIsDragging] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]); // table

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

  // const [dbData, setdbData] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     const savedData = localStorage.getItem("dbData");
  //     return savedData
  //       ? JSON.parse(savedData)
  //       : {
  //           students: [],
  //           advisors: [],
  //           admins: [],
  //           classes: [],
  //           courses: [],
  //           schemeOfStudy: [],
  //           results: [],
  //         };
  //   }
  //   return {
  //     students: [],
  //     advisors: [],
  //     admins: [],
  //     classes: [],
  //     courses: [],
  //     schemeOfStudy: [],
  //     results: [],
  //   };
  // });

  // Debounced save to localStorage

  const [dbData, setdbData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("dbData");

      const initialData = savedData
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

      if (initialData.admins.length === 0) {
        initialData.admins.push({
          id: "admin1",
          name: "I'm Admin",
          email: "admin@gmail.com",
          password: "admin@gmail.com",
        });

        localStorage.setItem("dbData", JSON.stringify(initialData));
      }

      return initialData;
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

  const saveToLocalStorage = debounce((data) => {
    localStorage.setItem("dbData", JSON.stringify(data));
  }, 1000);

  useEffect(() => {
    saveToLocalStorage(dbData);
  }, [dbData]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };
  return (
    <AppContext.Provider
      value={{
        showPopup,
        setShowPopup,
        togglePopup,
        selectedRows,
        setSelectedRows,
        handleCheckboxChange,
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

export const useAppContext = () => useContext(AppContext);
