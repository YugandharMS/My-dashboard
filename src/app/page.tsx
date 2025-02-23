'use client';

import { useState } from "react";
import { FiSun, FiMoon, FiMenu, FiBell, FiSearch, FiPlusCircle, FiHome, FiMessageCircle } from "react-icons/fi";
import { FaThumbsUp, FaRegThumbsUp, FaShareAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  


  const [likedPosts, setLikedPosts] = useState<Record<string | number, boolean>>({});
const [shareOptions, setShareOptions] = useState<string | number | null>(null);

const toggleLike = (postId: string | number) => {
  setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
};

const toggleShare = (postId: string | number) => {
  setShareOptions(shareOptions === postId ? null : postId);
};

  return (
    <div className={`flex h-vh ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:relative md:translate-x-0 w-64 p-5 space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">My App</h2>
        <button 
          className="absolute top-0 right-2 p-2" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
        </button>
        <nav className="mt-6 space-y-4">
          <a href="#" className="block p-2 rounded-md hover:bg-gray-300">Home</a>
          <a href="attendance-records" className="block p-2 rounded-md hover:bg-gray-300">Attendance Record</a>
          <a href="#" className="block p-2 rounded-md hover:bg-gray-300">Library Record</a>
          <Link href="/take-attendance" className="block p-2 rounded-md hover:bg-gray-300">
            Take Attendance
          </Link>
          <a href="profile-page" className="block p-2 rounded-md hover:bg-gray-300">My-Profile</a>
          <a href="add-posts" className="block p-2 rounded-md hover:bg-gray-300">Add-Posts</a>
        </nav>
        <div className="absolute bottom-5 left-5">
          <a href="#" className="font-semibold">Profile Name</a>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col" onClick={() => setSidebarOpen(false)}>
        {/* Navbar */}
        <div className={`flex items-center justify-between p-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button className="md:hidden p-2" onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}>
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

        {/* Feed Section */}
        <div className="flex-1 p-6 space-y-6 pb-16"> {/* Added pb-16 for bottom padding */}
          {[1, 2].map((postId) => (
            <div key={postId} className={`max-w-xl mx-auto p-6 shadow-md rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
              <div className="flex items-center mb-4">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-15%20193557-S7kD4wznMSMpnjfq8USDkklnZJETsQ.png" alt="User" className="w-10 h-10 rounded-full" />
                <div className="ml-3">
                  <h4 className="font-bold">Yugandhar</h4>
                  <p className="text-sm">Product Designer, UI</p>
                </div>
              </div>
              <p className="mb-4">Habitant morbi tristique senectus et netus et. Suspendisse sed nisi lacus sed viverra. Dolor morbi non arcu risus quis varius.</p>
              <div className="mb-4">
                <img src="/placeholder.svg?height=200&width=400" alt="Post content" className="rounded-md" />
              </div>
              <div className="flex items-center space-x-6">
                <button onClick={() => toggleLike(postId)} className="flex items-center space-x-1">
                  {likedPosts[postId] ? <FaThumbsUp className="text-red-500" /> : <FaRegThumbsUp />}
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-1">
                  <FaShareAlt />
                  <span onClick={() => toggleShare(postId)}>Share</span>
                </button>
              </div>
              {shareOptions === postId && (
                <div className="mt-3 p-3 border rounded-md bg-gray-100 text-black">
                  <p className="text-sm font-semibold">Share via:</p>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="text-blue-500">WhatsApp</a>
                    <button onClick={() => navigator.clipboard.writeText(window.location.href)} className="text-blue-500">Copy Link</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Bottom Navbar */}
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 p-4 border-t flex justify-around items-center 
          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <FiPlusCircle 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => router.push('/add-posts')} 
          />
          <FiHome 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => router.push('/')} 
          />
          <FiMessageCircle 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => router.push('/messages')} 
          />
        </nav>
      </div>
    </div>
  );
}
