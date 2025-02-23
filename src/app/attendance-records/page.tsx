'use client';

import { useState, useEffect } from "react";
import { FiSun, FiMoon, FiMenu, FiBell, FiSearch, FiPlusCircle, FiHome, FiMessageCircle } from "react-icons/fi";
import { Pie, Bar } from "react-chartjs-2";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "chart.js/auto";

export default function AttendanceRecordsPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pieData = {
    labels: ["Present", "Absent", "Late"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#4caf50", "#f44336", "#ff9800"],
      },
    ],
  };

  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Attendance %",
        data: [90, 85, 80, 95],
        backgroundColor: "#007bff",
      },
    ],
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarOpen && !event.target.closest(".sidebar")) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);

  return (
    <div className={`flex h-100vh ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
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
          <Link href="/take-attendance" className="block p-2 rounded-md hover:bg-gray-300">
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

        {/* Attendance Records */}
        <div className="flex-1 p-6 pb-20">
          <h1 className="text-2xl font-bold mb-6">Attendance Records</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className={`p-6 shadow-md rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
              <div className="w-full h-80 md:h-96 relative">
                <Pie 
                  data={pieData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          color: darkMode ? '#fff' : '#000'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* Bar Chart */}
            <div className={`p-6 shadow-md rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <h3 className="text-lg font-semibold mb-4">Weekly Attendance</h3>
              <div className="w-full h-80 md:h-96 relative">
                <Bar 
                  data={barData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: darkMode ? '#fff' : '#000'
                        }
                      },
                      x: {
                        ticks: {
                          color: darkMode ? '#fff' : '#000'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navbar */}
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 p-4 border-t flex justify-around items-center 
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} z-30`}>
          <FiPlusCircle 
            className="w-6 h-6 cursor-pointer hover:opacity-80" 
            onClick={() => router.push('/add-post')} 
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