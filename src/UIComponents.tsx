import * as React from "react";

// Simple classnames combiner
function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

// ---------------------------
// Badge
// ---------------------------
export type BadgeVariant = "default" | "secondary" | "outline";
export function Badge({
  children,
  className,
  variant = "default",
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: BadgeVariant;
}) {
  const styles =
    variant === "secondary"
      ? "bg-gray-100 text-gray-700"
      : variant === "outline"
      ? "border border-gray-300 text-gray-700"
      : "bg-black text-white";
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-1 text-xs font-medium", styles, className)}>
      {children}
    </span>
  );
}

// ---------------------------
// Avatar
// ---------------------------
export function Avatar({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("inline-flex h-9 w-9 overflow-hidden rounded-full bg-gray-200", className)}>{children}</div>;
}

export function AvatarImage({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
  // Keep it simple: if there's an img, render; otherwise rely on fallback children
  return src ? <img src={src} alt={alt} className={cn("h-full w-full object-cover", className)} /> : null;
}

export function AvatarFallback({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("flex h-full w-full items-center justify-center text-sm text-gray-600", className)}>{children}</div>;
}

// ---------------------------
// Tabs (headless)
// ---------------------------
type TabsContextValue = {
  value: string;
  setValue: (v: string) => void;
};
const TabsCtx = React.createContext<TabsContextValue | null>(null);

export function Tabs({
  value: controlled,
  defaultValue,
  onValueChange,
  children,
  className,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  children?: React.ReactNode;
  className?: string;
}) {
  const [uncontrolled, setUncontrolled] = React.useState<string>(defaultValue || "");
  const isControlled = controlled !== undefined;
  const current = isControlled ? (controlled as string) : uncontrolled;

  const setValue = React.useCallback(
    (v: string) => {
      if (!isControlled) setUncontrolled(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange]
  );

  const ctx = React.useMemo(() => ({ value: current, setValue }), [current, setValue]);

  return (
    <TabsCtx.Provider value={ctx}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsCtx.Provider>
  );
}

export function TabsList({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("inline-flex gap-2", className)}>{children}</div>;
}

export function TabsTrigger({ value, className, children }: { value: string; className?: string; children?: React.ReactNode }) {
  const ctx = React.useContext(TabsCtx);
  if (!ctx) return <button className={className}>{children}</button>;
  const active = ctx.value === value;
  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      data-state={active ? "active" : "inactive"}
      className={cn(
        "rounded-md px-3 py-1 text-sm",
        active ? "bg-black text-white" : "bg-gray-100 text-gray-800",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }: { value: string; className?: string; children?: React.ReactNode }) {
  const ctx = React.useContext(TabsCtx);
  const show = !ctx || ctx.value === value;
  if (!show) return null;
  return <div className={cn("mt-3", className)}>{children}</div>;
}

// ---------------------------
// Dropdown Menu (very small headless impl)
// ---------------------------
interface DropdownCtxValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const DropdownCtx = React.createContext<DropdownCtxValue | null>(null);

export function DropdownMenu({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const ctx = React.useMemo(() => ({ open, setOpen }), [open]);
  return <DropdownCtx.Provider value={ctx}>{children}</DropdownCtx.Provider>;
}

export function DropdownMenuTrigger({ asChild, children }: { asChild?: boolean; children: React.ReactNode }) {
  const ctx = React.useContext(DropdownCtx);
  if (!ctx) return <>{children}</>;
  const toggle = () => ctx.setOpen(!ctx.open);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: any) => {
        // preserve existing onClick
        // @ts-ignore
        children.props?.onClick?.(e);
        toggle();
      },
    });
  }
  return (
    <button type="button" onClick={toggle}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  className,
  align = "end",
  forceMount,
}: {
  children?: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  forceMount?: boolean;
}) {
  const ctx = React.useContext(DropdownCtx);
  const open = ctx?.open ?? false;
  if (!open && !forceMount) return null;

  const alignClass =
    align === "start" ? "left-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "right-0";

  return (
    <div
      className={cn(
        "absolute mt-2 min-w-[10rem] rounded-md border bg-white p-1 shadow-md",
        alignClass,
        className
      )}
      role="menu"
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("px-2 py-1 text-xs font-semibold text-gray-500", className)}>{children}</div>;
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-gray-200", className)} />;
}

export function DropdownMenuItem({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ctx = React.useContext(DropdownCtx);
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        // close after click
        ctx?.setOpen(false);
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm hover:bg-gray-100",
        className
      )}
      role="menuitem"
    >
      {children}
    </button>
  );
}
