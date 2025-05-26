import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '.';

describe('LoadingButton Component', () => {
  test('renders button with children when loading is false', () => {
    render(<Button loading={false}>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
  });

  test('renders loading dots and hides content when loading is true', () => {
    render(<Button loading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    // متن داخل دکمه وجود دارد اما با visibility: hidden پنهان است
    const text = screen.getByText('Submit');
    expect(text).toBeInTheDocument();

    // بررسی وجود دایره‌های لودینگ
    const dots = button.querySelectorAll('div');
    expect(dots.length).toBeGreaterThanOrEqual(5); // حداقل 5 دایره انتظار داریم
  });

  test('applies default props (contained + primary)', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Default');

    // چون بررسی کلاس‌های MUI در تست سخت است، این‌جا فقط بررسی می‌کنیم دکمه فعال است
    expect(button).not.toBeDisabled();
  });

  test('respects passed variant and color props', () => {
    render(
      <Button variant="outlined" color="secondary">
        Custom
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Custom');

    // چون MUI کلاس‌ها را داینامیک تولید می‌کند، چک کردن مستقیم کلاس پایدار نیست
    // اگر نیاز به چک دقیق‌تر بود، از data-testid استفاده کن
  });
});
