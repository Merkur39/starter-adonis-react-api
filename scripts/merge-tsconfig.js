import { parse } from 'jsonc-parser';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootTsconfigPath = path.resolve(__dirname, '../tsconfig.json');
const appTsconfigPath = path.resolve(__dirname, '../client/tsconfig.app.json');
const outputPath = path.resolve(__dirname, '../client/tsconfig.generated.json');

const rootTsconfig = parse(fs.readFileSync(rootTsconfigPath, 'utf8'));
const appTsconfig = parse(fs.readFileSync(appTsconfigPath, 'utf8'));

// Rewrites root paths so that they are relative to the customer file
function adjustRootPaths(pathsObj) {
  const adjusted = {};
  for (const [key, value] of Object.entries(pathsObj)) {
    adjusted[key] = value.map((v) =>
      v.startsWith('./') ? v.replace('./', '../') : v
    );
  }
  return adjusted;
}

const adjustedRootPaths = adjustRootPaths(rootTsconfig.compilerOptions?.paths || {});

// Merges paths (app paths overwrite root paths in case of conflict)
const mergedPaths = {
  ...adjustedRootPaths,
  ...(appTsconfig.compilerOptions?.paths || {}),
};

// Merges compilerOptions
const mergedCompilerOptions = {
  ...(rootTsconfig.compilerOptions || {}),
  ...(appTsconfig.compilerOptions || {}),
  paths: mergedPaths,
};

// Keeps other app properties (extends, includes, etc.)
const mergedTsconfig = {
  ...appTsconfig,
  compilerOptions: mergedCompilerOptions,
};

// Writes the generated file
fs.writeFileSync(outputPath, JSON.stringify(mergedTsconfig, null, 2));

// Format the file with Prettier
async function formatWithPrettier() {
  const raw = fs.readFileSync(outputPath, 'utf8');
  const formatted = await prettier.format(raw, { parser: 'json' });
  fs.writeFileSync(outputPath, formatted);
  console.log(`✅ Fichier généré et formaté : ${outputPath}`);
}
formatWithPrettier();
