import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { skillCategories, getSkillColor } from '@/utils/skills';

interface SkillSelectorProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  className?: string;
}

const SkillSelector: React.FC<SkillSelectorProps> = ({
  selectedSkills,
  onSkillsChange,
  className = '',
}) => {
  const [customSkill, setCustomSkill] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter(s => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const handleCustomSkillAdd = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      onSkillsChange([...selectedSkills, customSkill.trim()]);
      setCustomSkill('');
      setShowCustomInput(false);
    }
  };

  const removeSkill = (skill: string) => {
    onSkillsChange(selectedSkills.filter(s => s !== skill));
  };

  return (
    <div className={className}>
      <Label className="text-sm font-medium mb-3 block">Skills *</Label>
      
      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className={`skill-tag ${getSkillColor(skill)} flex items-center gap-1`}
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="hover:bg-black/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Skill Categories */}
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div key={category}>
            <h4 className="font-medium text-sm text-muted-foreground mb-2">{category}</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                    selectedSkills.includes(skill)
                      ? `${getSkillColor(skill)} opacity-100`
                      : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Skill Input */}
      <div className="mt-4 pt-4 border-t border-border">
        {showCustomInput ? (
          <div className="flex gap-2">
            <Input
              placeholder="Enter custom skill"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleCustomSkillAdd();
                }
              }}
              className="flex-1"
            />
            <Button
              type="button"
              onClick={handleCustomSkillAdd}
              disabled={!customSkill.trim()}
              size="sm"
            >
              Add
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowCustomInput(false);
                setCustomSkill('');
              }}
              size="sm"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowCustomInput(true)}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Skill
          </Button>
        )}
      </div>
    </div>
  );
};

export default SkillSelector;