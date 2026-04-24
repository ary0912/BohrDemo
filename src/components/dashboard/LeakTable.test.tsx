import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LeakTable from './LeakTable';

const mockLeaks = [
  {
    id: 'leak-1',
    lat: 51.4545,
    lng: -2.5879,
    severity: 5,
    timestamp: '2023-10-27T10:00:00Z',
    status: 'detected' as const
  },
  {
    id: 'leak-2',
    lat: 51.4645,
    lng: -2.5979,
    severity: 2,
    timestamp: '2023-10-27T10:05:00Z',
    status: 'detected' as const
  }
];

describe('LeakTable', () => {
  it('renders empty state when no leaks are provided', () => {
    render(<LeakTable leaks={[]} />);
    expect(screen.getByText(/Awaiting Signal Matrix\.\.\./i)).toBeInTheDocument();
  });

  it('renders leak rows when leaks are provided', () => {
    render(<LeakTable leaks={mockLeaks} />);
    // Should render IDs (it slices to 3 chars: ID-lea)
    expect(screen.getAllByText('ID-lea').length).toBe(2);
    
    // Should render severities (mapped to ACTION, NOMINAL)
    expect(screen.getByText('ACTION')).toBeInTheDocument();
    expect(screen.getByText('NOMINAL')).toBeInTheDocument();
  });
});
