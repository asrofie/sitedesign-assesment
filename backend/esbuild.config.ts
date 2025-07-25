import { build } from 'esbuild'

async function bundle() {
    await build({
        entryPoints: ['src/server.ts'],
        bundle: true,
        platform: 'node',
        target: 'node18',
        outdir: 'dist',
        minify: true,
        sourcemap: true,
        logLevel: 'info',
    });
}

bundle().catch((e) => {
    console.error(e);
    process.exit(1);
});