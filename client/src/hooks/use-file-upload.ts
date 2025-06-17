import { useState, useCallback } from 'react';
import { extractExifData, type ExifData } from '@/lib/exif-utils';
import { useToast } from '@/hooks/use-toast';

export interface UploadedFile {
  file: File;
  preview: string;
  exifData: ExifData | null;
}

export function useFileUpload() {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Create preview URL
      const preview = URL.createObjectURL(file);
      
      // Extract EXIF data
      const exifData = await extractExifData(file);
      
      if (!exifData) {
        toast({
          title: "No EXIF Data Found",
          description: "This image doesn't contain EXIF metadata or the format is not supported.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "EXIF Data Extracted",
          description: "Successfully extracted metadata from your image.",
        });
      }

      setUploadedFile({
        file,
        preview,
        exifData,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process the uploaded image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [toast]);

  const clearFile = useCallback(() => {
    if (uploadedFile?.preview) {
      URL.revokeObjectURL(uploadedFile.preview);
    }
    setUploadedFile(null);
  }, [uploadedFile]);

  return {
    uploadedFile,
    isProcessing,
    processFile,
    clearFile,
  };
}
