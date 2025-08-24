import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';
import { Textarea } from '@/components/ui/Textarea';

// 模拟数据 - 暖通知识列表
const hvacKnowledge = [
  {
    id: 1,
    title: '暖通系统设计基础',
    category: '设计',
    level: '初级',
    sharedBy: '协作伙伴',
    date: '2025-08-20',
    description: '介绍暖通空调系统的基本设计原理和方法，包括负荷计算、设备选型等内容。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=HVAC%20system%20design%20basics&sign=17960b3c2c9ae47eb70d920761e0bd5d"
  },
  {
    id: 2,
    title: '空调负荷计算方法',
    category: '计算',
    level: '中级',
    sharedBy: '你',
    date: '2025-08-18',
    description: '详细讲解空调负荷计算的各种方法和工具，包括手动计算和软件计算。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=HVAC%20load%20calculation&sign=02ca4b3e47562dd212cf77cc53a05bff"
  },
  {
    id: 3,
    title: '暖通系统节能技术',
    category: '节能',
    level: '高级',
    sharedBy: '协作伙伴',
    date: '2025-08-15',
    description: '探讨暖通系统的节能技术和策略，包括变频技术、热回收等先进节能方案。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=HVAC%20energy%20saving%20technology&sign=64b90acbf46a14654d7a98d977099b73"
  },
  {
    id: 4,
    title: '风管系统设计与优化',
    category: '设计',
    level: '中级',
    sharedBy: '协作伙伴',
    date: '2025-08-10',
    description: '风管系统的设计规范、阻力计算和优化方法，确保系统高效运行。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=HVAC%20duct%20system%20design&sign=0cb414b3986174a001f829a01fe22d4f"
  },
  {
    id: 5,
    title: '暖通设备维护指南',
    category: '维护',
    level: '初级',
    sharedBy: '你',
    date: '2025-08-05',
    description: '暖通设备的日常维护和故障排除指南，延长设备寿命，保证系统稳定运行。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=HVAC%20equipment%20maintenance&sign=397cc3209e99a456b4aa8773a4b82c7b"
  },
  {
    id: 6,
    title: '智能暖通控制系统',
    category: '控制',
    level: '高级',
    sharedBy: '协作伙伴',
    date: '2025-08-01',
    description: '介绍现代智能暖通控制系统的组成和工作原理，可以实现精准控制和节能运行。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Intelligent%20HVAC%20control%20system&sign=8eabeca6b453b871d5f83d2886ede10d"
  }
];

// 分类标签
const categories = [
  { id: 'all', name: '全部' },
  { id: 'design', name: '设计' },
  { id: 'calculation', name: '计算' },
  { id: 'energy', name: '节能' },
  { id: 'maintenance', name: '维护' },
  { id: 'control', name: '控制' }
];

export default function HVAC() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // 筛选知识内容
  const filteredKnowledge = hvacKnowledge.filter(item => {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">暖通知识</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">探索和共享暖通空调系统的专业知识</p>
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
            placeholder="搜索暖通知识..."
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
            <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-md group">
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
                  <Badge variant="outline">{item.category}</Badge>
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
            没有找到符合搜索条件的暖通知识内容，请尝试其他搜索词或分类。
          </p>
        </div>
      )}
      
      {/* 添加知识点对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>添加新暖通知识点</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">标题</label>
              <Input placeholder="输入知识点标题" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">分类</label>
              <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                <option value="design">设计</option>
                <option value="calculation">计算</option>
                <option value="energy">节能</option>
                <option value="maintenance">维护</option>
                <option value="control">控制</option>
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
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsAddDialogOpen(false)}>取消</Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>保存知识点</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}