const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const galleries = [
  { src: 'Couples_Beach', dest: 'couples' },
  { src: 'Gym', dest: 'gym' },
  { src: 'Portraits', dest: 'portraits' },
  { src: 'Wedding', dest: 'wedding' },
  { src: 'Graduation', dest: 'graduation' },
];

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;

async function optimizeGallery({ src, dest }) {
  const srcDir = path.join(ROOT, src);
  const destDir = path.join(ROOT, 'public', 'img', 'galleries', dest);

  if (!fs.existsSync(srcDir)) {
    console.error(`Source directory not found: ${srcDir}`);
    return [];
  }

  fs.mkdirSync(destDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f =>
    /\.(jpe?g|png|webp)$/i.test(f)
  );

  const results = [];

  for (const file of files) {
    const inputPath = path.join(srcDir, file);
    const baseName = path.parse(file).name.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const outputName = `${baseName}.webp`;
    const outputPath = path.join(destDir, outputName);

    try {
      const metadata = await sharp(inputPath).metadata();
      const resizeWidth = metadata.width > MAX_WIDTH ? MAX_WIDTH : metadata.width;

      const result = await sharp(inputPath)
        .resize({ width: resizeWidth, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const entry = {
        gallery: dest,
        file: outputName,
        src: `/img/galleries/${dest}/${outputName}`,
        width: result.width,
        height: result.height,
        originalFile: file,
      };
      results.push(entry);
      console.log(`  ${file} -> ${outputName} (${result.width}x${result.height}, ${(result.size / 1024).toFixed(0)}KB)`);
    } catch (err) {
      console.error(`  ERROR processing ${file}: ${err.message}`);
    }
  }

  return results;
}

async function main() {
  const allResults = {};

  for (const gallery of galleries) {
    console.log(`\n=== Processing ${gallery.src} -> ${gallery.dest} ===`);
    const results = await optimizeGallery(gallery);
    allResults[gallery.dest] = results;
  }

  // Write a JSON manifest for easy reference
  const manifestPath = path.join(ROOT, 'scripts', 'image-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(allResults, null, 2));
  console.log(`\nManifest written to: ${manifestPath}`);
  console.log(`Total images processed: ${Object.values(allResults).flat().length}`);
}

main().catch(console.error);
