'use client';

import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMenu, FiBell, FiSearch, FiPlusCircle, FiHome, FiMessageCircle } from "react-icons/fi";
import DatePicker from "react-datepicker";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

export default function TakeAttendance() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Ensure event.target is not null and is an Element
      const target = event.target as Element | null;
      if (sidebarOpen && target && !target.closest(".sidebar")) {
        setSidebarOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleOutsideClick);
  
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);


  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:relative md:translate-x-0 w-64 p-5 space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md sidebar z-40`}>
        <h2 className="text-2xl font-bold">My App</h2>
        <button 
          className="absolute top-0 right-2 p-2" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
        <nav className="mt-6 space-y-4">
          <Link href="/" className="block p-2 rounded-md hover:bg-gray-300">
              Home
          </Link>
          <Link href="/attendance-records" className="block p-2 rounded-md hover:bg-gray-300">
            Attendance Record
          </Link>
          <Link href="#" className="block p-2 rounded-md hover:bg-gray-300">
            Library Record
          </Link>
          <Link href="#" className="block p-2 rounded-md hover:bg-gray-300">
            Take Attendance
          </Link>
          <a href="profile-page" className="block p-2 rounded-md hover:bg-gray-300">My-Profile</a>
          <a href="add-posts" className="block p-2 rounded-md hover:bg-gray-300">Add-Posts</a>
        </nav>
        <div className="absolute bottom-5 left-5">
          <Link href="#" className="font-semibold">Profile Name</Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className={`flex items-center justify-between p-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button className="md:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="flex items-center bg-gray-200 p-2 rounded-md w-full max-w">
            <FiSearch className="text-gray-500 mr-2" />
            <input type="text" placeholder="Search..." className="bg-transparent outline-none w-full" />
          </div>
          <button className="p-2">
            <FiBell className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 pb-20"> {/* Added bottom padding for mobile nav */}
          <div className={`max-w-xl mx-auto p-6 shadow-md rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <h2 className="text-xl font-bold mb-4">Class Selection</h2>

            {/* Form Elements */}
            <select className={`w-full p-2 border rounded-md mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option>Select Year</option>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
              <option value="4">Year 4</option>
            </select>

            <select className={`w-full p-2 border rounded-md mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option>Select Department</option>
              <option value="cs">Computer Science</option>
              <option value="entc">ENTC</option>
              <option value="mechanical">Mechanical</option>
              <option value="civil">Civil</option>
            </select>

            <select className={`w-full p-2 border rounded-md mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option>Select Subject</option>
              <option value="maths">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="cs">Computer Science</option>
            </select>

            <select className={`w-full p-2 border rounded-md mb-4 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}>
              <option>Select Class</option>
              <option value="a">Class A</option>
              <option value="b">Class B</option>
              <option value="c">Class C</option>
            </select>

            <div className="mb-4">
              <label className="block mb-2">Select Date:</label>
              <DatePicker 
                selected={date} 
                onChange={(newDate) => setDate(newDate)} 
                className={`w-full p-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
                calendarClassName={darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}
                popperClassName={darkMode ? '!bg-gray-700 text-white' : '!bg-white text-black'}
              />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navbar */}
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 p-4 border-t flex justify-around items-center 
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} z-30`}>
          <FiPlusCircle 
            className="w-6 h-6 cursor-pointer hover:opacity-80" 
            onClick={() => router.push('/add-posts')} 
          />
          <FiHome 
            className="w-6 h-6 cursor-pointer hover:opacity-80" 
            onClick={() => router.push('/')} 
          />
          <FiMessageCircle 
            className="w-6 h-6 cursor-pointer hover:opacity-80" 
            onClick={() => router.push('/messages')} 
          />
        </nav>
      </div>
    </div>
  );
}
