/* Brand icons are not shipped by lucide-react; paths come from the prototype. */

interface SocialIconProps {
  size?: number;
}

export function FacebookIcon({ size = 18 }: SocialIconProps) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 22v-8h2.6l.4-3H13V9c0-.9.3-1.5 1.6-1.5H16V4.9C15.7 4.9 14.7 4.8 13.6 4.8c-2.4 0-4 1.4-4 4V11H7v3h2.6v8z" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: SocialIconProps) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
