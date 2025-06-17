import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Info, 
  Copy, 
  Download, 
  Camera, 
  Sun, 
  MapPin, 
  Settings,
  Map,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ExifData } from '@/lib/exif-utils';
import { generateMetadataReport } from '@/lib/exif-utils';

interface MetadataPanelProps {
  exifData: ExifData;
  filename: string;
}

interface MetadataFieldProps {
  label: string;
  value: string | undefined;
}

function MetadataField({ label, value }: MetadataFieldProps) {
  const { toast } = useToast();

  const copyValue = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value);
        toast({
          title: "Copied to clipboard",
          description: `${label}: ${value}`,
        });
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  if (!value) return null;

  return (
    <div className="bg-muted rounded-lg p-3">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
          <dd className="mt-1 text-sm font-mono text-foreground break-all">{value}</dd>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground ml-2 h-auto p-1"
          onClick={copyValue}
          title="Copy value"
        >
          <Copy className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

export function MetadataPanel({ exifData, filename }: MetadataPanelProps) {
  const { toast } = useToast();

  const copyAllMetadata = async () => {
    try {
      const report = generateMetadataReport(exifData, filename);
      await navigator.clipboard.writeText(report);
      toast({
        title: "All metadata copied",
        description: "Complete EXIF data has been copied to clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy all metadata:', error);
    }
  };

  const downloadReport = () => {
    const report = generateMetadataReport(exifData, filename);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exif-report-${filename.replace(/\.[^/.]+$/, '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report downloaded",
      description: "EXIF metadata report has been saved to your downloads.",
    });
  };

  return (
    <Card className="bg-card shadow-sm border border-border">
      <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between space-y-0">
        <CardTitle className="font-medium text-foreground flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-400" />
          EXIF Metadata
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyAllMetadata}
            className="text-muted-foreground hover:text-blue-400 border-border hover:border-blue-400"
          >
            <Copy className="w-4 h-4 mr-1" />
            Copy All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadReport}
            className="text-muted-foreground hover:text-green-400 border-border hover:border-green-400"
          >
            <Download className="w-4 h-4 mr-1" />
            Download Report
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="camera" className="w-full">
          <TabsList className="grid w-full grid-cols-5 rounded-none border-b border-border bg-transparent h-auto">
            <TabsTrigger 
              value="camera" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:text-blue-400 rounded-none py-3 px-2 text-muted-foreground text-xs"
            >
              <Camera className="w-4 h-4 mr-1" />
              Camera
            </TabsTrigger>
            <TabsTrigger 
              value="exposure"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:text-blue-400 rounded-none py-3 px-2 text-muted-foreground text-xs"
            >
              <Sun className="w-4 h-4 mr-1" />
              Exposure
            </TabsTrigger>
            <TabsTrigger 
              value="location"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:text-blue-400 rounded-none py-3 px-2 text-muted-foreground text-xs"
            >
              <MapPin className="w-4 h-4 mr-1" />
              Location
            </TabsTrigger>
            <TabsTrigger 
              value="technical"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:text-blue-400 rounded-none py-3 px-2 text-muted-foreground text-xs"
            >
              <Settings className="w-4 h-4 mr-1" />
              Technical
            </TabsTrigger>
            <TabsTrigger 
              value="advanced"
              className="data-[state=active]:border-b-2 data-[state=active]:border-blue-400 data-[state=active]:text-blue-400 rounded-none py-3 px-2 text-muted-foreground text-xs"
            >
              <Info className="w-4 h-4 mr-1" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <div className="p-4">
            <TabsContent value="camera" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetadataField label="Camera Make" value={exifData.camera.make} />
                <MetadataField label="Camera Model" value={exifData.camera.model} />
                <MetadataField label="Software" value={exifData.camera.software} />
                <MetadataField label="Serial Number" value={exifData.camera.serialNumber} />
                <MetadataField label="Body Serial Number" value={exifData.camera.bodySerialNumber} />
                <MetadataField label="Firmware Version" value={exifData.camera.firmwareVersion} />
                <MetadataField label="Date Taken" value={exifData.dateTimeOriginal || exifData.dateTime} />
                <MetadataField label="Date Digitized" value={exifData.dateTimeDigitized} />
                <MetadataField label="Camera Owner" value={exifData.technical.cameraOwnerName} />
                <MetadataField label="Copyright" value={exifData.technical.copyright} />
                <MetadataField label="Artist" value={exifData.technical.artist} />
                <MetadataField label="User Comment" value={exifData.technical.userComment} />
              </div>
            </TabsContent>

            <TabsContent value="exposure" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetadataField label="Aperture" value={exifData.exposure.aperture} />
                <MetadataField label="Shutter Speed" value={exifData.exposure.shutterSpeed} />
                <MetadataField label="ISO" value={exifData.exposure.iso} />
                <MetadataField label="Exposure Mode" value={exifData.exposure.exposureMode} />
                <MetadataField label="Exposure Program" value={exifData.exposure.exposureProgram} />
                <MetadataField label="Exposure Bias" value={exifData.exposure.exposureBias} />
                <MetadataField label="Metering Mode" value={exifData.exposure.meteringMode} />
                <MetadataField label="White Balance" value={exifData.exposure.whiteBalance} />
                <MetadataField label="Flash" value={exifData.exposure.flash} />
                <MetadataField label="Scene Capture Type" value={exifData.exposure.sceneCaptureType} />
                <MetadataField label="Gain Control" value={exifData.exposure.gainControl} />
                <MetadataField label="Contrast" value={exifData.exposure.contrast} />
                <MetadataField label="Saturation" value={exifData.exposure.saturation} />
                <MetadataField label="Sharpness" value={exifData.exposure.sharpness} />
                <MetadataField label="Digital Zoom Ratio" value={exifData.exposure.digitalZoomRatio} />
                <MetadataField label="Subject Distance" value={exifData.exposure.subjectDistance} />
                <MetadataField label="Subject Distance Range" value={exifData.exposure.subjectDistanceRange} />
                <MetadataField label="Subject Area" value={exifData.exposure.subjectArea} />
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-0">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MetadataField label="GPS Coordinates" value={exifData.location.coordinates} />
                  <MetadataField label="Altitude" value={exifData.location.altitude} />
                  <MetadataField label="GPS Date Stamp" value={exifData.location.gpsDateStamp} />
                  <MetadataField label="GPS Time Stamp" value={exifData.location.gpsTimeStamp} />
                  <MetadataField label="GPS Processing Method" value={exifData.location.gpsProcessingMethod} />
                  <MetadataField label="GPS Area Information" value={exifData.location.gpsAreaInformation} />
                  <MetadataField label="GPS Differential" value={exifData.location.gpsDifferential} />
                  <MetadataField label="GPS Image Direction" value={exifData.location.gpsImgDirection} />
                  <MetadataField label="GPS Speed" value={exifData.location.gpsSpeed} />
                  <MetadataField label="GPS Track" value={exifData.location.gpsTrack} />
                </div>
                
                {exifData.location.coordinates && exifData.location.latitude && exifData.location.longitude && (
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Map className="w-5 h-5 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">Interactive Map</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300 border-blue-600/30"
                        onClick={() => {
                          const lat = exifData.location.latitude;
                          const lon = exifData.location.longitude;
                          if (lat && lon) {
                            window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`, '_blank');
                          }
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open in Maps
                      </Button>
                    </div>
                    <div className="bg-background rounded border border-border overflow-hidden">
                      <iframe
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${exifData.location.longitude - 0.01},${exifData.location.latitude - 0.01},${exifData.location.longitude + 0.01},${exifData.location.latitude + 0.01}&layer=mapnik&marker=${exifData.location.latitude},${exifData.location.longitude}`}
                        width="100%"
                        height="200"
                        frameBorder="0"
                        scrolling="no"
                        style={{ border: 'none' }}
                        title="Location Map"
                        className="w-full"
                      />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Coordinates: {exifData.location.latitude.toFixed(6)}, {exifData.location.longitude.toFixed(6)}
                    </div>
                  </div>
                )}

                {exifData.location.coordinates && (!exifData.location.latitude || !exifData.location.longitude) && (
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Map className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium text-blue-300">Location Data</span>
                    </div>
                    <div className="bg-background rounded border border-border h-32 flex items-center justify-center text-muted-foreground text-sm">
                      <Map className="w-5 h-5 mr-2" />
                      GPS location: {exifData.location.coordinates}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="technical" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetadataField label="Lens Model" value={exifData.lens.model} />
                <MetadataField label="Lens Make" value={exifData.technical.lensMake} />
                <MetadataField label="Focal Length" value={exifData.lens.focalLength} />
                <MetadataField label="Focal Length (35mm)" value={exifData.lens.focalLengthIn35mm} />
                <MetadataField label="Max Aperture" value={exifData.lens.maxAperture} />
                <MetadataField label="Lens Info" value={exifData.lens.lensInfo} />
                <MetadataField label="Lens Serial Number" value={exifData.camera.lensSerialNumber} />
                <MetadataField label="Color Space" value={exifData.technical.colorSpace} />
                <MetadataField label="Resolution" value={exifData.technical.resolution} />
                <MetadataField label="Bit Depth" value={exifData.technical.bitDepth} />
                <MetadataField label="Compression" value={exifData.technical.compression} />
                <MetadataField label="Orientation" value={exifData.technical.orientation} />
                <MetadataField label="File Source" value={exifData.technical.fileSource} />
                <MetadataField label="Scene Type" value={exifData.technical.sceneType} />
                <MetadataField label="Custom Rendered" value={exifData.technical.customRendered} />
                <MetadataField label="Sensing Method" value={exifData.technical.sensingMethod} />
                <MetadataField label="EXIF Version" value={exifData.technical.exifVersion} />
                <MetadataField label="FlashPix Version" value={exifData.technical.flashpixVersion} />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MetadataField label="Photometric Interpretation" value={exifData.technical.photometricInterpretation} />
                <MetadataField label="Planar Configuration" value={exifData.technical.planarConfiguration} />
                <MetadataField label="YCbCr Coefficients" value={exifData.technical.yCbCrCoefficients} />
                <MetadataField label="YCbCr Positioning" value={exifData.technical.yCbCrPositioning} />
                <MetadataField label="Reference Black White" value={exifData.technical.referenceBlackWhite} />
                <MetadataField label="Pixel X Dimension" value={exifData.technical.pixelXDimension} />
                <MetadataField label="Pixel Y Dimension" value={exifData.technical.pixelYDimension} />
                <MetadataField label="Compressed Bits Per Pixel" value={exifData.technical.compressedBitsPerPixel} />
                <MetadataField label="Components Configuration" value={exifData.technical.componentsConfiguration} />
                <MetadataField label="Maker Note" value={exifData.technical.makerNote} />
                <MetadataField label="Related Sound File" value={exifData.technical.relatedSoundFile} />
                <MetadataField label="Image Unique ID" value={exifData.technical.imageUniqueID} />
                <MetadataField label="Host Computer" value={exifData.technical.hostComputer} />
                <MetadataField label="CFA Pattern" value={exifData.technical.cfaPattern} />
                <MetadataField label="Spectral Sensitivity" value={exifData.technical.spectralSensitivity} />
                <MetadataField label="OECF" value={exifData.technical.oecf} />
                <MetadataField label="Spatial Frequency Response" value={exifData.technical.spatialFrequencyResponse} />
                <MetadataField label="Noise" value={exifData.technical.noise} />
                <MetadataField label="Focal Plane X Resolution" value={exifData.exposure.focalPlaneXResolution} />
                <MetadataField label="Focal Plane Y Resolution" value={exifData.exposure.focalPlaneYResolution} />
                <MetadataField label="Focal Plane Resolution Unit" value={exifData.exposure.focalPlaneResolutionUnit} />
                <MetadataField label="Subject Location" value={exifData.technical.subjectLocation} />
                <MetadataField label="Exposure Index" value={exifData.technical.exposureIndex} />
                <MetadataField label="TIFF EP" value={exifData.technical.tiff_ep} />
                <MetadataField label="Interoperability Index" value={exifData.technical.interoperabilityIndex} />
                <MetadataField label="Interoperability Version" value={exifData.technical.interoperabilityVersion} />
                {exifData.thumbnail && Object.values(exifData.thumbnail).some(v => v) && (
                  <>
                    <div className="col-span-full">
                      <h4 className="text-sm font-medium text-blue-400 mb-2">Thumbnail Information</h4>
                    </div>
                    <MetadataField label="Thumbnail Compression" value={exifData.thumbnail.compression} />
                    <MetadataField label="Thumbnail X Resolution" value={exifData.thumbnail.xResolution} />
                    <MetadataField label="Thumbnail Y Resolution" value={exifData.thumbnail.yResolution} />
                    <MetadataField label="Thumbnail Resolution Unit" value={exifData.thumbnail.resolutionUnit} />
                    <MetadataField label="JPEG Interchange Format" value={exifData.thumbnail.jpegInterchangeFormat} />
                    <MetadataField label="JPEG Interchange Format Length" value={exifData.thumbnail.jpegInterchangeFormatLength} />
                  </>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
