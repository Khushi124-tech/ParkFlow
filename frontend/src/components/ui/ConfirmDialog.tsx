import { AlertTriangle } from "lucide-react";
import Button from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Delete",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="fixed inset-0 bg-slate-900/40" onClick={onCancel} aria-hidden="true" />
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-slate-900">{title}</h2>
        <p className="mt-1.5 text-sm text-slate-500">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm} isLoading={isLoading}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
