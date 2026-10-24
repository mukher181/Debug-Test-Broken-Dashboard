import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Dashboard from './Dashboard';

describe('Advanced Enterprise Dashboard Testing', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  // 1. Rendering Behavior Test
  it('renders client table rows correctly when data successfully loads', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', company: { name: 'Romaguera-Crona' } },
        { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', company: { name: 'Deckow-Crist' } }
      ])
    });

    render(<Dashboard />);
    
    // Assert loading state initially appears
    expect(screen.getByRole('status')).toHaveTextContent(/loading enterprise analytics/i);

    // Assert client names render after load
    expect(await screen.findByText(/Leanne Graham/i)).toBeInTheDocument();
    expect(screen.getByText(/Ervin Howell/i)).toBeInTheDocument();
  });

  // 2. State & Interaction Behavior Test
  it('filters visible client rows when user types in the search input', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        { id: 1, name: 'Alice Johnson', username: 'alice', email: 'alice@corp.com', company: { name: 'Alpha Inc' } },
        { id: 2, name: 'Bob Smith', username: 'bob', email: 'bob@corp.com', company: { name: 'Beta LLC' } }
      ])
    });

    render(<Dashboard />);

    // Wait for data to load
    expect(await screen.findByText(/Alice Johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob Smith/i)).toBeInTheDocument();

    // Type into search filter input
    const input = screen.getByLabelText(/filter metrics/i);
    await userEvent.type(input, 'Alice');

    // Assert filtered state updates correctly
    expect(screen.getByText(/Alice Johnson/i)).toBeInTheDocument();
    expect(screen.queryByText(/Bob Smith/i)).not.toBeInTheDocument();
  });

  // 3. Error / Edge Case Test
  it('shows an error banner when the API fetch fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    render(<Dashboard />);

    // Assert error state message displays
    const errorBanner = await screen.findByRole('alert');
    expect(errorBanner).toHaveTextContent(/failed to fetch enterprise metrics/i);
  });
});