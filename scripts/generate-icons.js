#!/usr/bin/env node
/**
 * Generate favicon and PWA icons from the Olive logo.
 * Run: node scripts/generate-icons.js
 * Requires: sharp, to-ico (install with npm install --save-dev sharp to-ico)
 *
 * Reads public/olive-logo.png and writes:
 * - public/icon-192.png, public/icon-512.png (PWA)
 * - app/favicon.ico (16x16 + 32x32)
 */

const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')
const appDir = path.join(root, 'src', 'app')
const sourcePath = path.join(publicDir, 'olive-logo.png')

async function main() {
  let sharp, toIco
  try {
    sharp = require('sharp')
    toIco = require('to-ico')
  } catch (e) {
    console.error('Missing dependencies. Run: npm install --save-dev sharp to-ico')
    process.exit(1)
  }

  if (!fs.existsSync(sourcePath)) {
    console.error('Source image not found:', sourcePath)
    process.exit(1)
  }

  const image = sharp(sourcePath)

  const sizes = [
    { w: 16, h: 16 },
    { w: 32, h: 32 },
    { w: 192, h: 192 },
    { w: 512, h: 512 },
  ]

  const png16 = await image.clone().resize(16, 16).png().toBuffer()
  const png32 = await image.clone().resize(32, 32).png().toBuffer()

  await fs.promises.writeFile(path.join(publicDir, 'icon-192.png'), await image.clone().resize(192, 192).png().toBuffer())
  await fs.promises.writeFile(path.join(publicDir, 'icon-512.png'), await image.clone().resize(512, 512).png().toBuffer())
  console.log('Wrote public/icon-192.png, public/icon-512.png')

  const ico = await toIco([png16, png32])
  const faviconPath = path.join(appDir, 'favicon.ico')
  await fs.promises.writeFile(faviconPath, ico)
  console.log('Wrote', faviconPath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
