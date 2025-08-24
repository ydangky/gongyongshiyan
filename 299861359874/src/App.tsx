import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import HVAC from "@/pages/HVAC";
import CFD from "@/pages/CFD";
import Finance from "@/pages/Finance";
import FileSharing from "@/pages/FileSharing";
import LearningProgress from "@/pages/LearningProgress";
import Settings from "@/pages/Settings";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import Sidebar from "@/components/Sidebar";

export default function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(true); // 默认已登录状态用于演示
 const [activeTab, setActiveTab] = useState("home");
 
 const logout = () => {
   setIsAuthenticated(false);
 };

 return (
   <AuthContext.Provider
     value={{ isAuthenticated, setIsAuthenticated, logout }}
   >
     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
       <div className="flex-1 overflow-y-auto p-4">
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/hvac" element={<HVAC />} />
           <Route path="/cfd" element={<CFD />} />
           <Route path="/finance" element={<Finance />} />
           <Route path="/files" element={<FileSharing />} />
           <Route path="/progress" element={<LearningProgress />} />
           <Route path="/settings" element={<Settings />} />
         </Routes>
       </div>
     </div>
   </AuthContext.Provider>
 );
}
