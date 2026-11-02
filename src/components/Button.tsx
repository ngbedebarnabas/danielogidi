import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "./icons";

type Variant = "gold" | "dark" | "light" | "outline" | "glass";

const variants: Record<Variant, { box: string; dot: string }> = {
  gold: { box: "bg-gold text-ink hover:bg-gold-soft", dot: "bg-ink text-gold" },
  dark: { box: "bg-ink text-white hover:bg-panel-2", dot: "bg-gold text-ink" },
  light: { box: "bg-white text-ink hover:bg-paper", dot: "bg-ink text-white" },
  outline: {
    box: "border border-fg/25 text-fg hover:border-gold-ink hover:text-gold-ink",
    dot: "bg-fg/10 text-current",
  },
  glass: {
    box: "border border-fg/20 bg-fg/10 text-fg backdrop-blur-md hover:bg-fg/20",
    dot: "bg-fg/15 text-fg",
  },
};

type CommonProps = {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonProps = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "gold", arrow = true, className = "", children, ...rest } = props;
  const v = variants[variant];
  const cls = `group inline-flex items-center gap-3 rounded-full py-2 pr-2 pl-6 text-sm font-semibold tracking-wide transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${v.box} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={`grid size-9 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-rotate-45 ${v.dot}`}
        >
          <ArrowRight width={16} height={16} />
        </span>
      )}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...linkRest } = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...(rest as Omit<ButtonProps, keyof CommonProps>)}>
      {inner}
    </button>
  );
}
