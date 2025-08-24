import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { ArrowRight, Users, Github, Phone, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import SkillSelector from '@/components/SkillSelector';
import { branchOptions, yearOptions } from '@/utils/skills';

interface TeamMember {
  name: string;
  year: string;
  branch: string;
  skills: string[];
  github?: string;
}

interface TeamFormData {
  teamName: string;
  leaderName: string;
  leaderYear: string;
  leaderBranch: string;
  leaderGithub?: string;
  leaderSkills: string[];
  leaderPhone: string;
  leaderDiscord?: string;
  members: TeamMember[];
}

const TeamRegistration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<TeamFormData>({
    defaultValues: {
      teamName: '',
      leaderName: '',
      leaderYear: '',
      leaderBranch: '',
      leaderGithub: '',
      leaderSkills: [],
      leaderPhone: '',
      leaderDiscord: '',
      members: Array(5).fill(0).map(() => ({
        name: '',
        year: '',
        branch: '',
        skills: [],
        github: ''
      }))
    }
  });

  const { fields } = useFieldArray({
    control,
    name: 'members'
  });

  useEffect(() => {
    // CSS Animation stagger effect
    const elements = document.querySelectorAll('.form-section');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.remove('opacity-0');
        el.classList.add('animate-fade-in');
      }, index * 200);
    });
  }, []);

  const onSubmit = async (data: TeamFormData) => {
    setIsSubmitting(true);
    
    // Validate that all members have required information
    const incompleteMembers = data.members.filter(member => 
      !member.name || !member.year || !member.branch || member.skills.length === 0
    );

    if (incompleteMembers.length > 0) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required information for all team members.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically send data to your backend
      console.log('Team Registration Data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "Your team has been registered successfully.",
      });

      // Reset form or redirect
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 form-section">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Team Registration</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Register your complete team of 6 members for Smart India Hackathon 2025
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Team Information */}
            <Card className="form-section opacity-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="teamName">Team Name *</Label>
                    <Input
                      id="teamName"
                      {...register('teamName', { required: 'Team name is required' })}
                      placeholder="Enter your team name"
                      className="mt-1"
                    />
                    {errors.teamName && (
                      <p className="text-destructive text-sm mt-1">{errors.teamName.message}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Leader Information */}
            <Card className="form-section opacity-0">
              <CardHeader>
                <CardTitle>Team Leader Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="leaderName">Leader Name *</Label>
                    <Input
                      id="leaderName"
                      {...register('leaderName', { required: 'Leader name is required' })}
                      placeholder="Enter leader name"
                      className="mt-1"
                    />
                    {errors.leaderName && (
                      <p className="text-destructive text-sm mt-1">{errors.leaderName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="leaderYear">Year *</Label>
                    <Select onValueChange={(value) => setValue('leaderYear', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((year) => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="leaderBranch">Branch *</Label>
                    <Select onValueChange={(value) => setValue('leaderBranch', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branchOptions.map((branch) => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="leaderGithub">
                      <Github className="inline h-4 w-4 mr-1" />
                      GitHub Profile (Optional)
                    </Label>
                    <Input
                      id="leaderGithub"
                      {...register('leaderGithub')}
                      placeholder="https://github.com/username"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="leaderPhone">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone Number *
                    </Label>
                    <Input
                      id="leaderPhone"
                      {...register('leaderPhone', { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Please enter a valid 10-digit phone number'
                        }
                      })}
                      placeholder="1234567890"
                      className="mt-1"
                    />
                    {errors.leaderPhone && (
                      <p className="text-destructive text-sm mt-1">{errors.leaderPhone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="leaderDiscord">
                      <MessageSquare className="inline h-4 w-4 mr-1" />
                      Discord (Optional)
                    </Label>
                    <Input
                      id="leaderDiscord"
                      {...register('leaderDiscord')}
                      placeholder="username#1234"
                      className="mt-1"
                    />
                  </div>
                </div>

                <SkillSelector
                  selectedSkills={watch('leaderSkills')}
                  onSkillsChange={(skills) => setValue('leaderSkills', skills)}
                />
              </CardContent>
            </Card>

            {/* Team Members */}
            {fields.map((field, index) => (
              <Card key={field.id} className="form-section opacity-0">
                <CardHeader>
                  <CardTitle>Team Member {index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor={`members.${index}.name`}>Name *</Label>
                      <Input
                        {...register(`members.${index}.name`, { required: 'Name is required' })}
                        placeholder="Enter member name"
                        className="mt-1"
                      />
                      {errors.members?.[index]?.name && (
                        <p className="text-destructive text-sm mt-1">{errors.members[index]?.name?.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`members.${index}.year`}>Year *</Label>
                      <Select onValueChange={(value) => setValue(`members.${index}.year`, value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {yearOptions.map((year) => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`members.${index}.branch`}>Branch *</Label>
                      <Select onValueChange={(value) => setValue(`members.${index}.branch`, value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branchOptions.map((branch) => (
                            <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor={`members.${index}.github`}>
                        <Github className="inline h-4 w-4 mr-1" />
                        GitHub (Optional)
                      </Label>
                      <Input
                        {...register(`members.${index}.github`)}
                        placeholder="https://github.com/username"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <SkillSelector
                    selectedSkills={watch(`members.${index}.skills`) || []}
                    onSkillsChange={(skills) => setValue(`members.${index}.skills`, skills)}
                  />
                </CardContent>
              </Card>
            ))}

            {/* Submit Button */}
            <div className="text-center form-section opacity-0">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 text-lg font-semibold min-w-48"
              >
                {isSubmitting ? (
                  'Registering...'
                ) : (
                  <>
                    Register Team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistration;