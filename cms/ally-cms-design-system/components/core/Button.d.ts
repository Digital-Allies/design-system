/**
 * Button — primary action trigger
 * Primary, secondary, outline variants.
 */
export interface ButtonProps {
  /** Button content or label */
  children: React.ReactNode;
  /** Visual style: primary, secondary, outline */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Disable interaction */
  disabled?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Custom className */
  className?: string;
}

export declare function Button(props: ButtonProps): JSX.Element;
