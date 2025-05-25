export interface LoadingButtonProps extends Omit<ButtonProps, 'color' | 'variant'> {
    loading?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  }