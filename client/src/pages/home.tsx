import { Camera, Shield, Zap, FileOutput, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileUpload } from '@/components/file-upload';
import { ImagePreview } from '@/components/image-preview';
import { MetadataPanel } from '@/components/metadata-panel';
import { useFileUpload } from '@/hooks/use-file-upload';

export default function Home() {
  const { uploadedFile, isProcessing, processFile, clearFile } = useFileUpload();

  const analyzeAnother = () => {
    clearFile();
  };

  const clearAll = () => {
    clearFile();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Camera className="text-white w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">EXIF Reader</h1>
                <p className="text-xs text-muted-foreground">Professional Image Metadata Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-xs text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>No Storage • 100% Private</span>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <HelpCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* File Upload Section */}
        {!uploadedFile && (
          <FileUpload onFileSelect={processFile} isProcessing={isProcessing} />
        )}

        {/* Image Analysis Container */}
        {uploadedFile && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Image Preview Panel */}
              <div className="lg:col-span-1">
                <ImagePreview uploadedFile={uploadedFile} />
              </div>

              {/* Metadata Panel */}
              <div className="lg:col-span-2">
                {uploadedFile.exifData ? (
                  <MetadataPanel 
                    exifData={uploadedFile.exifData} 
                    filename={uploadedFile.file.name}
                  />
                ) : (
                  <Card className="bg-card shadow-sm border border-border">
                    <CardContent className="p-8 text-center">
                      <div className="text-muted-foreground">
                        <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium mb-2 text-foreground">No EXIF Data Found</h3>
                        <p className="text-sm">
                          This image doesn't contain EXIF metadata or the format is not supported.
                          Try uploading a JPEG, TIFF, or RAW image file.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={analyzeAnother}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                <Camera className="w-4 h-4 mr-2" />
                Analyze Another Image
              </Button>
              <Button 
                onClick={clearAll}
                variant="outline"
                className="flex-1 border-slate-300 hover:border-slate-400 text-slate-700 py-3"
              >
                <div className="w-4 h-4 mr-2">🗑️</div>
                Clear Analysis
              </Button>
            </div>
          </div>
        )}

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="text-blue-400 w-6 h-6" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Privacy First</h3>
            <p className="text-sm text-muted-foreground">Zero storage, zero uploads. Images are processed entirely in your browser and never leave your device.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="text-green-400 w-6 h-6" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Instant metadata extraction with no server uploads required.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileOutput className="text-purple-400 w-6 h-6" />
            </div>
            <h3 className="font-medium text-foreground mb-2">Export Ready</h3>
            <p className="text-sm text-muted-foreground">Download comprehensive reports or copy specific metadata values.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 EXIF Reader. Professional image metadata analysis tool.
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <a href="#" className="hover:text-foreground transition-colors">API Documentation</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
