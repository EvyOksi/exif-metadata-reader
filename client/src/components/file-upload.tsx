import { useCallback } from 'react';
import { Camera, CloudUpload, FolderOpen, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  return (
    <div className="mb-8">
      <div
        className="bg-card rounded-xl border-2 border-dashed border-border hover:border-blue-400 transition-colors duration-200 p-8 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
            <CloudUpload className="text-blue-400 w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Upload Image for EXIF Analysis</h3>
            <p className="text-muted-foreground mb-4">Drag and drop your image here, or click to browse</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <span className="bg-muted px-2 py-1 rounded">JPEG</span>
              <span className="bg-muted px-2 py-1 rounded">TIFF</span>
              <span className="bg-muted px-2 py-1 rounded">RAW</span>
              <span className="bg-muted px-2 py-1 rounded">PNG</span>
            </div>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white" 
            disabled={isProcessing}
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            {isProcessing ? 'Processing...' : 'Select Image'}
          </Button>
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      
      {/* Privacy Notice */}
      <Card className="mt-4 bg-emerald-600/10 border-emerald-600/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="text-emerald-400 w-5 h-5 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-emerald-300">100% Private & Secure</p>
              <p className="text-emerald-200">Images are never uploaded or stored anywhere. All EXIF processing happens locally in your browser using client-side JavaScript.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
