/**
 * Card — container with border and padding
 * Basic content container.
 */
export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
}

export declare function Card(props: CardProps): JSX.Element;
