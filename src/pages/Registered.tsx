import { useEffect, useState } from 'react';
import { Search, Users, User, Copy, MessageSquare, Github, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getSkillColor } from '@/utils/skills';

// Mock data - Complete and visible data for testing
const mockTeams = [
  {
    id: 1,
    teamName: "Code Warriors",
    leaderName: "Rahul Sharma",
    leaderYear: "3rd Year",
    leaderBranch: "Computer Science & Engineering",
    leaderSkills: ["React", "Node.js", "Python", "Machine Learning"],
    members: [
      { name: "Priya Singh", year: "3rd Year", branch: "CSE", skills: ["React", "UI/UX Design"] },
      { name: "Amit Kumar", year: "2nd Year", branch: "IT", skills: ["Python", "Data Science"] },
      { name: "Neha Gupta", year: "3rd Year", branch: "CSE", skills: ["JavaScript", "Frontend"] },
      { name: "Karan Joshi", year: "2nd Year", branch: "IT", skills: ["Java", "Backend"] },
      { name: "Aisha Khan", year: "Final Year", branch: "CSE", skills: ["DevOps", "Cloud"] }
    ]
  },
  {
    id: 2,
    teamName: "Innovation Hub",
    leaderName: "Sneha Patel",
    leaderYear: "Final Year",
    leaderBranch: "Information Technology",
    leaderSkills: ["Flutter", "Firebase", "AI/ML", "Cloud Computing"],
    members: [
      { name: "Vikash Roy", year: "3rd Year", branch: "CSE", skills: ["Android", "Kotlin"] },
      { name: "Anjali Gupta", year: "2nd Year", branch: "IT", skills: ["Backend Development", "Java"] },
      { name: "Rohit Sharma", year: "3rd Year", branch: "IT", skills: ["React Native", "Mobile"] },
      { name: "Pooja Verma", year: "Final Year", branch: "CSE", skills: ["AI/ML", "Python"] },
      { name: "Arjun Yadav", year: "2nd Year", branch: "IT", skills: ["Database", "SQL"] }
    ]
  },
  {
    id: 3,
    teamName: "Tech Titans",
    leaderName: "Aditya Singh",
    leaderYear: "Final Year",
    leaderBranch: "MCA",
    leaderSkills: ["Full Stack", "MERN", "DevOps", "AWS"],
    members: [
      { name: "Ravi Kumar", year: "3rd Year", branch: "MCA", skills: ["React", "Express"] },
      { name: "Sonia Agarwal", year: "2nd Year", branch: "BCA", skills: ["UI/UX", "Figma"] },
      { name: "Deepak Tiwari", year: "Final Year", branch: "MCA", skills: ["MongoDB", "Node.js"] },
      { name: "Kritika Jain", year: "3rd Year", branch: "IT", skills: ["Testing", "QA"] },
      { name: "Mohit Gupta", year: "2nd Year", branch: "CSE", skills: ["Docker", "Kubernetes"] }
    ]
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
    deploymentLink: "https://my-portfolio.com"
  },
  {
    id: 2,
    name: "Kavya Sharma",
    year: "3rd Year",
    branch: "Information Technology",
    skills: ["Flutter", "Dart", "Firebase", "UI/UX Design"],
    contactNumber: "8765432109",
    github: "https://github.com/kavyasharma",
    discord: "kavya_dev#4567",
    hasDeployedSoftware: true,
    deploymentLink: "https://play.google.com/store/apps/details?id=com.kavya.app"
  },
  {
    id: 3,
    name: "Arjun Singh",
    year: "Final Year",
    branch: "MCA",
    skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
    contactNumber: "7654321098",
    github: "https://github.com/arjunsingh",
    discord: "arjun_ml#5678",
    hasDeployedSoftware: false,
    deploymentLink: null
  },
  {
    id: 4,
    name: "Priyanka Joshi",
    year: "2nd Year",
    branch: "BCA",
    skills: ["Java", "Spring Boot", "MySQL", "API Development"],
    contactNumber: "9123456780",
    github: "https://github.com/priyankajoshi",
    discord: "priya_codes#9876",
    hasDeployedSoftware: true,
    deploymentLink: "https://priyanka-api.herokuapp.com"
  },
  {
    id: 5,
    name: "Sahil Agarwal",
    year: "3rd Year",
    branch: "Computer Science & Engineering",
    skills: ["Android", "Kotlin", "Firebase", "Material Design"],
    contactNumber: "8567432190",
    github: "https://github.com/sahilagarwal",
    discord: null,
    hasDeployedSoftware: true,
    deploymentLink: "https://play.google.com/store/apps/details?id=com.sahil.notes"
  },
  {
    id: 6,
    name: "Nikita Verma",
    year: "Final Year",
    branch: "Information Technology",
    skills: ["Cybersecurity", "Ethical Hacking", "Network Security", "Python"],
    contactNumber: "7890123456",
    github: "https://github.com/nikitaverma",
    discord: "nikita_security#2468",
    hasDeployedSoftware: false,
    deploymentLink: null
  }
];

const Registered = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [teams, setTeams] = useState(mockTeams);
  const [individuals, setIndividuals] = useState(mockIndividuals);

  useEffect(() => {
    // CSS Animation stagger effect
    const elements = document.querySelectorAll('.registered-item');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.remove('opacity-0');
        el.classList.add('animate-fade-in');
      }, index * 150);
    });
  }, []);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const contactIndividual = (individual: any) => {
    if (individual.discord) {
      // Show contact modal or direct message
      toast({
        title: "Contact Information",
        description: `Discord: ${individual.discord}`,
      });
    } else {
      toast({
        title: "No Contact Info",
        description: "This person hasn't provided contact information for team formation.",
        variant: "destructive",
      });
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    // Basic CSV export functionality
    const csvContent = "data:text/csv;charset=utf-8," 
      + data.map(item => Object.values(item).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter functions
  const filteredTeams = teams.filter(team =>
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.leaderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIndividuals = individuals.filter(individual =>
    individual.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (skillFilter === 'all' || individual.skills.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    )) &&
    (branchFilter === 'all' || individual.branch === branchFilter)
  );

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 registered-item opacity-0">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-skill-frontend/10 rounded-full mb-6">
              <Users className="h-8 w-8 text-skill-frontend" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Registered Participants</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse registered teams and individuals looking for teammates
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 registered-item opacity-0">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teams or individuals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="machine learning">Machine Learning</SelectItem>
                  <SelectItem value="flutter">Flutter</SelectItem>
                </SelectContent>
              </Select>
              <Select value={branchFilter} onValueChange={setBranchFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="Computer Science & Engineering">CSE</SelectItem>
                  <SelectItem value="Information Technology">IT</SelectItem>
                  <SelectItem value="MCA">MCA</SelectItem>
                  <SelectItem value="BCA">BCA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="teams" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="teams" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Registered Teams ({filteredTeams.length})
              </TabsTrigger>
              <TabsTrigger value="individuals" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Looking for Teams ({filteredIndividuals.length})
              </TabsTrigger>
            </TabsList>

            {/* Teams Tab */}
            <TabsContent value="teams" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Registered Teams</h2>
                <Button 
                  variant="outline" 
                  onClick={() => exportToCSV(teams, 'registered_teams.csv')}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredTeams.map((team) => (
                  <Card key={team.id} className="registered-item opacity-0">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{team.teamName}</span>
                        <Badge variant="outline">{team.members.length + 1}/6 members</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Team Leader</h4>
                        <p className="font-medium">{team.leaderName}</p>
                        <p className="text-sm text-muted-foreground">{team.leaderYear} • {team.leaderBranch}</p>
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
                        <div className="space-y-2">
                          {team.members.slice(0, 2).map((member, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{member.name}</span>
                              <span className="text-muted-foreground"> • {member.year} • {member.branch}</span>
                            </div>
                          ))}
                          {team.members.length > 2 && (
                            <p className="text-sm text-muted-foreground">
                              +{team.members.length - 2} more members
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Individuals Tab */}
            <TabsContent value="individuals" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Looking for Teams</h2>
                <Button 
                  variant="outline" 
                  onClick={() => exportToCSV(individuals, 'individuals_looking_for_teams.csv')}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIndividuals.map((individual) => (
                  <Card key={individual.id} className="registered-item opacity-0 group hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">{individual.name}</h3>
                          <p className="text-muted-foreground">{individual.year} • {individual.branch}</p>
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

                        {individual.hasDeployedSoftware && (
                          <div className="flex items-center gap-2 text-sm text-skill-frontend">
                            <div className="w-2 h-2 bg-skill-frontend rounded-full"></div>
                            <span>Has deployed software</span>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          {individual.github && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(individual.github, '_blank')}
                              className="flex-1"
                            >
                              <Github className="h-4 w-4 mr-1" />
                              GitHub
                            </Button>
                          )}
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => contactIndividual(individual)}
                            className="flex-1"
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Contact
                          </Button>
                        </div>

                        {individual.discord && (
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MessageSquare className="h-3 w-3" />
                            <span className="flex-1">{individual.discord}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(individual.discord!, 'Discord handle')}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
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

export default Registered;