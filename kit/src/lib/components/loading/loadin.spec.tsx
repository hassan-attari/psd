// Loading.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Loading, LoadingDot } from '.';
describe('Loading Component', () => {
  test('renders Loading component when open is true', () => {
    render(<Loading open={true} />);
    const modal = screen.getByRole('presentation');
    expect(modal).toBeInTheDocument();
  });

  test('does not render Loading component when open is false', () => {
    render(<Loading open={false} />);
    const modal = screen.queryByRole('presentation');
    expect(modal).not.toBeInTheDocument();
  });
});

describe('LoadingDot Component', () => {
  test('renders 5 dots with specified color and size', () => {
    const { container } = render(<LoadingDot color="#4000ff" width={10} height={10} />);
    const dots = container.querySelectorAll('div');
    expect(dots.length).toBe(5);
    dots.forEach((dot) => {
      expect(dot).toHaveStyle(`background-color: #4000ff`);
      expect(dot).toHaveStyle(`width: 10px`);
      expect(dot).toHaveStyle(`height: 10px`);
    });
  });
});
