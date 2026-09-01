/**
 * Input — text field with optional label and error state
 * Text input with error handling.
 */
export interface InputProps {
  /** Label text */
  label?: string;
  /** Error message to display */
  error?: string;
  /** Disable input */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Value */
  value?: string;
  /** Type attribute */
  type?: string;
}

export declare function Input(props: InputProps): JSX.Element;
