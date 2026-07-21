import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "ghost" | "laser";

interface CommonProps {
  variant: ButtonVariant;
  icon?: LucideIcon;
  iconPosition?: "start" | "end";
  className?: string;
  children: React.ReactNode;
}

interface AsButtonProps extends CommonProps {
  as?: "button";
  type?: "button" | "submit";
  onClick?: () => void;
}

interface AsAnchorProps extends CommonProps {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export type ButtonProps = AsButtonProps | AsAnchorProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brass text-bg font-bold transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-cta",
  ghost:
    "bg-transparent text-text font-semibold border border-text/25 transition-colors duration-200 hover:border-text/55 hover:bg-text/5",
  laser:
    "bg-laser text-ink font-bold transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-cta-laser",
};

export function Button(props: ButtonProps) {
  const {
    variant,
    icon: Icon,
    iconPosition = "end",
    className,
    children,
  } = props;

  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-pill px-6 py-3.25 text-btn",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass",
    variantClasses[variant],
    className,
  );

  const content = (
    <>
      {Icon && iconPosition === "start" && <Icon aria-hidden size={17} />}
      {children}
      {Icon && iconPosition === "end" && <Icon aria-hidden size={17} />}
    </>
  );

  if (props.as === "a") {
    const { href, target, rel, onClick } = props;
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {content}
      </a>
    );
  }

  const { type = "button", onClick } = props;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
