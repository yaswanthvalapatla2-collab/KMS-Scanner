import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, RotateCcw, Crop, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface CameraScreenProps {
  onBack: () => void;
  onSavePhoto: (photoName: string, photoData: string) => void;
}

export function CameraScreen({ onBack, onSavePhoto }: CameraScreenProps) {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleTakePhoto = () => {
    // Simulate taking a photo with a placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Create a gradient background as placeholder
      const gradient = ctx.createLinearGradient(0, 0, 400, 400);
      gradient.addColorStop(0, '#a855f7');
      gradient.addColorStop(1, '#3b82f6');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 400, 400);
      
      // Add some text
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Sample Photo', 200, 180);
      ctx.fillText(new Date().toLocaleTimeString(), 200, 220);
    }
    
    const dataUrl = canvas.toDataURL('image/png');
    setCapturedPhoto(dataUrl);
    setIsEditing(true);
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    setIsEditing(false);
  };

  const handleSave = () => {
    setShowNameDialog(true);
  };

  const handleConfirmSave = () => {
    if (capturedPhoto && photoName.trim()) {
      onSavePhoto(photoName.trim(), capturedPhoto);
      setShowNameDialog(false);
      setPhotoName('');
      setCapturedPhoto(null);
      setIsEditing(false);
      onBack();
    }
  };

  return (
    <div className="h-screen bg-black relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Camera View or Captured Photo */}
      <div className="h-full flex items-center justify-center">
        {capturedPhoto ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm mx-4"
          >
            <img 
              src={capturedPhoto} 
              alt="Captured" 
              className="w-full aspect-square object-cover rounded-lg"
            />
          </motion.div>
        ) : (
          <div className="w-full max-w-sm mx-4 aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
            <Camera className="w-16 h-16 text-gray-500" />
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
        {isEditing ? (
          <div className="flex justify-center space-x-4">
            <Button
              variant="ghost"
              size="lg"
              onClick={handleRetake}
              className="w-14 h-14 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <X className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-14 h-14 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-14 h-14 rounded-full bg-white/20 text-white hover:bg-white/30"
            >
              <Crop className="w-6 h-6" />
            </Button>
            <Button
              size="lg"
              onClick={handleSave}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Check className="w-6 h-6" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleTakePhoto}
              className="w-16 h-16 rounded-full bg-white hover:bg-gray-100"
            >
              <div className="w-12 h-12 rounded-full border-4 border-gray-800"></div>
            </Button>
          </div>
        )}
      </div>

      {/* Name Dialog */}
      <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
        <DialogContent className="mx-4">
          <DialogHeader>
            <DialogTitle>Enter Photo Name</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Photo name..."
              value={photoName}
              onChange={(e) => setPhotoName(e.target.value)}
              autoFocus
            />
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowNameDialog(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmSave}
                disabled={!photoName.trim()}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-white/60 text-xs">Made by Valapatla Yaswanth</p>
      </div>
    </div>
  );
}