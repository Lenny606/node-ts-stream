import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the application title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('shows operational status when backend is reachable', async () => {
    // Mock successful fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'pong', timestamp: '2024-01-01' }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('OPERATIONAL')).toBeInTheDocument();
    });

    expect(screen.getByText(/Live Telemetry/i)).toBeInTheDocument();
    expect(screen.getByText(/"message": "pong"/i)).toBeInTheDocument();
  });

  it('shows error status when backend is unreachable', async () => {
    // Mock failed fetch
    global.fetch = vi.fn().mockRejectedValue(new Error('Connection failed'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('ERROR')).toBeInTheDocument();
    });
  });

  it('toggles the video player when the button is clicked', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'pong' }),
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Launch Test Stream')).toBeInTheDocument();
    });

    const button = screen.getByText('Launch Test Stream');
    fireEvent.click(button);

    expect(screen.getByText('Hide Test Stream')).toBeInTheDocument();
    expect(screen.getByText(/Test Stream: sample2.mp4/i)).toBeInTheDocument();

    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video?.src).toContain('/api/v1/videos/test-id/stream');
  });
});
