import fs from 'fs';
import YAML from 'yamljs';
import path from 'path';

function buildSwagger() {
  const main = YAML.load(path.join(process.cwd(), 'docs/swagger/swagger.yaml'));
  fs.writeFileSync(
      path.join(process.cwd(), 'dist/swagger.json'),
      JSON.stringify(main, null, 2)
  );
  console.log('Swagger JSON successfully generated at dist/swagger.json');

}

buildSwagger();
