import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = "Delete",
  cancelText = "Cancel"
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-4">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}