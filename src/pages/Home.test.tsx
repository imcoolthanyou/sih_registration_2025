import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/Home';

describe('Home', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to Smart India Hackathon/i)).toBeInTheDocument();
  });
});
