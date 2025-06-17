import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image as ImageIcon } from 'lucide-react';
import type { UploadedFile } from '@/hooks/use-file-upload';

interface ImagePreviewProps {
  uploadedFile: UploadedFile;
}

export function ImagePreview({ uploadedFile }: ImagePreviewProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getDimensions = (): string => {
    if (uploadedFile.exifData?.width && uploadedFile.exifData?.height) {
      return `${uploadedFile.exifData.width} × ${uploadedFile.exifData.height}`;
    }
    return 'Unknown';
  };

  return (
    <Card className="bg-card shadow-sm border border-border overflow-hidden">
      <CardHeader className="p-4 border-b border-border">
        <CardTitle className="font-medium text-foreground flex items-center">
          <ImageIcon className="w-5 h-5 mr-2 text-blue-400" />
          Image Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <img
          src={uploadedFile.preview}
          alt="Uploaded image for EXIF analysis"
          className="w-full h-64 object-cover rounded-lg border border-border"
        />
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Filename:</span>
            <span className="font-mono text-foreground truncate ml-2" title={uploadedFile.file.name}>
              {uploadedFile.file.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">File Size:</span>
            <span className="font-mono text-foreground">
              {formatFileSize(uploadedFile.file.size)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Dimensions:</span>
            <span className="font-mono text-foreground">
              {getDimensions()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
