import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';

import { Progress } from '@/components/ui/Progress';
import { toast } from 'sonner';

// 文件类型图标映射
const fileTypeIcons = {
  pdf: { icon: 'fa-file-pdf', color: 'text-red-500' },
  doc: { icon: 'fa-file-word', color: 'text-blue-700' },
  docx: { icon: 'fa-file-word', color: 'text-blue-700' },
  xls: { icon: 'fa-file-excel', color: 'text-green-600' },
  xlsx: { icon: 'fa-file-excel', color: 'text-green-600' },
  ppt: { icon: 'fa-file-powerpoint', color: 'text-orange-600' },
  pptx: { icon: 'fa-file-powerpoint', color: 'text-orange-600' },
  zip: { icon: 'fa-file-archive', color: 'text-blue-500' },
  rar: { icon: 'fa-file-archive', color: 'text-blue-500' },
  jpg: { icon: 'fa-file-image', color: 'text-pink-500' },
  jpeg: { icon: 'fa-file-image', color: 'text-pink-500' },
  png: { icon: 'fa-file-image', color: 'text-pink-500' },
  gif: { icon: 'fa-file-image', color: 'text-pink-500' },
  txt: { icon: 'fa-file-lines', color: 'text-gray-500' },
  csv: { icon: 'fa-file-csv', color: 'text-green-500' },
  default: { icon: 'fa-file', color: 'text-gray-500' }
};

// 模拟数据 - 共享文件列表
const sharedFiles = [
  {
    id: 'file1',
    name: '暖通系统设计手册.pdf',
    type: 'pdf',
    size: '2.4 MB',
    uploadedBy: '协作伙伴',
    date: '2025-08-22',
    category: 'hvac',
    downloads: 5
  },
  {
    id: 'file2',
    name: 'CFD模拟案例库.zip',
    type: 'zip',
    size: '15.8 MB',
    uploadedBy: '你',
    date: '2025-08-20',
    category: 'cfd',
    downloads: 3
  },
  {
    id: 'file3',
    name: '金融市场分析报告.xlsx',
    type: 'xlsx',
    size: '1.2 MB',
    uploadedBy: '协作伙伴',
    date: '2025-08-18',
    category: 'finance',
    downloads: 2
  },
  {
    id: 'file4',
    name: '暖通工程图纸.dwg',
    type: 'dwg',
    size: '8.7 MB',
    uploadedBy: '你',
    date: '2025-08-15',
    category: 'hvac',
    downloads: 4
  },
  {
    id: 'file5',
    name: 'CFD数值方法论文.pdf',
    type: 'pdf',
    size: '3.5 MB',
    uploadedBy: '协作伙伴',
    date: '2025-08-12',
    category: 'cfd',
    downloads: 1
  },
  {
    id: 'file6',
    name: '投资组合分析工具.xlsx',
    type: 'xlsx',
    size: '0.8 MB',
    uploadedBy: '协作伙伴',
    date: '2025-08-10',
    category: 'finance',
    downloads: 6
  }
];

// 文件分类
const fileCategories = [
  { id: 'all', name: '全部文件' },
  { id: 'hvac', name: '暖通文件' },
  { id: 'cfd', name: 'CFD文件' },
  { id: 'finance', name: '金融文件' }
];

export default function FileSharing() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isFileInfoOpen, setIsFileInfoOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 筛选文件
  const filteredFiles = sharedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || file.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  
  // 获取文件类型图标
  const getFileIcon = (fileType: string) => {
    const iconInfo = fileTypeIcons[fileType.toLowerCase()] || fileTypeIcons.default;
    return <i className={`fa-solid ${iconInfo.icon} ${iconInfo.color} text-xl`}></i>;
  };
  
  // 获取文件分类标签样式
  const getCategoryBadgeStyle = (category: string) => {
    switch(category) {
      case 'hvac':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'cfd':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'finance':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  // 获取分类名称
  const getCategoryName = (category: string) => {
    switch(category) {
      case 'hvac': return '暖通文件';
      case 'cfd': return 'CFD文件';
      case 'finance': return '金融文件';
      default: return '其他文件';
    }
  };
  
  // 处理文件上传
  const handleFileUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setIsUploadDialogOpen(false);
            toast.success('文件上传成功！');
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };
  
  // 处理拖放上传
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };
  
  // 打开文件详情
  const openFileInfo = (file: any) => {
    setSelectedFile(file);
    setIsFileInfoOpen(true);
  };
  
  // 下载文件
  const downloadFile = (file: any) => {
    toast.success(`正在下载: ${file.name}`);
    // 实际应用中这里会触发文件下载
  };
  
  return (
    <div className="space-y-6">
      {/* 页面标题和操作区 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">文件共享</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">上传和下载共享档案，协作学习资源</p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)} className="gap-2 self-end md:self-auto">
          <i className="fa-solid fa-upload"></i> 上传文件
        </Button>
      </div>
      
      {/* 文件统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">总文件数</p>
                <h3 className="text-2xl font-bold mt-1">6</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <i className="fa-solid fa-files text-xl"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">总大小</p>
                <h3 className="text-2xl font-bold mt-1">34.1 MB</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <i className="fa-solid fa-hdd text-xl"></i>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">下载次数</p>
                <h3 className="text-2xl font-bold mt-1">23</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <i className="fa-solid fa-download text-xl"></i>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 搜索和分类 */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Input
                type="text"
                placeholder="搜索文件..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              {fileCategories.map(category => (
                <Badge
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className="cursor-pointer px-3 py-1"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 文件列表 */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>共享文件列表</CardTitle>
              <CardDescription>
                显示 {getCategoryName(activeCategory)} ({filteredFiles.length} 个文件)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredFiles.length > 0 ? (
            <div className="divide-y">
              {filteredFiles.map(file => (
                <div 
                  key={file.id} 
                  className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => openFileInfo(file)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <h4 className="font-medium">{file.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getCategoryBadgeStyle(file.category)}>
                          {getCategoryName(file.category)}
                        </Badge>
                        <span className="text-sm text-gray-500">{file.size}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">由 {file.uploadedBy} 上传</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{file.date}</span>
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadFile(file);
                      }}
                    >
                      <i className="fa-solid fa-download"></i>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <i className="fa-solid fa-file-search text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">未找到文件</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                没有找到符合当前筛选条件的文件，请尝试其他搜索词或分类。
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* 上传文件对话框 */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>上传新文件</DialogTitle>
          </DialogHeader>
          
          {isUploading ? (
            <div className="space-y-4 py-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-4">
                  <i className="fa-solid fa-cloud-upload-alt text-2xl"></i>
                </div>
                <h3 className="font-medium text-lg">正在上传文件</h3>
                <p className="text-gray-500 mt-1">请稍候，文件正在上传中...</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>document.pdf</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">

              
              {/* 文件上传区域 */}
              <div 
                className={`border-2 border-dashed rounded-md p-8 text-center transition-colors ${
                  isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.jpg,.jpeg,.png,.gif"
                />
                
                <i className="fa-solid fa-cloud-upload text-3xl text-gray-400 mb-4"></i>
                <h3 className="font-medium">拖放文件到此处或点击上传</h3>
                <p className="text-sm text-gray-500 mt-2">支持 PDF, Word, Excel, PowerPoint, 压缩文件等</p>
                
                <Button className="mt-4">
                  选择文件
                </Button>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">文件分类</label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                  <option value="hvac">暖通文件</option>
                  <option value="cfd">CFD文件</option>
                  <option value="finance">金融文件</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">文件描述（可选）</label>
                <textarea 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                  rows={3}
                  placeholder="添加文件描述..."
                ></textarea>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {!isUploading && (
              <Button variant="secondary" onClick={() => setIsUploadDialogOpen(false)}>取消</Button>
            )}
            {!isUploading && (
              <Button>上传文件</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* 文件详情对话框 */}
      <Dialog open={isFileInfoOpen} onOpenChange={setIsFileInfoOpen}>
        {selectedFile && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>文件详情</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="text-5xl mb-4">
                  {getFileIcon(selectedFile.type)}
                </div>
                <h3 className="text-xl font-medium text-center">{selectedFile.name}</h3>
                <p className="text-gray-500 mt-1">{selectedFile.size}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">文件类型</span>
                  <span>{selectedFile.type.toUpperCase()} 文件</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">分类</span>
                  <Badge variant="outline" className={getCategoryBadgeStyle(selectedFile.category)}>
                    {getCategoryName(selectedFile.category)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">上传者</span>
                  <span>{selectedFile.uploadedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">上传日期</span>
                  <span>{selectedFile.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">下载次数</span>
                  <span>{selectedFile.downloads} 次</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">文件描述</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  这是一个关于 {selectedFile.category === 'hvac' ? '暖通系统设计' : 
                                 selectedFile.category === 'cfd' ? 'CFD数值模拟' : '金融市场分析'} 的专业文件，包含了详细的理论知识和实践案例。
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsFileInfoOpen(false)}>关闭</Button>
              <Button onClick={() => {
                downloadFile(selectedFile);
                setIsFileInfoOpen(false);
              }}>
                <i className="fa-solid fa-download mr-2"></i> 下载文件
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}