import { useEffect, useState } from 'react';
import { Shield, Users, User, Trash2, Edit, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getSkillColor } from '@/utils/skills';

// Mock data - same as Registered page but with admin actions
const mockTeams = [
  {
    id: 1,
    teamName: "Code Warriors",
    leaderName: "Rahul Sharma",
    leaderYear: "3rd Year",
    leaderBranch: "Computer Science & Engineering",
    leaderPhone: "9876543210",
    leaderDiscord: "rahul#1234",
    leaderSkills: ["React", "Node.js", "Python", "Machine Learning"],
    members: [
      { name: "Priya Singh", year: "3rd Year", branch: "CSE", skills: ["React", "UI/UX Design"] },
      { name: "Amit Kumar", year: "2nd Year", branch: "IT", skills: ["Python", "Data Science"] },
    ],
    registeredAt: "2025-01-15T10:30:00Z"
  }
];

const mockIndividuals = [
  {
    id: 1,
    name: "Rohan Mehta",
    year: "2nd Year",
    branch: "Computer Science & Engineering",
    skills: ["React", "JavaScript", "Node.js", "MongoDB"],
    contactNumber: "9876543210",
    github: "https://github.com/rohanmehta",
    discord: "rohan#1234",
    hasDeployedSoftware: true,
    deploymentLink: "https://my-portfolio.com",
    registeredAt: "2025-01-14T15:45:00Z"
  }
];

const AdminPanel = () => {
  const { toast } = useToast();
  const [teams, setTeams] = useState(mockTeams);
  const [individuals, setIndividuals] = useState(mockIndividuals);
  const [stats, setStats] = useState({
    totalTeams: mockTeams.length,
    totalIndividuals: mockIndividuals.length,
    totalParticipants: mockTeams.reduce((acc, team) => acc + team.members.length + 1, 0) + mockIndividuals.length
  });

  useEffect(() => {
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

  const exportData = (data: any[], filename: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(jsonStr);
    
    const exportFileDefaultName = filename;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 admin-item opacity-0">
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