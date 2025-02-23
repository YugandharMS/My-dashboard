'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import { FiSun, FiMoon, FiMenu, FiBell, FiSearch, FiPlusCircle, FiHome, FiMessageCircle } from "react-icons/fi";
import { FaImage } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image"; // For optimized image handling in Next.js
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ image, title, body });
    // Optional: Redirect after submission
    router.push("/posts");
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform md:relative md:translate-x-0 w-64 p-5 space-y-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold">My App</h2>
        <button className="absolute top-0 right-2 p-2" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FiSun className="w-5 h-5 text-yellow-500" /> : <FiMoon className="w-5 h-5 text-gray-700" />}
        </button>
        <nav className="mt-6 space-y-4">
          <a href="/" className={`block p-2 rounded-md hover:bg-gray-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>Home</a>
          <a href="attendance-records" className={`block p-2 rounded-md hover:bg-gray-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>Attendance Record</a>
          <a href="#" className={`block p-2 rounded-md hover:bg-gray-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>Library Record</a>
          <Link href="/take-attendance" className={`block p-2 rounded-md hover:bg-gray-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
            Take Attendance
          </Link>
          <a href="#" className={`block p-2 rounded-md hover:bg-gray-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>My-Profile</a>
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
            <FiMenu className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
          </button>
          <div className="flex items-center bg-gray-200 p-2 rounded-md w-full max-w">
            <FiSearch className="text-gray-500 mr-2" />
            <input type="text" placeholder="Search..." className={`bg-transparent outline-none w-full ${darkMode ? 'text-white bg-gray-800' : 'text-black'}`} />
          </div>
          <button className="p-2">
            <FiBell className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-black'}`} />
          </button>
        </div>

        {/* Add Post Form */}
        <div className={`max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${darkMode ? 'text-white' : 'text-black'}`}>
          <header className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Create a New Post</h2>
          </header>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="image-preview mb-4">
              {image ? (
                <Image src={image} alt="Preview" width={400} height={300} className="rounded-md" />
              ) : (
                <div className="flex justify-center items-center h-32 border-2 border-gray-300 rounded-md">
                  <span>Image Preview</span>
                </div>
              )}
            </div>

            <label className="block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="flex items-center cursor-pointer text-blue-500">
                <FaImage className="mr-2" /> Upload Image
              </div>
            </label>

            <input
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 border ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />

            <textarea
              placeholder="Write your post..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={`w-full p-3 border ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            ></textarea>

            <button
              type="submit"
              className={`w-full p-3 ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} rounded-md hover:bg-blue-700`}
            >
              Add Post
            </button>
          </form>
        </div>

        {/* Mobile Bottom Navbar */}
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 p-4 border-t flex justify-around items-center ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <FiPlusCircle className="w-6 h-6 cursor-pointer" onClick={() => router.push('/add-posts')} />
          <FiHome className="w-6 h-6 cursor-pointer" onClick={() => router.push('/')} />
          <FiMessageCircle className="w-6 h-6 cursor-pointer" onClick={() => router.push('/messages')} />
        </nav>
      </div>
    </div>
  );
}
