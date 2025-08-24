import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';

// 模拟数据 - 学习进度概览
const progressOverview = [
  { name: '暖通知识', 你的进度: 65, 伙伴进度: 45 },
  { name: 'CFD知识', 你的进度: 30, 伙伴进度: 70 },
  { name: '金融知识', 你的进度: 50, 伙伴进度: 40 },
];

// 模拟数据 - 每周学习时间
const weeklyStudyTime = [
  { day: '周一', 你的时间: 1.5, 伙伴时间: 2.0 },
  { day: '周二', 你的时间: 2.0, 伙伴时间: 1.0 },
  { day: '周三', 你的时间: 0.5, 伙伴时间: 1.5 },
  { day: '周四', 你的时间: 2.5, 伙伴时间: 0.5 },
  { day: '周五', 你的时间: 1.0, 伙伴时间: 2.5 },
  { day: '周六', 你的时间: 3.0, 伙伴时间: 3.5 },
  { day: '周日', 你的时间: 2.0, 伙伴时间: 1.5 },
];

// 模拟数据 - 知识点完成情况
const hvacTopics = [
  { id: 1, name: '暖通系统基础', completed: true },
  { id: 2, name: '负荷计算方法', completed: true },
  { id: 3, name: '设备选型', completed: false },
  { id: 4, name: '系统设计案例', completed: false },
  { id: 5, name: '节能技术应用', completed: false },
];

const cfdTopics = [
  { id: 1, name: 'CFD基本原理', completed: true },
  { id: 2, name: '控制方程', completed: true },
  { id: 3, name: '网格生成', completed: true },
  { id: 4, name: '湍流模型', completed: false },
  { id: 5, name: '边界条件设置', completed: false },
  { id: 6, name: '后处理技术', completed: false },
];

const financeTopics = [
  { id: 1, name: '金融市场基础', completed: true },
  { id: 2, name: '技术分析方法', completed: true },
  { id: 3, name: '风险管理', completed: false },
  { id: 4, name: '投资组合理论', completed: false },
  { id: 5, name: '宏观经济分析', completed: false },
];

// 颜色配置
const COLORS = {
  your: '#3b82f6', // 蓝色 - 你的进度
  partner: '#10b981', // 绿色 - 伙伴进度
  hvac: '#f97316', // 橙色 - 暖通
  cfd: '#10b981', // 绿色 - CFD
  finance: '#8b5cf6', // 紫色 - 金融
  chartColors: ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ec4899']
};

export default function LearningProgress() {
  // 计算总体学习进度
  const calculateOverallProgress = () => {
    const yourTotal = progressOverview.reduce((sum, item) => sum + item['你的进度'], 0);
    const partnerTotal = progressOverview.reduce((sum, item) => sum + item['伙伴进度'], 0);
    
    return {
      your: Math.round(yourTotal / progressOverview.length),
      partner: Math.round(partnerTotal / progressOverview.length)
    };
  };
  
  const overallProgress = calculateOverallProgress();
  
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">学习进度</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">跟踪和比较两人的学习进度</p>
      </div>
      
      {/* 总体进度概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>各领域学习进度</CardTitle>
            <CardDescription>比较你和伙伴在不同知识领域的学习进度</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={progressOverview}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Bar dataKey="你的进度" name="你的进度" fill={COLORS.your} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="伙伴进度" name="伙伴进度" fill={COLORS.partner} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>总体学习进度</CardTitle>
            <CardDescription>所有知识领域的平均进度</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-6">
            <div className="w-48 h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { value: overallProgress.your, name: '已完成' },
                      { value: 100 - overallProgress.your, name: '未完成' }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill={COLORS.your} />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{overallProgress.your}%</span>
                <span className="text-sm text-gray-500">你的进度</span>
              </div>
            </div>
            
            <div className="w-full mt-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">你的总体进度</span>
                <span className="text-sm font-medium">{overallProgress.your}%</span>
              </div>
              <Progress value={overallProgress.your} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">伙伴总体进度</span>
                <span className="text-sm font-medium">{overallProgress.partner}%</span>
              </div>
              <Progress value={overallProgress.partner} className="h-2 bg-gray-100" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* 详细进度和学习时间 */}
      <Tabs defaultValue="topics" className="space-y-6">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="topics">知识点完成情况</TabsTrigger>
          <TabsTrigger value="time">学习时间统计</TabsTrigger>
        </TabsList>
        
        <TabsContent value="topics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 暖通知识点 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-orange-500"></span> 暖通知识
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hvacTopics.map(topic => (
                    <div key={topic.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          topic.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {topic.completed && <i className="fa-solid fa-check text-xs"></i>}
                        </div>
                        <span className={topic.completed ? 'line-through text-gray-500' : ''}>{topic.name}</span>
                      </div>
                      {topic.completed && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          已完成
                        </Badge>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>完成进度</span>
                      <span>{Math.round((hvacTopics.filter(t => t.completed).length / hvacTopics.length) * 100)}%</span>
                    </div>
                    <Progress value={(hvacTopics.filter(t => t.completed).length / hvacTopics.length) * 100} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* CFD知识点 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span> CFD知识
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cfdTopics.map(topic => (
                    <div key={topic.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          topic.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {topic.completed && <i className="fa-solid fa-check text-xs"></i>}
                        </div>
                        <span className={topic.completed ? 'line-through text-gray-500' : ''}>{topic.name}</span>
                      </div>
                      {topic.completed && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          已完成
                        </Badge>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>完成进度</span>
                      <span>{Math.round((cfdTopics.filter(t => t.completed).length / cfdTopics.length) * 100)}%</span>
                    </div>
                    <Progress value={(cfdTopics.filter(t => t.completed).length / cfdTopics.length) * 100} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 金融知识点 */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500"></span> 金融知识
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {financeTopics.map(topic => (
                    <div key={topic.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          topic.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {topic.completed && <i className="fa-solid fa-check text-xs"></i>}
                        </div>
                        <span className={topic.completed ? 'line-through text-gray-500' : ''}>{topic.name}</span>
                      </div>
                      {topic.completed && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          已完成
                        </Badge>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>完成进度</span>
                      <span>{Math.round((financeTopics.filter(t => t.completed).length / financeTopics.length) * 100)}%</span>
                    </div>
                    <Progress value={(financeTopics.filter(t => t.completed).length / financeTopics.length) * 100} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="time">
          <Card>
            <CardHeader>
              <CardTitle>每周学习时间对比</CardTitle>
              <CardDescription>过去一周你和伙伴的学习时间分布（小时）</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyStudyTime}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" />
                    <YAxis label={{ value: '学习时间（小时）', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Bar dataKey="你的时间" name="你的时间" fill={COLORS.your} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="伙伴时间" name="伙伴时间" fill={COLORS.partner} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h4 className="font-medium mb-2">学习时间统计</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>本周总学习时间</span>
                      <span className="font-medium">14.5 小时</span>
                    </div>
                    <div className="flex justify-between">
                      <span>平均每日学习时间</span>
                      <span className="font-medium">2.1 小时</span>
                    </div>
                    <div className="flex justify-between">
                      <span>最多学习日</span>
                      <span className="font-medium">周六 (3.0 小时)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">与伙伴比较</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>伙伴本周总学习时间</span>
                      <span className="font-medium">14.5 小时</span>
                    </div>
                    <div className="flex justify-between">
                      <span>学习时间差异</span>
                      <span className="font-medium text-green-600">相同</span>
                    </div>
                    <div className="flex justify-between">
                      <span>学习最多的领域</span>
                      <span className="font-medium">暖通知识</span>
                    </div>
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