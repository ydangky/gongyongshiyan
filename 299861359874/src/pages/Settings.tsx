import React, { useState, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Switch } from '@/components/ui/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { useTheme } from '@/hooks/useTheme';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useContext(AuthContext);
  
  // 设置状态
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    updates: true
});
  
  const [profile, setProfile] = useState({
    name: '你的名字',
    bio: '热爱学习暖通、CFD和金融知识的学习者，喜欢分享和交流。',
    avatar: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=user%20avatar%20icon&sign=5601c812e79bf04609df59687cf36055'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  
  // 保存个人资料
  const saveProfile = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    toast.success('个人资料已更新');
  };
  
  // 取消编辑
  const cancelEdit = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };
  
  // 处理通知设置变更
  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications]
    }));
  };
  
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">设置</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">管理你的账户和偏好设置</p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="profile">个人资料</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
          <TabsTrigger value="appearance">外观</TabsTrigger>
        </TabsList>
        
        {/* 个人资料设置 */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 个人信息卡片 */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>个人资料</CardTitle>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={cancelEdit}>取消</Button>
                      <Button size="sm" onClick={saveProfile}>保存</Button>
                    </div>
                  ) : (
                    <Button size="sm" onClick={() => setIsEditing(true)}>编辑</Button>
                  )}
                </div>
                <CardDescription>管理你的个人信息和偏好</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">电子邮箱</Label>
                    <Input
                      id="email"
                      type="email"
                      value="user@example.com"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea
                    id="bio"
                    value={tempProfile.bio}
                    onChange={(e) => setTempProfile({...tempProfile, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>学习偏好</Label>
                  <Select defaultValue="all">
                    <SelectTrigger disabled={!isEditing}>
                      <SelectValue placeholder="选择主要学习领域" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部领域</SelectItem>
                      <SelectItem value="hvac">暖通优先</SelectItem>
                      <SelectItem value="cfd">CFD优先</SelectItem>
                      <SelectItem value="finance">金融优先</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* 头像和账户操作 */}
            <div className="space-y-6">
              {/* 头像卡片 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">个人头像</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                    <img 
                      src={tempProfile.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <Button size="sm" variant="secondary" className="w-full">
                      <i className="fa-solid fa-upload mr-2"></i> 更换头像
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              {/* 账户操作卡片 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">账户操作</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="destructive" className="w-full" onClick={logout}>
                    <i className="fa-solid fa-sign-out-alt mr-2"></i> 退出登录
                  </Button>
                  
                  <Button variant="outline" className="w-full border border-gray-300 dark:border-gray-600">
                    <i className="fa-solid fa-key mr-2"></i> 修改密码
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        {/* 通知设置 */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>管理你的通知偏好</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">新文件通知</h4>
                    <p className="text-sm text-gray-500">当有新文件共享时接收通知</p>
                  </div>
                  <Switch 
                    checked={notifications.inApp} 
                    onCheckedChange={() => handleNotificationChange('inApp')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">电子邮件通知</h4>
                    <p className="text-sm text-gray-500">通过电子邮件接收重要更新</p>
                  </div>
                  <Switch 
                    checked={notifications.email} 
                    onCheckedChange={() => handleNotificationChange('email')} 
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">学习提醒</h4>
                    <p className="text-sm text-gray-500">接收学习计划和进度提醒</p>
                  </div>
                  <Switch 
                    checked={notifications.updates} 
                    onCheckedChange={() => handleNotificationChange('updates')} 
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">通知频率</h4>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue placeholder="选择通知频率" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">即时通知</SelectItem>
                    <SelectItem value="daily">每日摘要</SelectItem>
                    <SelectItem value="weekly">每周摘要</SelectItem>
                    <SelectItem value="monthly">每月摘要</SelectItem>
                  </SelectContent></Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 外观设置 */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>外观设置</CardTitle>
              <CardDescription>自定义应用的外观和显示方式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">深色模式</h4>
                  <p className="text-sm text-gray-500">切换深色或浅色主题</p>
                </div>
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={toggleTheme} 
                />
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">主题颜色</h4>
                <div className="grid grid-cols-5 gap-4">
                  {[
                    { color: '#3b82f6', name: '蓝色' },
                    { color: '#10b981', name: '绿色' },
                    { color: '#f97316', name: '橙色' },
                    { color: '#8b5cf6', name: '紫色' },
                    { color: '#ec4899', name: '粉色' }
                  ].map((theme, index) => (
                    <button
                      key={index}
                      className={`w-full aspect-square rounded-full border-2 ${
                        index === 0 ? 'border-blue-500' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: theme.color }}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">界面密度</h4>
                <Select defaultValue="comfortable">
                  <SelectTrigger>
                    <SelectValue placeholder="选择界面密度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">紧凑</SelectItem>
                    <SelectItem value="comfortable">舒适（默认）</SelectItem>
                    <SelectItem value="spacious">宽敞</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}