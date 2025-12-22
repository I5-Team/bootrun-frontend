const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../src/assets/images');
const files = [
    'banner-main-1.png',
    'banner-main-2.png',
    'banner-main-3.png'
];

const processImages = async () => {
    console.log('Starting image optimization...');

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const filename = path.parse(file).name; // e.g., 'banner-main-1'

        if (!fs.existsSync(inputPath)) {
            console.warn(`File not found: ${inputPath}`);
            continue;
        }

        try {
            // 1. Desktop WebP (Original Size, Quality 80)
            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(path.join(inputDir, `${filename}-desktop.webp`));
            console.log(`Generated: ${filename}-desktop.webp`);

            // 2. Mobile WebP (Width 400px for better LCP, Quality 80)
            await sharp(inputPath)
                .resize({ width: 400 })
                .webp({ quality: 80 })
                .toFile(path.join(inputDir, `${filename}-mobile.webp`));
            console.log(`✅ Generated: ${filename}-mobile.webp`);

        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }

    console.log('Image optimization complete!');
};

processImages();
