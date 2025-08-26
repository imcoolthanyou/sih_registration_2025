import { useEffect, useState } from 'react';
import { Shield, Users, User, Trash2, Edit, Download, Plus, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getSkillColor } from '@/utils/skills';
import { useApi } from '@/lib/api';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ADMIN_PASSWORD = "sih2025admin"; // In a real app, this should be in environment variables

const AdminPanel = () => {
  const { toast } = useToast();
  const api = useApi();
  const [teams, setTeams] = useState<any[]>([]);
  const [individuals, setIndividuals] = useState<any[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [registrationDeadline, setRegistrationDeadline] = useState<Date | undefined>(new Date());
  const [isRegistrationEnabled, setIsRegistrationEnabled] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(true);
  const [password, setPassword] = useState("");
  const [stats, setStats] = useState({
    totalTeams: 0,
    totalIndividuals: 0,
    totalParticipants: 0
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load teams and individuals
        const [teamsData, individualsData] = await Promise.all([
          api.getTeams(),
          api.getIndividuals()
        ]);
        setTeams(teamsData);
        setIndividuals(individualsData);
        setStats({
          totalTeams: teamsData.length,
          totalIndividuals: individualsData.length,
          totalParticipants: teamsData.reduce((acc, team) => acc + (team.members?.length || 0) + 1, 0) + individualsData.length
        });
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive"
        });
      }
    };

    // Load registration settings
    const loadSettings = async () => {
      try {
        const settings = await api.getRegistrationSettings();
        setRegistrationDeadline(new Date(settings.registrationDeadline));
        setIsRegistrationEnabled(settings.isRegistrationEnabled);
      } catch (error) {
        console.error('Error loading settings:', error);
        toast({
          title: "Error",
          description: "Failed to load registration settings.",
          variant: "destructive"
        });
      }
    };

    loadData();
    loadSettings();

    // CSS Animation stagger effect
    const elements = document.querySelectorAll('.admin-item');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.remove('opacity-0');
        el.classList.add('animate-fade-in');
      }, index * 150);
    });
  }, []);

  const deleteTeam = (teamId: number) => {
    if (confirm('Are you sure you want to delete this team?')) {
      setTeams(teams.filter(team => team.id !== teamId));
      toast({
        title: "Team Deleted",
        description: "Team has been successfully deleted.",
      });
    }
  };

  const deleteIndividual = (individualId: number) => {
    if (confirm('Are you sure you want to delete this individual registration?')) {
      setIndividuals(individuals.filter(individual => individual.id !== individualId));
      toast({
        title: "Registration Deleted",
        description: "Individual registration has been successfully deleted.",
      });
    }
  };

  // Load registration settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await api.getRegistrationSettings();
        setRegistrationDeadline(new Date(settings.registrationDeadline));
        setIsRegistrationEnabled(settings.isRegistrationEnabled);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load registration settings.",
          variant: "destructive",
        });
      }
    };
    loadSettings();
  }, []);

  const handleClearData = async () => {
    try {
      await api.clearAllData();
      toast({
        title: "Success",
        description: "All registration data has been cleared.",
      });
      // Refetch the data
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to clear data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const saveRegistrationSettings = async () => {
    if (!registrationDeadline) {
      toast({
        title: "Error",
        description: "Please select a registration deadline.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Set the time to end of day (23:59:59.999) and convert to UTC
      const deadline = new Date(registrationDeadline);
      deadline.setHours(23, 59, 59, 999);
      
      console.log('Selected deadline:', deadline);
      const utcDeadline = new Date(Date.UTC(
        deadline.getFullYear(),
        deadline.getMonth(),
        deadline.getDate(),
        23, 59, 59, 999
      ));
      console.log('UTC deadline:', utcDeadline);
      
      await api.updateRegistrationSettings({
        registrationDeadline: utcDeadline.toISOString(),
        isRegistrationEnabled,
      });
      toast({
        title: "Success",
        description: "Registration settings updated successfully.",
      });
      setIsSettingsOpen(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to update registration settings.",
        variant: "destructive",
      });
    }
  };

  const exportData = (data: any[], filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(jsonStr);
    
    const exportFileDefaultName = filename;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setShowLoginDialog(false);
      toast({
        title: "Success",
        description: "Successfully logged in to admin panel.",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-12">
        <div className="container mx-auto px-4">
          <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Admin Authentication Required</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col gap-4">
                  <Label htmlFor="password">Password</Label>
                  <input
                    id="password"
                    type="password"
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleLogin();
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleLogin}>Login</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-destructive/10 rounded-full">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <p className="text-muted-foreground">Manage SIH 2025 registrations</p>
              </div>
            </div>

            {/* Stats Cards */}
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Clear All Data
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete all registered teams and individuals.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearData}>
                      Yes, delete everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                variant="outline"
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Registration Settings
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Teams</p>
                      <p className="text-3xl font-bold text-primary">{stats.totalTeams}</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              {/* Registration Settings Dialog */}
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Registration Settings</DialogTitle>
                  </DialogHeader>
                  <div className="py-6">
                    <div className="space-y-6">
                      <div>
                        <Label className="mb-2 block">Registration Deadline</Label>
                        <CalendarPicker
                          mode="single"
                          selected={registrationDeadline}
                          onSelect={(date) => {
                            if (date) {
                              // Set time to end of the day (23:59:59)
                              const endOfDay = new Date(date);
                              endOfDay.setHours(23, 59, 59, 999);
                              setRegistrationDeadline(endOfDay);
                            }
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="rounded-md border"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="registration-enabled"
                          checked={isRegistrationEnabled}
                          onCheckedChange={setIsRegistrationEnabled}
                        />
                        <Label htmlFor="registration-enabled">Enable Registration</Label>
                      </div>

                      {registrationDeadline && (
                        <p className="text-sm text-muted-foreground">
                          Registration will {isRegistrationEnabled ? 'be open' : 'remain closed'} until{' '}
                          {registrationDeadline.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })} at 11:59 PM
                        </p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveRegistrationSettings}>
                      Save Settings
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Individuals</p>
                      <p className="text-3xl font-bold text-accent">{stats.totalIndividuals}</p>
                    </div>
                    <User className="h-8 w-8 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
                      <p className="text-3xl font-bold text-skill-frontend">{stats.totalParticipants}</p>
                    </div>
                    <Shield className="h-8 w-8 text-skill-frontend" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Management Tabs */}
          <Tabs defaultValue="teams" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="teams">Manage Teams</TabsTrigger>
              <TabsTrigger value="individuals">Manage Individuals</TabsTrigger>
            </TabsList>

            {/* Teams Management */}
            <TabsContent value="teams" className="space-y-6">
              <div className="flex justify-between items-center admin-item opacity-0">
                <h2 className="text-2xl font-semibold">Registered Teams</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => exportData(teams, 'teams_export.json')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export JSON
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {teams.map((team) => (
                  <Card key={team.id} className="admin-item opacity-0">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {team.teamName}
                          <Badge variant="outline">{team.members.length + 1}/6 members</Badge>
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deleteTeam(team.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">Team Leader</h4>
                          <p className="font-medium">{team.leaderName}</p>
                          <p className="text-sm text-muted-foreground">{team.leaderYear} • {team.leaderBranch}</p>
                          <p className="text-sm text-muted-foreground">📞 {team.leaderPhone}</p>
                          {team.leaderDiscord && (
                            <p className="text-sm text-muted-foreground">💬 {team.leaderDiscord}</p>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">Registration Date</h4>
                          <p className="text-sm">{new Date(team.registeredAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Leader Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {team.leaderSkills.map((skill) => (
                            <span
                              key={skill}
                              className={`skill-tag ${getSkillColor(skill)}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Team Members</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {team.members.map((member, index) => (
                            <div key={index} className="text-sm p-2 bg-muted/30 rounded">
                              <span className="font-medium">{member.name}</span>
                              <br />
                              <span className="text-muted-foreground">{member.year} • {member.branch}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Individuals Management */}
            <TabsContent value="individuals" className="space-y-6">
              <div className="flex justify-between items-center admin-item opacity-0">
                <h2 className="text-2xl font-semibold">Individual Registrations</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => exportData(individuals, 'individuals_export.json')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export JSON
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {individuals.map((individual) => (
                  <Card key={individual.id} className="admin-item opacity-0">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{individual.name}</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => deleteIndividual(individual.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-muted-foreground">{individual.year} • {individual.branch}</p>
                        <p className="text-sm text-muted-foreground">📞 {individual.contactNumber}</p>
                        {individual.discord && (
                          <p className="text-sm text-muted-foreground">💬 {individual.discord}</p>
                        )}
                        {individual.github && (
                          <p className="text-sm text-muted-foreground">🔗 {individual.github}</p>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {individual.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`skill-tag ${getSkillColor(skill)}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div>
                          {individual.hasDeployedSoftware && (
                            <div className="flex items-center gap-2 text-skill-frontend">
                              <div className="w-2 h-2 bg-skill-frontend rounded-full"></div>
                              <span>Has deployed software</span>
                            </div>
                          )}
                        </div>
                        <div className="text-muted-foreground">
                          {new Date(individual.registeredAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;