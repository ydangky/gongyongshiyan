import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
 const menuItems = [
    { id: 'home', label: '首页', icon: 'fa-home', path: '/' },
    { id: 'hvac', label: '暖通知识', icon: 'fa-wind', path: '/hvac' },
    { id: 'cfd', label: 'CFD知识', icon: 'fa-cubes', path: '/cfd' },
    { id: 'finance', label: '金融学习', icon: 'fa-chart-line', path: '/finance' },
    { id: 'files', label: '文件共享', icon: 'fa-file-exchange', path: '/files' },
    { id: 'progress', label: '学习进度', icon: 'fa-chart-pie', path: '/progress' },
    { id: 'settings', label: '设置', icon: 'fa-cog', path: '/settings' },
  ];
  
  const handleItemClick = (item: any) => {
    setActiveTab(item.id);
    navigate(item.path);
  };
  
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg z-10 transition-all duration-300 ease-in-out">
      {/* Logo/Brand Area */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          知识共享空间
        </h1>
      </div>
      
      {/* Navigation Menu */}
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
              activeTab === item.id
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5 h-5 mr-3`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
      {/* User Area at the bottom */}
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <i className="fa-solid fa-users text-blue-600 dark:text-blue-400"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">协作学习中</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">两人模式</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;