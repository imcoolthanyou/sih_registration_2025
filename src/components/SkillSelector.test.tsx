import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SkillSelector } from '@/components/SkillSelector';

describe('SkillSelector', () => {
  it('renders without crashing', () => {
    render(<SkillSelector value={[]} onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('displays selected skills', () => {
    render(<SkillSelector value={['React', 'TypeScript']} onChange={() => {}} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
