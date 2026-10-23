import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/cx";
import { Icon, type IconName } from "./Icon";

const variants = {
  ghost: { box: "", icon: "text-icon-default" },
  "circle-brand": { box: "rounded-full bg-background-brand", icon: "text-icon-on-brand" },
  "circle-neutral": { box: "rounded-full bg-background-subtle", icon: "text-icon-default" },
};

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  label: string;
  variant?: keyof typeof variants;
}

export function IconButton({ icon, label, variant = "ghost", className, type = "button", ...props }: IconButtonProps) {
  const v = variants[variant];
  return (
    <button
      type={type}
      aria-label={label}
      className={cx(
        "flex size-12 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-40",
        v.box,
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={24} className={v.icon} />
    </button>
  );
}
