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
// Button
// ---------------------------
type ButtonVariant = "default" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";
export function Button({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize }) {
  const v =
    variant === "secondary"
      ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
      : variant === "outline"
      ? "border border-gray-300 text-gray-800 hover:bg-gray-50"
      : "bg-black text-white hover:bg-gray-900";
  const s = size === "sm" ? "h-8 px-3 text-sm" : size === "lg" ? "h-12 px-6 text-base" : "h-10 px-4 text-sm";
  return (
    <button className={cn("inline-flex items-center justify-center rounded-md", v, s, className)} {...props}>
      {children}
    </button>
  );
}

// ---------------------------
// Inputs
// ---------------------------
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20",
        className
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("text-sm font-medium text-gray-800", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20",
        className
      )}
      {...props}
    />
  );
}

export function Separator({ className }: { className?: string }) {
  return <div className={cn("my-3 h-px w-full bg-gray-200", className)} />;
}

export function Progress({ value = 0, max = 100, className }: { value?: number; max?: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded bg-gray-200", className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <div className="h-full bg-black" style={{ width: pct + "%" }} />
    </div>
  );
}

export function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  className,
  ...props
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (v: boolean) => void;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "type">) {
  const [internal, setInternal] = React.useState<boolean>(!!defaultChecked);
  const isControlled = typeof checked === "boolean";
  const isOn = isControlled ? (checked as boolean) : internal;
  return (
    <button
      type="button"
      aria-pressed={isOn}
      onClick={() => {
        const next = !isOn;
        if (!isControlled) setInternal(next);
        onCheckedChange?.(next);
      }}
      className={cn(
        "inline-flex h-6 w-10 items-center rounded-full border transition-colors",
        isOn ? "bg-black border-black" : "bg-gray-200 border-gray-300",
        className
      )}
      {...props as any}
    >
      <span
        className={cn(
          "ml-1 inline-block h-4 w-4 rounded-full bg-white transition-transform",
          isOn ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
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
// Card
// ---------------------------
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border bg-white shadow-sm", className)} {...props} />;
}
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-6", className)} {...props} />;
}
export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}
export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />;
}
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
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

// ---------------------------
// Calendar + Date range picker (minimal)
// ---------------------------
export function Calendar({
  selected,
  onSelect,
  className,
}: {
  selected?: Date;
  onSelect?: (date?: Date) => void;
  className?: string;
}) {
  const [val, setVal] = React.useState<string | undefined>(selected ? toInput(selected) : undefined);
  function toInput(d: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }
  function fromInput(v: string): Date | undefined {
    if (!v) return undefined;
    const [y, m, d] = v.split("-").map(Number);
    if (!y || !m || !d) return undefined;
    return new Date(y, m - 1, d);
  }
  return (
    <input
      type="date"
      className={cn("h-10 rounded-md border border-gray-300 px-3 text-sm", className)}
      value={val || ""}
      onChange={(e) => {
        const v = e.target.value;
        setVal(v);
        onSelect?.(fromInput(v));
      }}
    />
  );
}

export type DateRange = { from?: Date; to?: Date };
export function DatePickerWithRange({
  value,
  onChange,
  className,
}: {
  value?: DateRange;
  onChange?: (r: DateRange) => void;
  className?: string;
}) {
  const [from, setFrom] = React.useState<string>(value?.from ? toInput(value.from) : "");
  const [to, setTo] = React.useState<string>(value?.to ? toInput(value.to) : "");
  function toInput(d: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }
  function fromInput(v: string): Date | undefined {
    if (!v) return undefined;
    const [y, m, d] = v.split("-").map(Number);
    if (!y || !m || !d) return undefined;
    return new Date(y, m - 1, d);
  }
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <input
        type="date"
        className="h-10 rounded-md border border-gray-300 px-3 text-sm"
        value={from}
        onChange={(e) => {
          const v = e.target.value;
          setFrom(v);
          onChange?.({ from: fromInput(v), to: fromInput(to) });
        }}
      />
      <span className="text-sm text-gray-500">to</span>
      <input
        type="date"
        className="h-10 rounded-md border border-gray-300 px-3 text-sm"
        value={to}
        onChange={(e) => {
          const v = e.target.value;
          setTo(v);
          onChange?.({ from: fromInput(from), to: fromInput(v) });
        }}
      />
    </div>
  );
}
