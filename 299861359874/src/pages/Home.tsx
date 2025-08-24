import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

// 模拟数据 - 最近共享的知识
const recentKnowledge = [
  {
    id: 1,
    title: '暖通系统设计基础',
    category: 'hvac',
    sharedBy: '协作伙伴',
    date: '今天',
    progress: 65,
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=HVAC%20system%20design%20illustration&sign=c5d7cef06aba87d074925dd5ae7c064d"
  },
  {
    id: 2,
    title: 'CFD数值模拟方法',
    category: 'cfd',
    sharedBy: '你',
    date: '昨天',
    progress: 30,
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=CFD%20simulation%20visualization&sign=7e5c9688513315300118e6a2d8256ed4"
  },
  {
    id: 3,
    title: '金融市场技术分析',
    category: 'finance',
    sharedBy: '协作伙伴',
    date: '3天前',
    progress: 80,
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Financial%20market%20analysis%20chart&sign=9a8b366dc1db7e912dccba650718b643"
  }
];

// 模拟数据 - 最近共享的文件
const recentFiles = [
  {
    id: 1,
    name: '暖通工程案例集.pdf',
    size: '2.4 MB',
    type: 'pdf',
    sharedBy: '协作伙伴',
    date: '今天'
  },
  {
    id: 2,
    name: 'CFD模拟练习文件.zip',
    size: '15.8 MB',
    type: 'zip',
    sharedBy: '你',
    date: '昨天'
  }
];

// 模拟数据 - 学习进度
const learningProgress = [
  { category: '暖通知识', progress: 45 },
  { category: 'CFD知识', progress: 30 },
  { category: '金融学习', progress: 60 }
];

export default function Home() {
  const navigate = useNavigate();
  
  // 获取分类对应的颜色
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'hvac': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'cfd': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'finance': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // 获取文件类型对应的图标
  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf': return 'fa-file-pdf text-red-500';
      case 'zip': return 'fa-file-archive text-blue-500';
      case 'doc': return 'fa-file-word text-blue-700';
      case 'xls': return 'fa-file-excel text-green-600';
      default: return 'fa-file text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">欢迎回来！</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">继续你的学习之旅，或探索新的共享内容</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/files')} className="gap-2">
            <i className="fa-solid fa-upload"></i> 上传文件
          </Button>
          <Button onClick={() => navigate('/hvac')} variant="secondary" className="gap-2">
            <i className="fa-solid fa-plus"></i> 新建知识
          </Button>
        </div>
      </div>
      
      {/* 学习进度概览 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>学习进度</CardTitle>
          <CardDescription>各知识领域的学习完成情况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {learningProgress.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{item.category}</span>
                  <span className="text-sm text-gray-500">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* 主要内容区域 */}
      <Tabs defaultValue="knowledge" className="space-y-6">
        <TabsList className="grid grid-cols-3 mb-2">
          <TabsTrigger value="knowledge">最近知识</TabsTrigger>
          <TabsTrigger value="files">共享文件</TabsTrigger>
          <TabsTrigger value="activity">学习活动</TabsTrigger>
        </TabsList>
        
        {/* 最近知识内容 */}
        <TabsContent value="knowledge" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentKnowledge.map(item => (
              <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-md group">
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category === 'hvac' ? '暖通' : item.category === 'cfd' ? 'CFD' : '金融'}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  </div>
                  <CardDescription>
                    由 {item.sharedBy} 共享 · {item.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>学习进度</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => navigate(`/${item.category}`)}
                  >
                    继续学习
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button variant="ghost" onClick={() => navigate('/hvac')}>
              查看全部知识 <i className="fa-solid fa-arrow-right ml-1"></i>
            </Button>
          </div>
        </TabsContent>
        
        {/* 文件共享内容 */}
        <TabsContent value="files" className="space-y-4">
          <Card> 
            <CardContent className="p-0">
              <div className="divide-y">
                {recentFiles.map((file, index) => (
                  <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">
                        <i className={`fa-solid ${getFileIcon(file.type)}`}></i>
                      </div>
                      <div>
                        <h4 className="font-medium">{file.name}</h4>
                        <p className="text-sm text-gray-500">由 {file.sharedBy} 共享 · {file.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <i className="fa-solid fa-download"></i>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <i className="fa-solid fa-ellipsis-v"></i>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="text-center mt-4">
            <Button variant="ghost" onClick={() => navigate('/files')}>
              查看全部文件 <i className="fa-solid fa-arrow-right ml-1"></i>
            </Button>
          </div>
        </TabsContent>
        
        {/* 学习活动内容 */}
        <TabsContent value="activity">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-check text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-medium">完成了"暖通系统设计基础"的第三章</p>
                    <p className="text-sm text-gray-500">今天 14:30</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-file-import text-green-600"></i>
                  </div>
                  <div>
                    <p className="font-medium">协作伙伴共享了新文件"CFD模拟案例库.zip"</p>
                    <p className="text-sm text-gray-500">昨天 09:15</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-comment text-purple-600"></i>
                  </div>
                  <div>
                    <p className="font-medium">你对"金融市场分析"添加了评论</p>
                    <p className="text-sm text-gray-500">昨天 16:45</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-upload text-amber-600"></i>
                  </div>
                  <div>
                    <p className="font-medium">上传了新知识点"暖通空调系统维护指南"</p>
                    <p className="text-sm text-gray-500">2天前</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}