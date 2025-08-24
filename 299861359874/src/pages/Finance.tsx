import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/Dialog';
import { Textarea } from '@/components/ui/Textarea';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 模拟数据 - 金融知识列表
const financeKnowledge = [
  {
    id: 'fin1',
    title: '基础金融市场理论',
    category: '市场分析',
    level: '初级',
    sharedBy: '协作伙伴',
    date: '2025-08-22',
    description: '介绍金融市场的基本结构、参与者和运作机制，包括股票、债券、外汇和衍生品市场。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Financial%20market%20basics&sign=6713272d326627dd2689493dca658297"
  },
  {
    id: 'fin2',
    title: '技术分析方法与指标',
    category: '投资分析',
    level: '中级',
    sharedBy: '你',
    date: '2025-08-19',
    description: '详细讲解股票和外汇市场的技术分析方法，包括K线图、移动平均线、MACD、RSI等常用指标。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Financial%20technical%20analysis&sign=4b2381f3e55307ac2682e916b5e709d4"
  },
  {
    id: 'fin3',
    title: '风险管理与资产配置',
    category: '投资策略',
    level: '高级',
    sharedBy: '协作伙伴',
    date: '2025-08-15',
    description: '探讨现代投资组合理论、风险管理技术和资产配置策略，实现投资组合的最优化。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Risk%20management%20and%20asset%20allocation&sign=49cade2cec16aa5c8fb6c3ef2661a7c1"
  },
  {
    id: 'fin4',
    title: '个人理财规划指南',
    category: '个人理财',
    level: '初级',
    sharedBy: '你',
    date: '2025-08-12',
    description: '提供个人理财规划的实用指南，包括预算制定、储蓄策略、债务管理和长期财务目标设定。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Personal%20financial%20planning&sign=9286c75844249e69425a92497a5299f4"
  },
  {
    id: 'fin5',
    title: '宏观经济指标解读',
    category: '经济分析',
    level: '中级',
    sharedBy: '协作伙伴',
    date: '2025-08-08',
    description: '学习如何解读关键宏观经济指标，如GDP、CPI、失业率和利率，及其对金融市场的影响。',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Macroeconomic%20indicators%20analysis&sign=2701f4081b064a9ec6f82cfee3d55a13"
  },
  {
    id: 'fin6',
    title: '投资心理学与行为金融',
    category: '投资心理',
    level: '高级',
    sharedBy: '你', 
    date: '2025-08-05',
    description: '探讨投资者心理偏差和行为金融理论，如何避免常见的投资心理陷阱并做出理性决策',
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=Investment%20psychology%20and%20behavioral%20finance&sign=d6661bb129f7c6d135ab2a02375bd7de"
  }
];

// 模拟数据 - 市场趋势图表
const marketTrendData = [
  { month: '1月', value: 1200 },
  { month: '2月', value: 1900 },
  { month: '3月', value: 1500 },
  { month: '4月', value: 2800 },
  { month: '5月', value: 2200 },
  { month: '6月', value: 3500 },
  { month: '7月', value: 3200 },
  { month: '8月', value: 4000 },
];

// 分类标签
const categories = [
  { id: 'all', name: '全部' },
  { id: 'market', name: '市场分析' },
  { id: 'investment', name: '投资分析' },
  { id: 'strategy', name: '投资策略' },
  { id: 'personal', name: '个人理财' },
  { id: 'economic', name: '经济分析' },
  { id: 'psychology', name: '投资心理' }
];

export default function Finance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // 筛选知识内容
  const filteredKnowledge = financeKnowledge.filter(item => {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">金融学习</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">探索和共享金融知识与投资策略</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2 self-end md:self-auto bg-purple-600 hover:bg-purple-700">
          <i className="fa-solid fa-plus"></i> 添加知识点
        </Button>
      </div>
      
      {/* 市场趋势图表 */}
      <Card className="mb-6 border-l-4 border-purple-500">
        <CardHeader>
          <CardTitle>市场趋势分析</CardTitle>
          <CardDescription>最近8个月的市场表现趋势图</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketTrendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#9333ea" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="市场指数"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* 搜索和分类区 */}
      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="搜索金融知识..."
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
              className={`cursor-pointer px-3 py-1 ${activeCategory === category.id ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : ''}`}
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
            <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-md group border-l-4 border-purple-500">
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
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">{item.category}</Badge>
                  <Button size="sm" variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100">查看详情</Button>
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
            没有找到符合搜索条件的金融知识内容，请尝试其他搜索词或分类。
          </p>
        </div>
      )}
      
      {/* 添加知识点对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>添加新金融知识点</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">标题</label>
              <Input placeholder="输入知识点标题" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">分类</label>
              <select className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm">
                <option value="market">市场分析</option>
                <option value="investment">投资分析</option>
                <option value="strategy">投资策略</option>
                <option value="personal">个人理财</option>
                <option value="economic">经济分析</option>
                <option value="psychology">投资心理</option>
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
            <Button onClick={() => setIsAddDialogOpen(false)} className="bg-purple-600 hover:bg-purple-700">保存知识点</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}