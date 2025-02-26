"use client";

import { useState } from "react";
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiBell,
  FiSearch,
  FiGrid,
  FiBook,
  FiClipboard,
  FiHome,
  FiMessageCircle,
  FiPlusCircle,
  FiHeart,
  FiShare2,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ProfilePage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "attendance" | "library">("posts");
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  // Example data
  const posts = Array(9).fill(null);
  const libraryRecords = Array(6).fill(null);

  // Attendance charts data
  const attendancePieData = {
    labels: ["Present", "Late", "Absent"],
    datasets: [
      {
        data: [70, 15, 15],
        backgroundColor: ["#34D399", "#FACC15", "#EF4444"],
        hoverBackgroundColor: ["#10B981", "#EAB308", "#DC2626"],
      },
    ],
  };

  const attendanceBarData = {
    labels: ["CS-101", "Math-202", "Physics-303", "Eng-404", "History-505"],
    datasets: [
      {
        label: "Attendance %",
        data: [85, 75, 90, 65, 80],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      {/* Sidebar for Desktop */}
      <aside
        className={`hidden md:flex flex-col w-64 p-5 space-y-6 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">College Connect</h2>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2">
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
        </div>
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
        </nav>
        <div className="mt-auto">
          <Link href="#" className="font-semibold">
            Profile Name
          </Link>
        </div>
      </aside>

      {/* Sidebar for Mobile (Slide Over) */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className={`fixed inset-y-0 left-0 z-40 w-64 p-5 space-y-6 shadow-md transform transition-transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } ${darkMode ? "bg-gray-800" : "bg-white"}`}
              onClick={(e) => e.stopPropagation()} // Prevents sidebar from closing when clicking inside it
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">College Connect</h2>
                <button onClick={() => setDarkMode(!darkMode)} className="p-2">
                  {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                </button>
              </div>
              <nav className="mt-6 space-y-4">
                <Link
                  href="/"
                  className="block p-2 rounded-md hover:bg-gray-300"
                  onClick={() => setSidebarOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/attendance-records"
                  className="block p-2 rounded-md hover:bg-gray-300"
                  onClick={() => setSidebarOpen(false)}
                >
                  Attendance Record
                </Link>
                <Link href="#" className="block p-2 rounded-md hover:bg-gray-300" onClick={() => setSidebarOpen(false)}>
                  Library Record
                </Link>
                <Link href="#" className="block p-2 rounded-md hover:bg-gray-300" onClick={() => setSidebarOpen(false)}>
                  Take Attendance
                </Link>
              </nav>
              <div className="mt-auto">
                <Link href="#" className="font-semibold">
                  Profile Name
                </Link>
              </div>
            </div>
          </div>
        )}


      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header
          className={`sticky top-0 z-10 flex items-center justify-between p-4 shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <button className="md:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu className={`w-6 h-6 ${darkMode ? "text-white" : "text-black"}`} />
          </button>
          <div className="flex items-center bg-gray-200 p-2 rounded-md w-full max-w">
            <FiSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className={`bg-transparent outline-none w-full ${darkMode ? "text-white" : "text-black"}`}
            />
          </div>
          <button className="p-2">
            <FiBell className={`w-6 h-6 ${darkMode ? "text-white" : "text-black"}`} />
          </button>
        </header>

        {/* Main section: fixed header area and scrollable content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Fixed Profile Header & Navigation Tabs */}
          <div className="shrink-0">
            <div className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-blue-500 p-1">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-sm text-gray-500">Computer Science Student</p>
                </div>
              </div>
            </div>
            <div className={`flex border-b ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              {["posts", "attendance", "library"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "posts" | "attendance" | "library")}
                  className={`flex-1 p-4 flex items-center justify-center gap-2 ${
                    activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : ""
                  }`}
                >
                  {tab === "posts" && <FiGrid />}
                  {tab === "attendance" && <FiClipboard />}
                  {tab === "library" && <FiBook />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Content Section */}
          <div className="flex-1 overflow-y-auto pb-16">
            {activeTab === "posts" && (
              <>
                {/* Post Grid */}
                <div className="grid grid-cols-3 gap-1 p-1">
                  {posts.map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square relative cursor-pointer"
                      onClick={() => setSelectedPost(index)}
                    >
                      <Image
                        src={`/placeholder-${index % 3}.png`}
                        alt="Post"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Modal for Full Post */}
                {selectedPost !== null && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
                    onClick={() => setSelectedPost(null)}
                  >
                    <div
                      className={`relative w-full md:max-w-[800px] h-full md:h-auto p-4 rounded-lg ${
                        darkMode ? "bg-gray-800" : "bg-white"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedPost(null)}
                        className="absolute top-2 right-2 text-gray-700 dark:text-gray-300 text-2xl"
                      >
                        &times;
                      </button>
                      {/* Responsive Modal Content */}
                      <div className="flex flex-col md:flex-row">
                        {/* Image Section */}
                        <div className="relative w-full aspect-square md:w-2/3">
                          <Image
                            src={`/placeholder-${selectedPost % 3}.png`}
                            alt="Full Post"
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        {/* Description & Buttons Section */}
                        <div className="w-full md:w-1/3 flex flex-col justify-between p-4">
                          <div className="mb-4">
                            <p className="text-sm">
                              This is a sample description of the post. It provides details about the post content,
                              context, and any other relevant information.
                            </p>
                          </div>
                          <div className="flex gap-4">
                            <button className="flex items-center gap-1 text-blue-500">
                              <FiHeart className="w-5 h-5" />
                              Like
                            </button>
                            <button className="flex items-center gap-1 text-blue-500">
                              <FiShare2 className="w-5 h-5" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "attendance" && (
              <div className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className={`flex-1 p-4 rounded-lg shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                    <h3 className="font-semibold text-lg mb-2">Attendance Overview</h3>
                    <div className="w-full h-40">
                      <Pie data={attendancePieData} options={chartOptions} />
                    </div>
                  </div>
                  <div className={`flex-1 p-4 rounded-lg shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
                    <h3 className="font-semibold text-lg mb-2">Attendance by Subject</h3>
                    <div className="w-full h-40">
                      <Bar data={attendanceBarData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "library" && (
              <div className="grid grid-cols-2 gap-4 p-4">
                {libraryRecords.map((_, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
                  >
                    <h3 className="font-semibold">Book Title {index + 1}</h3>
                    <p className="text-sm text-gray-500">Author Name</p>
                    <p className="text-sm text-blue-500">Due: 30 March 2024</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Mobile Bottom Navbar */}
        <nav
          className={`md:hidden fixed bottom-0 left-0 right-0 p-4 border-t flex justify-around items-center ${
            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          } z-30`}
        >
          <FiHome className="w-6 h-6 cursor-pointer" onClick={() => router.push("/")} />
          <FiPlusCircle className="w-6 h-6 cursor-pointer" onClick={() => router.push("/add-post")} />
          <FiMessageCircle className="w-6 h-6 cursor-pointer" onClick={() => router.push("/messages")} />
        </nav>
      </div>
    </div>
  );
}
