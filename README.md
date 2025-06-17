# EXIF Metadata Reader

A comprehensive web-based EXIF metadata reader that extracts and displays extensive metadata from digital photos, similar to exif.tools but with enhanced privacy and features.

## Features

- **Comprehensive Metadata Extraction**: Extracts 70+ metadata fields from digital photos
- **Privacy-First**: All processing happens client-side - no uploads or data storage
- **Interactive GPS Maps**: View photo locations on embedded OpenStreetMap with Google Maps integration
- **Dark Theme**: Professional dark interface optimized for metadata viewing
- **Organized Display**: 5 tabs organizing metadata into Camera, Exposure, Location, Technical, and Advanced sections
- **Export Functionality**: Download detailed metadata reports

## Metadata Categories

### Camera Information
- Camera make, model, serial numbers
- Firmware version, software details
- Owner information and copyright

### Exposure Settings
- Aperture, shutter speed, ISO
- Exposure modes and programs
- Metering modes, white balance
- Flash settings, scene capture types
- Image enhancement settings (contrast, saturation, sharpness)

### Location Data
- GPS coordinates with interactive maps
- Altitude, timestamps, processing methods
- Direction, speed, and tracking information

### Technical Details
- Lens information and specifications
- Color spaces and bit depths
- File compression and encoding
- Image orientation and dimensions

### Advanced Metadata
- Photometric interpretation
- TIFF technical specifications
- Manufacturer-specific data
- Thumbnail information

## Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI components
- **EXIF Processing**: exif-js library
- **Maps**: OpenStreetMap with Google Maps integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/exif-metadata-reader.git
cd exif-metadata-reader
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5000 in your browser

## Usage

1. **Upload Image**: Drag and drop or click to select a photo file
2. **View Metadata**: Browse through the 5 organized tabs of metadata
3. **Explore Location**: If GPS data exists, view the interactive map
4. **Export Report**: Download a comprehensive metadata report

## Privacy & Security

- **No Server Uploads**: All image processing happens in your browser
- **No Data Storage**: Images and metadata are never stored or transmitted
- **Client-Side Only**: Complete privacy protection for your photos
- **No Analytics**: No tracking or data collection

## Supported File Formats

- JPEG/JPG (with EXIF data)
- TIFF
- Raw formats with embedded EXIF

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [exif-js](https://github.com/exif-js/exif-js) for EXIF data extraction
- [OpenStreetMap](https://www.openstreetmap.org/) for map tiles
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Deployment

### GitHub Pages

This project can be deployed to GitHub Pages:

1. Push your code to GitHub
2. Go to Repository Settings → Pages
3. Select source: GitHub Actions
4. The site will be available at `https://yourusername.github.io/exif-metadata-reader`

### Vercel/Netlify

One-click deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/exif-metadata-reader)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/exif-metadata-reader)