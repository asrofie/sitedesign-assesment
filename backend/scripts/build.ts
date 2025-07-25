// import { execa } from 'execa';
import fs from 'fs-extra';

async function build() {
    const execa = (await import('execa')).execaCommand;
    console.log('Generating Prisma client...');
    await execa('prisma', ['format'], { stdio: 'inherit' });
    await execa('prisma', ['generate'], { stdio: 'inherit' });

    console.log('Running esbuild...');
    await execa('ts-node', ['esbuild.config.ts'], { stdio: 'inherit' });

    console.log('Building Swagger...');
    await execa('ts-node', ['scripts/build-swagger.ts'], { stdio: 'inherit' });

    console.log('Copying Prisma binary...');
    await execa('ts-node', ['scripts/copyPrismaBinary.ts'], { stdio: 'inherit' });

    console.log('Copying Swagger UI...');
    await fs.copy('node_modules/swagger-ui-dist/', 'dist/swagger-ui-dist');

    console.log('Patching Swagger initializer...');
    await execa('ts-node', ['scripts/patchSwaggerUI.ts'], { stdio: 'inherit' });

    console.log('Build complete.');
}

(async (): Promise<void> => {
    try {
        await build();
    }
    catch(e) {
        console.error('Build failed:', e);
        process.exit(1);
    }

})();