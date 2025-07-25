import fs from 'fs'
import path from 'path'

const prismaDir = path.resolve('src/generated/prisma')
const distDir = path.resolve('dist')

const files = fs.readdirSync(prismaDir)
const binary = files.find(f => f.endsWith('.node'))

if (binary) {
    const srcPath = path.join(prismaDir, binary)
    const destPath = path.join(distDir, binary)
    fs.copyFileSync(srcPath, destPath)
    console.log(`Copied Prisma engine binary: ${binary} -> dist/`)
} else {
    console.warn('Prisma binary not found in src/generated/prisma')
}
