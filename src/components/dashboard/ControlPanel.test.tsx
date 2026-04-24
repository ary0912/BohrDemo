import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ControlPanel from './ControlPanel';

describe('ControlPanel', () => {
  it('renders correctly with default props', () => {
    const onOpenAbout = vi.fn();
    const onFilterChange = vi.fn();
    
    render(
      <ControlPanel 
        onOpenAbout={onOpenAbout} 
        activeFilter={null} 
        onFilterChange={onFilterChange} 
      />
    );

    // Info button should render
    expect(screen.getByText('System Info')).toBeInTheDocument();
    
    // Filter buttons should render
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Alert')).toBeInTheDocument();
    expect(screen.getByText('Warn')).toBeInTheDocument();
    expect(screen.getByText('Safe')).toBeInTheDocument();
  });

  it('calls onFilterChange when a filter is clicked', () => {
    const onOpenAbout = vi.fn();
    const onFilterChange = vi.fn();
    
    render(
      <ControlPanel 
        onOpenAbout={onOpenAbout} 
        activeFilter={null} 
        onFilterChange={onFilterChange} 
      />
    );

    fireEvent.click(screen.getByText('Alert'));
    expect(onFilterChange).toHaveBeenCalledWith(5);
  });

  it('calls onOpenAbout when info button is clicked', () => {
    const onOpenAbout = vi.fn();
    const onFilterChange = vi.fn();
    
    render(
      <ControlPanel 
        onOpenAbout={onOpenAbout} 
        activeFilter={null} 
        onFilterChange={onFilterChange} 
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /system info/i }));
    expect(onOpenAbout).toHaveBeenCalledTimes(1);
  });
});
