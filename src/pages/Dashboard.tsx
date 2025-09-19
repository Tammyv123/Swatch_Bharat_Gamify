import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, 
  MapPin, 
  QrCode, 
  Calendar, 
  TrendingUp, 
  Users, 
  Truck, 
  Camera,
  Trophy,
  Leaf,
  Zap,
  Target,
  Clock,
  CheckCircle,
  GraduationCap,
  Gamepad2,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import QRScanner from "@/components/QRScanner";
import WasteTracking from "@/components/WasteTracking";
import ReportingSystem from "@/components/ReportingSystem";
import EWasteDay from "@/components/EWasteDay";
import WasteChatbot from "@/components/WasteChatbot";

interface DashboardProps {
  userData: any;
  onNavigate?: (path: string) => void;
}

const Dashboard = ({ userData, onNavigate }: DashboardProps) => {
  const [currentPoints, setCurrentPoints] = useState(1250);
  const [streak, setStreak] = useState(7);
  const [weeklyGoal] = useState(500);
  const [weeklyProgress] = useState(350);
  
  // Modal states for quick actions
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showWasteTracking, setShowWasteTracking] = useState(false);
  const [showReporting, setShowReporting] = useState(false);
  const [showEWasteDay, setShowEWasteDay] = useState(false);

  const handlePointsEarned = (points: number) => {
    setCurrentPoints(prev => prev + points);
  };

  const recentActivities = [
    { type: "QR Scan", points: 25, time: "2 hours ago", description: "Scanned waste bin at Park Street" },
    { type: "Training", points: 100, time: "1 day ago", description: "Completed Advanced Composting module" },
    { type: "Report", points: 50, time: "2 days ago", description: "Reported missed collection on Main Road" },
    { type: "QR Scan", points: 25, time: "3 days ago", description: "Proper segregation verified at Mall" }
  ];

  const leaderboardData = [
    { rank: 1, name: "Priya Sharma", points: 2850, district: "Mumbai" },
    { rank: 2, name: "Raj Patel", points: 2720, district: "Delhi" },
    { rank: 3, name: "Anita Kumar", points: 2650, district: "Bangalore" },
    { rank: 4, name: userData?.name || "You", points: currentPoints, district: "Your District", isUser: true },
    { rank: 5, name: "Vikram Singh", points: 2420, district: "Chennai" }
  ];

  const quickActions = [
    {
      title: "Scan QR Code",
      description: "Verify waste disposal",
      icon: <QrCode className="h-6 w-6" />,
      color: "eco",
      action: () => setShowQRScanner(true)
    },
    {
      title: "Track Waste Truck",
      description: "Find collection vehicles",
      icon: <Truck className="h-6 w-6" />,
      color: "sky",
      action: () => setShowWasteTracking(true)
    },
    {
      title: "Report Issue",
      description: "Report waste problems",
      icon: <Camera className="h-6 w-6" />,
      color: "warning",
      action: () => setShowReporting(true)
    },
    {
      title: "E-Waste Day",
      description: "Join monthly e-waste collection",
      icon: <Calendar className="h-6 w-6" />,
      color: "nature",
      action: () => setShowEWasteDay(true)
    }
  ];

  const achievements = [
    { title: "First Steps", description: "Completed training", icon: <CheckCircle className="h-5 w-5" />, earned: true },
    { title: "Week Warrior", description: "7-day streak", icon: <Zap className="h-5 w-5" />, earned: true },
    { title: "QR Master", description: "Scan 50 QR codes", icon: <QrCode className="h-5 w-5" />, earned: false },
    { title: "Eco Champion", description: "Reach 5000 points", icon: <Trophy className="h-5 w-5" />, earned: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with improved gradient */}
      <div className="bg-gradient-to-br from-primary via-primary-glow to-accent text-white p-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Welcome back, {userData?.name}! 👋
              </h1>
              <p className="text-white/90 flex items-center">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mr-3">
                  {userData?.userType === 'employee' ? 'Municipal Employee' : 
                   userData?.userType === 'waste-collector' ? 'Waste Collector' :
                   userData?.userType === 'student' ? 'Student' : 
                   userData?.userType === 'community-leader' ? 'Community Leader' : 'Eco Citizen'}
                </Badge>
                ID: {userData?.userId}
              </p>
            </div>
            <div className="text-right animate-scale-in">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
                <Award className="mr-2 h-4 w-4" />
                Level 3 Complete
              </Badge>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-up">
            <Card className="bg-white/15 backdrop-blur-sm border-white/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-5 w-5 mr-2" />
                  <div className="text-2xl font-bold text-white">{currentPoints}</div>
                </div>
                <div className="text-white/90 text-sm">Total Points</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/15 backdrop-blur-sm border-white/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 mr-2 text-yellow-300" />
                  <div className="text-2xl font-bold text-white">{streak}</div>
                </div>
                <div className="text-white/90 text-sm">Day Streak</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/15 backdrop-blur-sm border-white/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <div className="text-2xl font-bold text-white">#4</div>
                </div>
                <div className="text-white/90 text-sm">District Rank</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/15 backdrop-blur-sm border-white/30 hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-5 w-5 mr-2" />
                  <div className="text-2xl font-bold text-white">{Math.round((weeklyProgress/weeklyGoal)*100)}%</div>
                </div>
                <div className="text-white/90 text-sm">Weekly Goal</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-eco transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center" onClick={action.action}>
                      <div className={`mx-auto mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        action.color === 'eco' ? 'bg-primary/10 text-primary hover:bg-primary/20' :
                        action.color === 'sky' ? 'bg-accent/10 text-accent hover:bg-accent/20' :
                        action.color === 'warning' ? 'bg-warning/10 text-warning hover:bg-warning/20' :
                        'bg-success/10 text-success hover:bg-success/20'
                      }`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Weekly Goal Progress
                </CardTitle>
                <CardDescription>
                  You're {weeklyGoal - weeklyProgress} points away from your weekly target
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{weeklyProgress} / {weeklyGoal} points</span>
                  </div>
                  <Progress value={(weeklyProgress/weeklyGoal)*100} className="progress-bar" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>This week</span>
                    <span>{Math.round((weeklyProgress/weeklyGoal)*100)}% complete</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned ? 'bg-success/10 text-success' : 'bg-muted/30 text-muted-foreground'
                    }`}>
                      <div className={`p-2 rounded-full ${
                        achievement.earned ? 'bg-success/20' : 'bg-muted'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm opacity-80">{achievement.description}</p>
                      </div>
                      {achievement.earned && <CheckCircle className="h-5 w-5 ml-auto" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            {/* Events Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                  <CardDescription>
                    Waste management events in your area
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Community Clean-Up Drive",
                        date: "Tomorrow, 8:00 AM",
                        location: "Central Park, Sector 5",
                        organizer: "Municipal Corporation",
                        participants: 45,
                        type: "Cleanup"
                      },
                      {
                        title: "Composting Workshop",
                        date: "Oct 15, 2:00 PM",
                        location: "Community Center, Block A",
                        organizer: "Green Initiative Group",
                        participants: 23,
                        type: "Workshop"
                      },
                      {
                        title: "E-Waste Collection",
                        date: "Oct 18, 10:00 AM",
                        location: "Municipal Office Parking",
                        organizer: "Eco Tech Solutions",
                        participants: 67,
                        type: "Collection"
                      },
                      {
                        title: "Plastic Free Awareness",
                        date: "Oct 22, 6:00 PM",
                        location: "Shopping Mall Food Court",
                        organizer: "Youth Environmental Club",
                        participants: 89,
                        type: "Awareness"
                      }
                    ].map((event, index) => (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm">{event.title}</h3>
                          <Badge variant="outline" className={`text-xs ${
                            event.type === 'Cleanup' ? 'border-success text-success' :
                            event.type === 'Workshop' ? 'border-warning text-warning' :
                            event.type === 'Collection' ? 'border-accent text-accent' :
                            'border-primary text-primary'
                          }`}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.date}
                          </p>
                          <p className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {event.location}
                          </p>
                          <p className="text-xs">Organized by {event.organizer}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {event.participants} participants
                          </span>
                          <Button variant="outline" size="sm" className="text-xs h-7">
                            Join Event
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Schedule New Event */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule New Event
                  </CardTitle>
                  <CardDescription>
                    Organize a waste management event in your community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Event Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { type: "Clean-up Drive", icon: "🧹", color: "success" },
                          { type: "Workshop", icon: "🎓", color: "warning" },
                          { type: "Collection", icon: "♻️", color: "accent" },
                          { type: "Awareness", icon: "📢", color: "primary" }
                        ].map((eventType, index) => (
                          <Button key={index} variant="outline" className="justify-start h-12">
                            <span className="mr-2 text-lg">{eventType.icon}</span>
                            <span className="text-sm">{eventType.type}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quick Templates</label>
                      <div className="space-y-2">
                        {[
                          "Neighborhood Clean-up (Weekend)",
                          "Home Composting Training",
                          "Electronic Waste Drive",
                          "Plastic Awareness Campaign"
                        ].map((template, index) => (
                          <Button key={index} variant="ghost" size="sm" className="justify-start w-full text-left">
                            <span className="text-sm text-muted-foreground">{template}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="w-full">
                        <Calendar className="mr-2 h-4 w-4" />
                        Create Custom Event
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Events require approval from local authorities
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Recent Activity Summary
                </CardTitle>
                <CardDescription>
                  Your latest contributions to waste management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Leaf className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.type}</p>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="bg-success">
                          +{activity.points} pts
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Continue Learning</h2>
              <p className="text-muted-foreground">
                Access comprehensive waste management education and interactive games
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Core Training
                  </CardTitle>
                  <CardDescription>
                    Complete the 3-level mandatory training program
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>2/3 levels</span>
                    </div>
                    <Progress value={67} className="h-2" />
                    <Button asChild className="w-full">
                      <Link to="/learning">Continue Training</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Gamepad2 className="mr-2 h-5 w-5" />
                    Learning Games
                  </CardTitle>
                  <CardDescription>
                    Play interactive games to reinforce your knowledge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Games Played</span>
                      <span>12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Points Earned</span>
                      <span>850 pts</span>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/learning">Play Games</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    Specialized Courses
                  </CardTitle>
                  <CardDescription>
                    Role-specific training for your user type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="outline" className="w-full justify-center">
                      {userData?.userType === 'employee' ? 'Municipal Employee' : 'Eco Citizen'} Courses
                    </Badge>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/learning">Explore Courses</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">67%</div>
                    <div className="text-sm text-muted-foreground">Training Complete</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">12</div>
                    <div className="text-sm text-muted-foreground">Games Played</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">5</div>
                    <div className="text-sm text-muted-foreground">Certificates Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">850</div>
                    <div className="text-sm text-muted-foreground">Learning Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  District Leaderboard
                </CardTitle>
                <CardDescription>
                  Top contributors in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((user, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
                      user.isUser ? 'bg-primary/10 border border-primary/30' : 'bg-muted/30'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          user.rank === 1 ? 'bg-yellow-500 text-white' :
                          user.rank === 2 ? 'bg-gray-400 text-white' :
                          user.rank === 3 ? 'bg-amber-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {user.rank}
                        </div>
                        <div>
                          <p className="font-medium">{user.name} {user.isUser && '(You)'}</p>
                          <p className="text-sm text-muted-foreground">{user.district}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{user.points} pts</p>
                        {user.rank <= 3 && (
                          <Badge variant="secondary" className="text-xs">
                            Top {user.rank}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Redeem Rewards
                </CardTitle>
                <CardDescription>
                  Use your {currentPoints} points for amazing benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { title: "Metro Discount", points: 500, description: "₹50 off on metro travel", type: "Transport" },
                    { title: "Movie Ticket", points: 800, description: "Free movie ticket", type: "Entertainment" },
                    { title: "Utility Bill", points: 1000, description: "₹100 off electricity bill", type: "Utility" },
                    { title: "Eco Kit", points: 1200, description: "Home composting kit", type: "Product" },
                    { title: "Plant Sapling", points: 300, description: "Free plant for your home", type: "Environment" },
                    { title: "Shopping Voucher", points: 1500, description: "₹200 shopping voucher", type: "Shopping" }
                  ].map((reward, index) => (
                    <Card key={index} className="hover:shadow-eco transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="mb-3">
                          <Badge variant="outline" className="text-xs">{reward.type}</Badge>
                        </div>
                        <h3 className="font-semibold mb-2">{reward.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">{reward.points} pts</span>
                          <Button 
                            variant={currentPoints >= reward.points ? "eco" : "outline"} 
                            size="sm"
                            disabled={currentPoints < reward.points}
                          >
                            {currentPoints >= reward.points ? "Redeem" : "Not enough"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Modal Components */}
      <QRScanner 
        isOpen={showQRScanner} 
        onClose={() => setShowQRScanner(false)}
        onPointsEarned={handlePointsEarned}
      />
      
      <WasteTracking 
        isOpen={showWasteTracking} 
        onClose={() => setShowWasteTracking(false)}
      />
      
      <ReportingSystem 
        isOpen={showReporting} 
        onClose={() => setShowReporting(false)}
        onPointsEarned={handlePointsEarned}
      />
      
      <EWasteDay 
        isOpen={showEWasteDay} 
        onClose={() => setShowEWasteDay(false)}
      />
      
      <WasteChatbot />
    </div>
  );
};

export default Dashboard;