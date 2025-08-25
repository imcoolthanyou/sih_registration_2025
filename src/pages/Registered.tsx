import { useEffect, useState } from 'react';
import { Search, Users, User, Copy, MessageSquare, Github, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getSkillColor } from '@/utils/skills';
import { useApi } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

// No mock data or localStorage loading. Real data should be provided externally (API or manual import).

const Registered = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('all');
  const [branchFilter, setBranchFilter] = useState('all');

  const api = useApi();

  // Fetch teams data
  const { data: teams = [], isLoading: isLoadingTeams, error: teamsError } = useQuery({
    queryKey: ['teams'],
    queryFn: () => api.getTeams(),
  });

  // Fetch and filter individuals data
  const { data: individuals = [], isLoading: isLoadingIndividuals, error: individualsError } = useQuery({
    queryKey: ['individuals', searchTerm, skillFilter, branchFilter],
    queryFn: () => api.searchParticipants(searchTerm, skillFilter, branchFilter)
  });

  // Log status
  useEffect(() => {
    console.log('Query Status:', {
      teams: { loading: isLoadingTeams, error: teamsError, count: teams.length },
      individuals: { loading: isLoadingIndividuals, error: individualsError, count: individuals.length }
    });
  }, [teams, individuals, isLoadingTeams, isLoadingIndividuals, teamsError, individualsError]);

  // Loading state UI helper
  const isLoading = isLoadingTeams || isLoadingIndividuals;

  // Fade in effect for registered items
  useEffect(() => {
    // Update count in document title
    if (typeof document !== 'undefined') {
      document.title = `Registered (${individuals.length} individuals)`;
      
      // Add loaded class to trigger animations with a stagger
      const items = document.querySelectorAll('.registered-item');
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('loaded');
        }, index * 100); // Stagger each item by 100ms
      });
    }
  }, [individuals, teams]);

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
    (team.teamName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (team.leaderName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Less restrictive filtering for individuals
  const filteredIndividuals = individuals.filter(individual =>
    (individual.name || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
    (skillFilter === 'all' || (Array.isArray(individual.skills) && individual.skills.some((skill: string) => 
      (skill || '').toLowerCase().includes(skillFilter.toLowerCase())
    ))) &&
    (branchFilter === 'all' || (individual.branch || '').toLowerCase() === branchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-skill-frontend/10 rounded-full mb-6">
              <Users className="h-8 w-8 text-skill-frontend" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Registered Participants</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse registered teams and individuals looking for teammates
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
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

            {/* Content starts directly here */}
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
                  <Card key={team.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                                <span>{team.teamName}</span>
                                <Badge variant="outline">{((team.members || []).length) + 1}/6 members</Badge>
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
                          {(team.leaderSkills || []).map((skill) => (
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
                          {(team.members || []).slice(0, 2).map((member, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium">{member.name}</span>
                              <span className="text-muted-foreground"> • {member.year} • {member.branch}</span>
                            </div>
                          ))}
                          {((team.members || []).length > 2) && (
                            <p className="text-sm text-muted-foreground">
                              +{(team.members || []).length - 2} more members
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
              
              {/* Debug info */}
              {filteredIndividuals.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No individuals found. Total count: {individuals.length}</p>
                  <p className="text-sm mt-2">
                    Filters: {searchTerm ? `Search: "${searchTerm}", ` : ''}
                    Branch: {branchFilter}, Skills: {skillFilter}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Individual cards */}
                {filteredIndividuals.map((individual) => (
                  <Card key={individual.id} className="group hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">{individual.name}</h3>
                          <p className="text-muted-foreground">{individual.year} • {individual.branch}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {(individual.skills || []).map((skill) => (
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