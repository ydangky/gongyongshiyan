import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';
import { Textarea } from '@/components/ui/Textarea';

// 模拟数据 - CFD知识列表
const cfdKnowledge = [
  {
    id: 'cfd1',
    title: 'CFD基本原理与控制方程',
    category: '基础理论',
    level: '初级',
    sharedBy: '你',
    date: '2025-08-21',
    description: '介绍计算流体力学的基本原理、控制方程和数值方法，为CFD模拟打下理论基础。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=CFD%20fundamentals%20and%20equations&sign=0543dafaa5b59144f98df0704b81fcd1"
  },
  {
    id: 'cfd2',
    title: '网格生成技术与质量评估',
    category: '网格技术',
    level: '中级',
    sharedBy: '协作伙伴',
    date: '2025-08-17',
    description: '详细讲解CFD模拟中的网格生成方法、网格类型选择和网格质量评估标准。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=CFD%20mesh%20generation%20technology&sign=47f3240e8a7c90ea175a594eb832296f"
  },
  {
    id: 'cfd3',
    title: '湍流模型理论与应用',
    category: '数值模型',
    level: '高级',
    sharedBy: '你',
    date: '2025-08-14',
    description: '探讨各种湍流模型的原理、适用性和在工程问题中的应用技巧，包括RANS、LES等方法。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=CFD%20turbulence%20modeling&sign=f14cd58facb3990ee7644c9a10b59fa6"
  },
  {
    id: 'cfd4',
    title: 'CFD边界条件设置指南',
    category: '模拟设置',
    level: '中级',
    sharedBy: '协作伙伴',
    date: '2025-08-10',
    description: '详细介绍CFD模拟中各种边界条件的物理意义、设置方法和注意事项。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=CFD%20boundary%20conditions&sign=8d348521c28b24a1cc88ad2021018bfc"
  },
  {
    id: 'cfd5',
    title: '后处理与结果可视化',
    category: '后处理',
    level: '初级',
    sharedBy: '你',
    date: '2025-08-05',
    description: '学习如何对CFD计算结果进行后处理分析和可视化，提取有价值的工程信息。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=CFD%20post-processing%20visualization&sign=5ce13d1c38c634519030810be1afab44"
  },
  {
    id: 'cfd6',
    title: '工业CFD应用案例分析',
    category: '工程应用',
    level: '高级',
    sharedBy: '协作伙伴',
    date: '2025-08-01',
    description: '通过实际工业案例，分析CFD在不同领域的应用方法、挑战和解决方案。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Industrial%20CFD%20application%20case&sign=50e1dc86b7421d316320f4ec1712b0b9"
  }
];

// 分类标签
const categories = [
  { id: 'all', name: '全部' },
  { id: 'theory', name: '基础理论' },
  { id: 'mesh', name: '网格技术' },
  { id: 'model', name: '数值模型' },
  { id: 'setup', name: '模拟设置' },
  { id: 'post', name: '后处理' },
  { id: 'application', name: '工程应用' }
];

export default function CFD() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // 筛选知识内容
  const filteredKnowledge = cfdKnowledge.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* 页面标题和操作区 */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CFD知识</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">探索和共享计算流体力学的专业知识</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2 self-end md:self-auto">
          <i className="fa-solid fa-plus"></i> 添加知识点
        </Button>
      </div>
      
      {/* 搜索和分类区 */}
      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="搜索CFD知识..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        
        {/* 分类标签 */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
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
      
      {/* 知识内容展示区 */}
      {filteredKnowledge.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredKnowledge.map(item => (
            <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-md group border-l-4 border-green-500">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{item.level}</Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
                </div>
                <CardDescription>
                  由 {item.sharedBy} 共享 · {item.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{item.category}</Badge>
                  <Button size="sm" variant="secondary">查看详情</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
            <i className="fa-solid fa-search text-2xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">未找到相关内容</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            没有找到符合搜索条件的CFD知识内容，请尝试其他搜索词或分类。
          </p>
        </div>
      )}
      
      {/* 添加知识点对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>添加新CFD知识点</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">标题</label>
              <Input placeholder="输入知识点标题" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">分类</label>
              <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                <option value="theory">基础理论</option>
                <option value="mesh">网格技术</option>
                <option value="model">数值模型</option>
                <option value="setup">模拟设置</option>
                <option value="post">后处理</option>
                <option value="application">工程应用</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">难度级别</label>
              <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                <option value="beginner">初级</option>
                <option value="intermediate">中级</option>
                <option value="advanced">高级</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">描述</label>
              <Textarea placeholder="输入知识点详细描述..." rows={4} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">上传图片</label>
              <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <i className="fa-solid fa-cloud-upload text-2xl text-gray-400 mb-2"></i>
                <p className="text-sm text-gray-500">点击或拖拽文件到此处上传</p>
                <p className="text-xs text-gray-400 mt-1">支持 JPG, PNG, GIF (最大 5MB)</p>
              </div>
            </div></div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>保存知识点</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}