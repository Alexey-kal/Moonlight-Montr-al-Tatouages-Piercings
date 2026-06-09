import { spawn } from 'node:child_process';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imgOut = path.join(root, 'assets', 'images');
const vidOut = path.join(root, 'assets', 'videos');

const images = [
  ['owner.jpeg', 'lina-owner.jpg', { width: 1400, quality: 88 }],
  ['virgin mary.jpeg', 'sasha-virgin-mary.jpg', { width: 1400, quality: 88 }],
  ['flower.jpeg', 'rani-flower-back.jpg', { width: 1400, quality: 88 }],
  ['neck flower.jpeg', 'rani-flower-neck.jpg', { width: 1400, quality: 88 }],
  ['650111611_17939434830155458_4467568650336268728_n.jpeg', 'sasha-portraits.jpg', { width: 1200, quality: 88 }],
  ['657855939_18189481342370679_8284666364372723303_n.jpeg', 'sasha-at-work.jpg', { width: 1200, quality: 88 }],
];

const videos = [
  ['6962192-hd_1920_1080_25fps.mp4', 'hero.mp4'],
  ['owner video.mp4', 'lina-work.mp4'],
  ['beard men.mp4', 'sasha-beard.mp4'],
];

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath.path, args, { stdio: 'inherit' });
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exit ${code}`))));
  });
}

async function optimizeVideo(srcName, outName) {
  const input = path.join(root, srcName);
  const output = path.join(vidOut, outName);
  try {
    await stat(input);
  } catch {
    console.warn(`Skip missing video: ${srcName}`);
    return;
  }
  console.log(`Video: ${srcName} -> assets/videos/${outName}`);
  await runFfmpeg([
    '-y', '-i', input,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '22',
    '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-vf', 'scale=min(1920\\,iw):-2',
    '-an',
    output,
  ]);
}

async function optimizeImage(srcName, outName, opts) {
  const input = path.join(root, srcName);
  const output = path.join(imgOut, outName);
  try {
    await stat(input);
  } catch {
    console.warn(`Skip missing image: ${srcName}`);
    return;
  }
  console.log(`Image: ${srcName} -> assets/images/${outName}`);
  await sharp(input)
    .rotate()
    .resize({ width: opts.width, withoutEnlargement: true })
    .jpeg({ quality: opts.quality, mozjpeg: true })
    .toFile(output);
}

await mkdir(imgOut, { recursive: true });
await mkdir(vidOut, { recursive: true });

for (const [src, out, opts] of images) await optimizeImage(src, out, opts);
for (const [src, out] of videos) await optimizeVideo(src, out);

console.log('\nDone — optimized assets in assets/');
