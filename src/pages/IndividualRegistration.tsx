import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, User, Github, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import SkillSelector from '@/components/SkillSelector';
import { branchOptions, yearOptions } from '@/utils/skills';

interface IndividualFormData {
  name: string;
  year: string;
  branch: string;
  skills: string[];
  contactNumber: string;
  github?: string;
  discord?: string;
  hasDeployedSoftware: boolean;
  deploymentLink?: string;
}

const IndividualRegistration = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<IndividualFormData>({
    defaultValues: {
      name: '',
      year: '',
      branch: '',
      skills: [],
      contactNumber: '',
      github: '',
      discord: '',
      hasDeployedSoftware: false,
      deploymentLink: ''
    }
  });

  const watchedSkills = watch('skills');
  const watchedHasDeployed = watch('hasDeployedSoftware');

  // Check if user has software development skills
  const hasSoftwareSkills = watchedSkills.some(skill => 
    skill.toLowerCase().includes('react') ||
    skill.toLowerCase().includes('javascript') ||
    skill.toLowerCase().includes('python') ||
    skill.toLowerCase().includes('java') ||
    skill.toLowerCase().includes('node') ||
    skill.toLowerCase().includes('angular') ||
    skill.toLowerCase().includes('vue') ||
    skill.toLowerCase().includes('flutter') ||
    skill.toLowerCase().includes('android') ||
    skill.toLowerCase().includes('ios') ||
    skill.toLowerCase().includes('web') ||
    skill.toLowerCase().includes('app') ||
    skill.toLowerCase().includes('software') ||
    skill.toLowerCase().includes('programming') ||
    skill.toLowerCase().includes('coding') ||
    skill.toLowerCase().includes('development')
  );

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

  const onSubmit = async (data: IndividualFormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send data to your backend
      console.log('Individual Registration Data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Registration Successful!",
        description: "You have been registered successfully. Other students can now view your profile.",
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
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 form-section">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <User className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Individual Registration</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Register individually and connect with other participants to form amazing teams
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Information */}
            <Card className="form-section opacity-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="year">Year *</Label>
                    <Select onValueChange={(value) => setValue('year', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map((year) => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.year && (
                      <p className="text-destructive text-sm mt-1">Year is required</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="branch">Branch *</Label>
                    <Select onValueChange={(value) => setValue('branch', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branchOptions.map((branch) => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.branch && (
                      <p className="text-destructive text-sm mt-1">Branch is required</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="form-section opacity-0">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <SkillSelector
                  selectedSkills={watchedSkills}
                  onSkillsChange={(skills) => setValue('skills', skills)}
                />
              </CardContent>
            </Card>

            {/* Software Development Experience */}
            {hasSoftwareSkills && (
              <Card className="form-section opacity-0 border-skill-frontend/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-skill-frontend" />
                    Software Development Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasDeployedSoftware"
                      checked={watchedHasDeployed}
                      onCheckedChange={(checked) => setValue('hasDeployedSoftware', !!checked)}
                    />
                    <Label htmlFor="hasDeployedSoftware" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Have you ever deployed a real software product?
                    </Label>
                  </div>

                  {watchedHasDeployed && (
                    <div className="animate-fade-in">
                      <Label htmlFor="deploymentLink">Deployment Link (Optional)</Label>
                      <Input
                        id="deploymentLink"
                        {...register('deploymentLink')}
                        placeholder="https://your-project.com or App Store/Play Store link"
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Share a link to your deployed project, app, or portfolio
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            <Card className="form-section opacity-0">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactNumber">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Contact Number *
                    </Label>
                    <Input
                      id="contactNumber"
                      {...register('contactNumber', { 
                        required: 'Contact number is required',
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: 'Please enter a valid 10-digit phone number'
                        }
                      })}
                      placeholder="1234567890"
                      className="mt-1"
                    />
                    {errors.contactNumber && (
                      <p className="text-destructive text-sm mt-1">{errors.contactNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="github">
                      <Github className="inline h-4 w-4 mr-1" />
                      GitHub Profile (Optional)
                    </Label>
                    <Input
                      id="github"
                      {...register('github')}
                      placeholder="https://github.com/username"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Help others see your coding projects
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="discord">
                      <MessageSquare className="inline h-4 w-4 mr-1" />
                      Discord (Optional)
                    </Label>
                    <Input
                      id="discord"
                      {...register('discord')}
                      placeholder="username#1234"
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Allow other students to contact you for team formation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    Register Individual
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

export default IndividualRegistration;