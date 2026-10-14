// Installs the packed tarball into a throwaway project and renders every
// component through both the ESM and CJS entry points, the way a consumer would.
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'simple-virtualization-smoke-'));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const reactVersion = process.env.SMOKE_REACT_VERSION || '18';

function run(cmd, args, cwd) {
  execFileSync(cmd, args, { cwd, stdio: 'inherit' });
}

const shared = `
const tree = React.createElement('div', null,
  React.createElement(lib.Virtualization, {
    items: ['<b>html</b>', React.createElement('span', null, 'element'), ({ index }) => 'fn ' + index],
  }),
  React.createElement(lib.VirtualizationGrid, {
    dimensions: { rowCount: 3, columnCount: 3 },
    renderCell: (r, c) => r + ':' + c,
  }),
  React.createElement(lib.VirtualizationTable, {
    data: [{ id: 1 }, { id: 2 }],
    Header: () => React.createElement('div', null, 'header'),
    Row: ({ item }) => React.createElement('div', null, 'row ' + item.id),
  })
);
const html = renderToString(tree);
for (const expected of ['<b>html</b>', 'element', 'fn 2', '0:0', 'header']) {
  if (!html.includes(expected)) throw new Error('Missing "' + expected + '" in output:\\n' + html);
}
console.log('ok:', entry);
`;

try {
  const packOutput = execFileSync(npm, ['pack', '--json', '--pack-destination', workDir], {
    cwd: root,
    encoding: 'utf8',
  });
  const tarball = path.join(workDir, JSON.parse(packOutput)[0].filename);

  fs.writeFileSync(path.join(workDir, 'package.json'), JSON.stringify({ name: 'smoke', private: true }));
  run(npm, ['install', '--no-audit', '--no-fund', `react@${reactVersion}`, `react-dom@${reactVersion}`, tarball], workDir);

  fs.writeFileSync(
    path.join(workDir, 'esm.mjs'),
    `import * as React from 'react';
import { renderToString } from 'react-dom/server';
import * as lib from 'simple-virtualization';
const entry = 'esm';
${shared}`
  );
  fs.writeFileSync(
    path.join(workDir, 'cjs.cjs'),
    `const React = require('react');
const { renderToString } = require('react-dom/server');
const lib = require('simple-virtualization');
const entry = 'cjs';
${shared}`
  );

  run(process.execPath, ['esm.mjs'], workDir);
  run(process.execPath, ['cjs.cjs'], workDir);
} finally {
  fs.rmSync(workDir, { recursive: true, force: true });
}
