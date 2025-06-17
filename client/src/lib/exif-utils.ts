declare global {
  interface Window {
    EXIF: any;
  }
}

// Helper functions for metadata interpretation
function formatShutterSpeed(exposureTime: number | undefined): string | undefined {
  if (!exposureTime) return undefined;
  
  if (exposureTime >= 1) {
    return `${exposureTime}s`;
  } else {
    return `1/${Math.round(1 / exposureTime)}s`;
  }
}

function getExposureMode(mode: number | undefined): string | undefined {
  const modes: { [key: number]: string } = {
    0: 'Auto',
    1: 'Manual',
    2: 'Auto bracket',
  };
  return mode !== undefined ? modes[mode] : undefined;
}

function getWhiteBalance(wb: number | undefined): string | undefined {
  const balances: { [key: number]: string } = {
    0: 'Auto',
    1: 'Manual',
  };
  return wb !== undefined ? balances[wb] : undefined;
}

function getFlashMode(flash: number | undefined): string | undefined {
  if (flash === undefined) return undefined;
  
  if (flash & 0x01) {
    return 'Flash fired';
  } else {
    return 'No flash';
  }
}

function getColorSpace(colorSpace: number | undefined): string | undefined {
  const spaces: { [key: number]: string } = {
    1: 'sRGB',
    2: 'Adobe RGB',
    65535: 'Uncalibrated',
  };
  return colorSpace !== undefined ? spaces[colorSpace] : undefined;
}

function getCompression(compression: number | undefined): string | undefined {
  const compressions: { [key: number]: string } = {
    1: 'Uncompressed',
    6: 'JPEG (old-style)',
    7: 'JPEG',
    8: 'Adobe Deflate',
  };
  return compression !== undefined ? compressions[compression] : undefined;
}

function getMeteringMode(mode: number | undefined): string | undefined {
  const modes: { [key: number]: string } = {
    0: 'Unknown',
    1: 'Average',
    2: 'Center-weighted average',
    3: 'Spot',
    4: 'Multi-spot',
    5: 'Multi-segment',
    6: 'Partial',
    255: 'Other',
  };
  return mode !== undefined ? modes[mode] : undefined;
}

function getExposureProgram(program: number | undefined): string | undefined {
  const programs: { [key: number]: string } = {
    0: 'Not Defined',
    1: 'Manual',
    2: 'Program AE',
    3: 'Aperture-priority AE',
    4: 'Shutter-priority AE',
    5: 'Creative (Slow speed)',
    6: 'Action (High speed)',
    7: 'Portrait',
    8: 'Landscape',
    9: 'Bulb',
  };
  return program !== undefined ? programs[program] : undefined;
}

function getSceneCaptureType(type: number | undefined): string | undefined {
  const types: { [key: number]: string } = {
    0: 'Standard',
    1: 'Landscape',
    2: 'Portrait',
    3: 'Night',
  };
  return type !== undefined ? types[type] : undefined;
}

function getGainControl(gain: number | undefined): string | undefined {
  const gains: { [key: number]: string } = {
    0: 'None',
    1: 'Low gain up',
    2: 'High gain up',
    3: 'Low gain down',
    4: 'High gain down',
  };
  return gain !== undefined ? gains[gain] : undefined;
}

function getContrast(contrast: number | undefined): string | undefined {
  const contrasts: { [key: number]: string } = {
    0: 'Normal',
    1: 'Low',
    2: 'High',
  };
  return contrast !== undefined ? contrasts[contrast] : undefined;
}

function getSaturation(saturation: number | undefined): string | undefined {
  const saturations: { [key: number]: string } = {
    0: 'Normal',
    1: 'Low',
    2: 'High',
  };
  return saturation !== undefined ? saturations[saturation] : undefined;
}

function getSharpness(sharpness: number | undefined): string | undefined {
  const sharpnesses: { [key: number]: string } = {
    0: 'Normal',
    1: 'Soft',
    2: 'Hard',
  };
  return sharpness !== undefined ? sharpnesses[sharpness] : undefined;
}

function getFocalPlaneResolutionUnit(unit: number | undefined): string | undefined {
  const units: { [key: number]: string } = {
    1: 'None',
    2: 'inches',
    3: 'cm',
    4: 'mm',
    5: 'μm',
  };
  return unit !== undefined ? units[unit] : undefined;
}

function getSubjectDistanceRange(range: number | undefined): string | undefined {
  const ranges: { [key: number]: string } = {
    0: 'Unknown',
    1: 'Macro',
    2: 'Close',
    3: 'Distant',
  };
  return range !== undefined ? ranges[range] : undefined;
}

function formatGPSTime(timeArray: number[]): string | undefined {
  if (!Array.isArray(timeArray) || timeArray.length < 3) return undefined;
  const [hours, minutes, seconds] = timeArray;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(Math.floor(seconds)).padStart(2, '0')}`;
}

function getGPSDifferential(diff: number | undefined): string | undefined {
  const diffs: { [key: number]: string } = {
    0: 'No correction',
    1: 'Differential corrected',
  };
  return diff !== undefined ? diffs[diff] : undefined;
}

function getPhotometricInterpretation(interpretation: number | undefined): string | undefined {
  const interpretations: { [key: number]: string } = {
    0: 'WhiteIsZero',
    1: 'BlackIsZero',
    2: 'RGB',
    3: 'RGB Palette',
    4: 'Transparency Mask',
    5: 'CMYK',
    6: 'YCbCr',
    8: 'CIELab',
  };
  return interpretation !== undefined ? interpretations[interpretation] : undefined;
}

function getOrientation(orientation: number | undefined): string | undefined {
  const orientations: { [key: number]: string } = {
    1: 'Normal',
    2: 'Flip horizontal',
    3: 'Rotate 180°',
    4: 'Flip vertical',
    5: 'Rotate 90° CCW, flip vertical',
    6: 'Rotate 90° CW',
    7: 'Rotate 90° CW, flip vertical',
    8: 'Rotate 90° CCW',
  };
  return orientation !== undefined ? orientations[orientation] : undefined;
}

function getPlanarConfiguration(config: number | undefined): string | undefined {
  const configs: { [key: number]: string } = {
    1: 'Chunky',
    2: 'Planar',
  };
  return config !== undefined ? configs[config] : undefined;
}

function getYCbCrPositioning(positioning: number | undefined): string | undefined {
  const positionings: { [key: number]: string } = {
    1: 'Centered',
    2: 'Co-sited',
  };
  return positioning !== undefined ? positionings[positioning] : undefined;
}

function getFileSource(source: number | undefined): string | undefined {
  const sources: { [key: number]: string } = {
    1: 'Film scanner',
    2: 'Reflection print scanner',
    3: 'Digital camera',
  };
  return source !== undefined ? sources[source] : undefined;
}

function getSceneType(type: number | undefined): string | undefined {
  return type === 1 ? 'Directly photographed' : undefined;
}

function getCustomRendered(rendered: number | undefined): string | undefined {
  const rendereds: { [key: number]: string } = {
    0: 'Normal',
    1: 'Custom',
  };
  return rendered !== undefined ? rendereds[rendered] : undefined;
}

function getSensingMethod(method: number | undefined): string | undefined {
  const methods: { [key: number]: string } = {
    1: 'Not defined',
    2: 'One-chip color area',
    3: 'Two-chip color area',
    4: 'Three-chip color area',
    5: 'Color sequential area',
    7: 'Trilinear',
    8: 'Color sequential linear',
  };
  return method !== undefined ? methods[method] : undefined;
}

function convertDMSToDD(dms: number[], ref: string): number {
  let dd = dms[0] + dms[1]/60 + dms[2]/3600;
  if (ref === "S" || ref === "W") dd = dd * -1;
  return dd;
}

export interface ExifData {
  camera: {
    make?: string;
    model?: string;
    software?: string;
    serialNumber?: string;
    firmwareVersion?: string;
    bodySerialNumber?: string;
    lensSerialNumber?: string;
  };
  lens: {
    model?: string;
    focalLength?: string;
    focalLengthIn35mm?: string;
    maxAperture?: string;
    minFocalLength?: string;
    maxFocalLength?: string;
    lensInfo?: string;
  };
  exposure: {
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
    exposureMode?: string;
    whiteBalance?: string;
    flash?: string;
    meteringMode?: string;
    exposureBias?: string;
    exposureProgram?: string;
    sceneCaptureType?: string;
    gainControl?: string;
    contrast?: string;
    saturation?: string;
    sharpness?: string;
    digitalZoomRatio?: string;
    focalPlaneXResolution?: string;
    focalPlaneYResolution?: string;
    focalPlaneResolutionUnit?: string;
    subjectDistance?: string;
    subjectArea?: string;
    subjectDistanceRange?: string;
  };
  location: {
    coordinates?: string;
    altitude?: string;
    latitude?: number;
    longitude?: number;
    gpsTimeStamp?: string;
    gpsDateStamp?: string;
    gpsProcessingMethod?: string;
    gpsAreaInformation?: string;
    gpsDifferential?: string;
    gpsImgDirection?: string;
    gpsImgDirectionRef?: string;
    gpsDestBearing?: string;
    gpsDestBearingRef?: string;
    gpsSpeed?: string;
    gpsSpeedRef?: string;
    gpsTrack?: string;
    gpsTrackRef?: string;
  };
  technical: {
    colorSpace?: string;
    resolution?: string;
    bitDepth?: string;
    compression?: string;
    photometricInterpretation?: string;
    orientation?: string;
    planarConfiguration?: string;
    yCbCrCoefficients?: string;
    yCbCrPositioning?: string;
    referenceBlackWhite?: string;
    pixelXDimension?: string;
    pixelYDimension?: string;
    compressedBitsPerPixel?: string;
    fileSource?: string;
    sceneType?: string;
    customRendered?: string;
    exifVersion?: string;
    flashpixVersion?: string;
    componentsConfiguration?: string;
    makerNote?: string;
    userComment?: string;
    relatedSoundFile?: string;
    imageUniqueID?: string;
    cameraOwnerName?: string;
    lensMake?: string;
    copyright?: string;
    artist?: string;
    hostComputer?: string;
    sensingMethod?: string;
    cfaPattern?: string;
    spectralSensitivity?: string;
    oecf?: string;
    spatialFrequencyResponse?: string;
    noise?: string;
    focalPlaneResolutionUnit2?: string;
    subjectLocation?: string;
    exposureIndex?: string;
    tiff_ep?: string;
    interoperabilityIndex?: string;
    interoperabilityVersion?: string;
  };
  dateTime?: string;
  dateTimeOriginal?: string;
  dateTimeDigitized?: string;
  width?: number;
  height?: number;
  thumbnail?: {
    compression?: string;
    xResolution?: string;
    yResolution?: string;
    resolutionUnit?: string;
    jpegInterchangeFormat?: string;
    jpegInterchangeFormatLength?: string;
  };
}

export function extractExifData(file: File): Promise<ExifData | null> {
  return new Promise((resolve) => {
    if (!window.EXIF) {
      console.error('EXIF library not loaded');
      resolve(null);
      return;
    }

    window.EXIF.getData(file, function(this: any) {
      const allMetaData = window.EXIF.getAllTags(this);
      
      if (Object.keys(allMetaData).length === 0) {
        resolve(null);
        return;
      }

      const exifData: ExifData = {
        camera: {
          make: allMetaData.Make,
          model: allMetaData.Model,
          software: allMetaData.Software,
          serialNumber: allMetaData.SerialNumber,
          firmwareVersion: allMetaData.FirmwareVersion,
          bodySerialNumber: allMetaData.BodySerialNumber,
          lensSerialNumber: allMetaData.LensSerialNumber,
        },
        lens: {
          model: allMetaData.LensModel,
          focalLength: allMetaData.FocalLength ? `${allMetaData.FocalLength}mm` : undefined,
          focalLengthIn35mm: allMetaData.FocalLengthIn35mmFormat ? `${allMetaData.FocalLengthIn35mmFormat}mm` : undefined,
          maxAperture: allMetaData.MaxApertureValue ? `f/${allMetaData.MaxApertureValue}` : undefined,
          minFocalLength: allMetaData.MinFocalLength ? `${allMetaData.MinFocalLength}mm` : undefined,
          maxFocalLength: allMetaData.MaxFocalLength ? `${allMetaData.MaxFocalLength}mm` : undefined,
          lensInfo: allMetaData.LensInfo,
        },
        exposure: {
          aperture: allMetaData.FNumber ? `f/${allMetaData.FNumber}` : undefined,
          shutterSpeed: formatShutterSpeed(allMetaData.ExposureTime),
          iso: allMetaData.ISOSpeedRatings?.toString() || allMetaData.ISO?.toString(),
          exposureMode: getExposureMode(allMetaData.ExposureMode),
          whiteBalance: getWhiteBalance(allMetaData.WhiteBalance),
          flash: getFlashMode(allMetaData.Flash),
          meteringMode: getMeteringMode(allMetaData.MeteringMode),
          exposureBias: allMetaData.ExposureBiasValue ? `${allMetaData.ExposureBiasValue} EV` : undefined,
          exposureProgram: getExposureProgram(allMetaData.ExposureProgram),
          sceneCaptureType: getSceneCaptureType(allMetaData.SceneCaptureType),
          gainControl: getGainControl(allMetaData.GainControl),
          contrast: getContrast(allMetaData.Contrast),
          saturation: getSaturation(allMetaData.Saturation),
          sharpness: getSharpness(allMetaData.Sharpness),
          digitalZoomRatio: allMetaData.DigitalZoomRatio ? `${allMetaData.DigitalZoomRatio}x` : undefined,
          focalPlaneXResolution: allMetaData.FocalPlaneXResolution?.toString(),
          focalPlaneYResolution: allMetaData.FocalPlaneYResolution?.toString(),
          focalPlaneResolutionUnit: getFocalPlaneResolutionUnit(allMetaData.FocalPlaneResolutionUnit),
          subjectDistance: allMetaData.SubjectDistance ? `${allMetaData.SubjectDistance}m` : undefined,
          subjectArea: allMetaData.SubjectArea ? allMetaData.SubjectArea.toString() : undefined,
          subjectDistanceRange: getSubjectDistanceRange(allMetaData.SubjectDistanceRange),
        },
        location: {
          latitude: undefined,
          longitude: undefined,
          gpsTimeStamp: allMetaData.GPSTimeStamp ? formatGPSTime(allMetaData.GPSTimeStamp) : undefined,
          gpsDateStamp: allMetaData.GPSDateStamp,
          gpsProcessingMethod: allMetaData.GPSProcessingMethod,
          gpsAreaInformation: allMetaData.GPSAreaInformation,
          gpsDifferential: allMetaData.GPSDifferential ? getGPSDifferential(allMetaData.GPSDifferential) : undefined,
          gpsImgDirection: allMetaData.GPSImgDirection ? `${allMetaData.GPSImgDirection}°` : undefined,
          gpsImgDirectionRef: allMetaData.GPSImgDirectionRef,
          gpsDestBearing: allMetaData.GPSDestBearing ? `${allMetaData.GPSDestBearing}°` : undefined,
          gpsDestBearingRef: allMetaData.GPSDestBearingRef,
          gpsSpeed: allMetaData.GPSSpeed ? `${allMetaData.GPSSpeed}` : undefined,
          gpsSpeedRef: allMetaData.GPSSpeedRef,
          gpsTrack: allMetaData.GPSTrack ? `${allMetaData.GPSTrack}°` : undefined,
          gpsTrackRef: allMetaData.GPSTrackRef,
        },
        technical: {
          colorSpace: getColorSpace(allMetaData.ColorSpace),
          resolution: allMetaData.XResolution ? `${allMetaData.XResolution} DPI` : undefined,
          bitDepth: allMetaData.BitsPerSample ? `${allMetaData.BitsPerSample} bits per channel` : undefined,
          compression: getCompression(allMetaData.Compression),
          photometricInterpretation: getPhotometricInterpretation(allMetaData.PhotometricInterpretation),
          orientation: getOrientation(allMetaData.Orientation),
          planarConfiguration: getPlanarConfiguration(allMetaData.PlanarConfiguration),
          yCbCrCoefficients: allMetaData.YCbCrCoefficients ? allMetaData.YCbCrCoefficients.toString() : undefined,
          yCbCrPositioning: getYCbCrPositioning(allMetaData.YCbCrPositioning),
          referenceBlackWhite: allMetaData.ReferenceBlackWhite ? allMetaData.ReferenceBlackWhite.toString() : undefined,
          pixelXDimension: allMetaData.PixelXDimension?.toString(),
          pixelYDimension: allMetaData.PixelYDimension?.toString(),
          compressedBitsPerPixel: allMetaData.CompressedBitsPerPixel?.toString(),
          fileSource: getFileSource(allMetaData.FileSource),
          sceneType: getSceneType(allMetaData.SceneType),
          customRendered: getCustomRendered(allMetaData.CustomRendered),
          exifVersion: allMetaData.ExifVersion,
          flashpixVersion: allMetaData.FlashpixVersion,
          componentsConfiguration: allMetaData.ComponentsConfiguration,
          makerNote: allMetaData.MakerNote ? 'Present' : undefined,
          userComment: allMetaData.UserComment,
          relatedSoundFile: allMetaData.RelatedSoundFile,
          imageUniqueID: allMetaData.ImageUniqueID,
          cameraOwnerName: allMetaData.CameraOwnerName,
          lensMake: allMetaData.LensMake,
          copyright: allMetaData.Copyright,
          artist: allMetaData.Artist,
          hostComputer: allMetaData.HostComputer,
          sensingMethod: getSensingMethod(allMetaData.SensingMethod),
          cfaPattern: allMetaData.CFAPattern,
          spectralSensitivity: allMetaData.SpectralSensitivity,
          oecf: allMetaData.OECF,
          spatialFrequencyResponse: allMetaData.SpatialFrequencyResponse,
          noise: allMetaData.Noise,
          focalPlaneResolutionUnit2: allMetaData.FocalPlaneResolutionUnit?.toString(),
          subjectLocation: allMetaData.SubjectLocation ? allMetaData.SubjectLocation.toString() : undefined,
          exposureIndex: allMetaData.ExposureIndex?.toString(),
          tiff_ep: allMetaData.TIFF_EP?.toString(),
          interoperabilityIndex: allMetaData.InteroperabilityIndex,
          interoperabilityVersion: allMetaData.InteroperabilityVersion,
        },
        dateTime: allMetaData.DateTime,
        dateTimeOriginal: allMetaData.DateTimeOriginal,
        dateTimeDigitized: allMetaData.DateTimeDigitized,
        width: allMetaData.PixelXDimension || allMetaData.ExifImageWidth,
        height: allMetaData.PixelYDimension || allMetaData.ExifImageHeight,
        thumbnail: {
          compression: allMetaData.ThumbnailCompression?.toString(),
          xResolution: allMetaData.ThumbnailXResolution?.toString(),
          yResolution: allMetaData.ThumbnailYResolution?.toString(),
          resolutionUnit: allMetaData.ThumbnailResolutionUnit?.toString(),
          jpegInterchangeFormat: allMetaData.ThumbnailJPEGInterchangeFormat?.toString(),
          jpegInterchangeFormatLength: allMetaData.ThumbnailJPEGInterchangeFormatLength?.toString(),
        },
      };

      // Format GPS coordinates
      if (allMetaData.GPSLatitude && allMetaData.GPSLongitude) {
        let lat: number, lon: number;
        
        // Handle different GPS coordinate formats
        if (Array.isArray(allMetaData.GPSLatitude)) {
          lat = convertDMSToDD(allMetaData.GPSLatitude, allMetaData.GPSLatitudeRef);
          lon = convertDMSToDD(allMetaData.GPSLongitude, allMetaData.GPSLongitudeRef);
        } else {
          // Already in decimal degrees
          lat = allMetaData.GPSLatitude;
          lon = allMetaData.GPSLongitude;
          if (allMetaData.GPSLatitudeRef === 'S') lat = -lat;
          if (allMetaData.GPSLongitudeRef === 'W') lon = -lon;
        }
        
        exifData.location.latitude = lat;
        exifData.location.longitude = lon;
        exifData.location.coordinates = `${lat.toFixed(4)}°${allMetaData.GPSLatitudeRef || (lat >= 0 ? 'N' : 'S')}, ${lon.toFixed(4)}°${allMetaData.GPSLongitudeRef || (lon >= 0 ? 'E' : 'W')}`;
      }

      if (allMetaData.GPSAltitude) {
        exifData.location.altitude = `${allMetaData.GPSAltitude}m above sea level`;
      }

      resolve(exifData);
    });
  });
}

export function generateMetadataReport(exifData: ExifData, filename: string): string {
  const sections = [
    { title: 'Camera Information', data: exifData.camera },
    { title: 'Lens Information', data: exifData.lens },
    { title: 'Exposure Settings', data: exifData.exposure },
    { title: 'Location Data', data: exifData.location },
    { title: 'Technical Details', data: exifData.technical },
    { title: 'Thumbnail Information', data: exifData.thumbnail },
  ];

  let report = `EXIF Metadata Report\n`;
  report += `========================\n`;
  report += `File: ${filename}\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;

  if (exifData.dateTimeOriginal || exifData.dateTime) {
    report += `Date Taken: ${exifData.dateTimeOriginal || exifData.dateTime}\n`;
  }
  
  if (exifData.dateTimeDigitized) {
    report += `Date Digitized: ${exifData.dateTimeDigitized}\n`;
  }
  
  if (exifData.width && exifData.height) {
    report += `Dimensions: ${exifData.width} × ${exifData.height}\n`;
  }

  report += `\n`;

  sections.forEach(section => {
    const hasData = Object.values(section.data || {}).some(value => value !== undefined && value !== '');
    if (hasData) {
      report += `${section.title}\n`;
      report += `${'-'.repeat(section.title.length)}\n`;
      
      Object.entries(section.data || {}).forEach(([key, value]) => {
        if (value && value !== '') {
          const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          report += `${label}: ${value}\n`;
        }
      });
      report += `\n`;
    }
  });

  return report;
}