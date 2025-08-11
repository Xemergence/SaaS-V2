import React, { forwardRef, useState } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost"; size?: "sm" | "md" | "lg" };
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className="", variant="default", size="md", ...props }, ref) {
  const v = variant === "outline" ? "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50" 
    : variant === "ghost" ? "bg-transparent text-gray-900 hover:bg-gray-100" 
    : "bg-gray-900 text-white hover:bg-gray-800";
  const s = size === "sm" ? "px-3 py-1.5 text-sm" : size === "lg" ? "px-5 py-3 text-base" : "px-4 py-2";
  return <button ref={ref} className={`rounded-xl transition ${v} ${s} ${className}`} {...props} />;
});

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> & {Header: any; Content: any; Footer: any} = Object.assign(
  function Card({ className="", ...props }) {
    return <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`} {...props} />;
  },
  { Header: ({className="", ...p}: any) => <div className={`p-4 border-b border-gray-100 font-semibold ${className}`} {...p} />,
    Content: ({className="", ...p}: any) => <div className={`p-4 ${className}`} {...p} />,
    Footer: ({className="", ...p}: any) => <div className={`p-4 border-t border-gray-100 ${className}`} {...p} />,
  }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className="", ...props }, ref) {
  return <input ref={ref} className={`w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 ${className}`} {...props} />;
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className="", ...props }, ref) {
  return <textarea ref={ref} className={`w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 ${className}`} {...props} />;
});

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({className="", ...props}) => (
  <label className={`text-sm font-medium text-gray-700 ${className}`} {...props} />
);

export const Separator: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({className="", ...props}) => (
  <div className={`h-px w-full bg-gray-200 ${className}`} {...props} />
);

export const Progress: React.FC<{ value: number; className?: string }> = ({ value, className="" }) => (
  <div className={`w-full bg-gray-100 rounded-full h-2 ${className}`}>
    <div className="bg-gray-900 h-2 rounded-full" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
  </div>
);

export const Switch: React.FC<{ checked?: boolean; onCheckedChange?: (v:boolean)=>void; className?: string }> = ({ checked=false, onCheckedChange, className="" }) => {
  const [state, setState] = useState(checked);
  return (
    <button onClick={()=>{ setState(!state); onCheckedChange && onCheckedChange(!state); }}
      className={`inline-flex items-center rounded-full w-10 h-6 transition ${state ? "bg-gray-900" : "bg-gray-300"} ${className}`}>
      <span className={`bg-white w-5 h-5 rounded-full transform transition ${state ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
};

export const Tabs: React.FC<{ tabs: {key:string; label:string}[]; value: string; onValueChange: (k:string)=>void; className?: string }> = ({ tabs, value, onValueChange, className="" }) => (
  <div className={`flex gap-2 ${className}`}>
    {tabs.map(t => (
      <button key={t.key}
        onClick={()=>onValueChange(t.key)}
        className={`px-3 py-1.5 rounded-xl border ${value===t.key?"bg-gray-900 text-white border-gray-900":"bg-white border-gray-200 hover:bg-gray-50"}`}>
        {t.label}
      </button>
    ))}
  </div>
);

export const Dialog: React.FC<{open:boolean; onOpenChange:(v:boolean)=>void; children:React.ReactNode}> = ({open, onOpenChange, children}) => (
  open ? <div className="fixed inset-0 z-50 grid place-items-center bg-black/40" onClick={()=>onOpenChange(false)}>{children}</div> : null
);

export const Popover: React.FC<{ open:boolean; onOpenChange:(v:boolean)=>void; content:React.ReactNode; children:React.ReactNode }> = ({open, onOpenChange, content, children}) => (
  <div className="relative inline-block">
    <div onClick={()=>onOpenChange(!open)}>{children}</div>
    {open && <div className="absolute z-50 mt-2 rounded-xl border bg-white p-3 shadow-md">{content}</div>}
  </div>
);

export const DropdownMenu: React.FC<{ items: {label:string; onClick:()=>void}[]; trigger:React.ReactNode }> = ({items, trigger}) => {
  const [o,setO] = useState(false);
  return (
    <div className="relative inline-block">
      <div onClick={()=>setO(!o)}>{trigger}</div>
      {o && (<div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white p-2 shadow-md">
        {items.map((it,i)=>(<button key={i} onClick={()=>{setO(false); it.onClick();}} className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50">{it.label}</button>))}
      </div>)}
    </div>
  );
};

export const Badge: React.FC<{children:React.ReactNode; variant?: "default" | "secondary"; className?:string}> = ({children, variant="default", className=""}) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium ${variant==="secondary"?"bg-gray-100 text-gray-700":"bg-gray-900 text-white"} ${className}`}>{children}</span>
);

export const Avatar: React.FC<{ src?:string; alt?:string; className?:string; fallback?:string }> = ({ src, alt="", className="", fallback }) => (
  <div className={`inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 ${className}`} style={{width:40,height:40}}>
    {src ? <img src={src} alt={alt} className="w-full h-full rounded-full object-cover" /> : (fallback || alt?.slice(0,1).toUpperCase() || "?")}
  </div>
);

export const Calendar: React.FC<{ className?:string }> = ({ className="" }) => (
  <div className={`rounded-2xl border border-dashed p-6 text-sm text-gray-500 ${className}`}>[Calendar Placeholder]</div>
);

// Toast: minimal hook
type Toast = { id:number; title?:string; description?:string };
let _toasts: Toast[] = [];
let _set: React.Dispatch<React.SetStateAction<Toast[]>> | null = null;
export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>(_toasts);
  React.useEffect(()=>{ _set = setToasts; return ()=>{ _set = null; } }, []);
  const toast = (t:{title?:string; description?:string}) => {
    const id = Date.now();
    _toasts = [..._toasts, {id, ...t}];
    _set && _set(_toasts);
    setTimeout(()=>{
      _toasts = _toasts.filter(x=>x.id!==id);
      _set && _set(_toasts);
    }, 2500);
  };
  return { toast, toasts };
}
export const ToastViewport: React.FC = () => {
  const [toasts, setToasts] = React.useState<Toast[]>(_toasts);
  React.useEffect(()=>{ _set = setToasts; return ()=>{ _set = null; } }, []);
  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className="rounded-xl border bg-white shadow px-4 py-3">
          {t.title && <div className="font-semibold">{t.title}</div>}
          {t.description && <div className="text-sm text-gray-600">{t.description}</div>}
        </div>
      ))}
    </div>
  );
};
export const toast = (t:{title?:string; description?:string}) => { const { toast } = useToast(); toast(t); };
