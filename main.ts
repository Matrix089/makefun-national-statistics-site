// China in Figures — the hand-in program (Node 22, standard library only).
//
// The site itself is the plain static files under app/: index.html plus its
// JavaScript, CSS and data, with no build step and nothing loaded over the
// network. This program hands the site in: it copies app/ and screenshots/
// from beside this file into /output and writes /output/dossier.json, the
// summary the judge reads (the screenshots, the first load's files and
// bytes, and the site's source), using the make.fun library vendored
// unchanged at vendor/makefun-frontend.ts.
//
// The program runs twice and both runs must write the same bytes, so it
// copies and writes deterministically and nothing else.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The caps match the gate: at most 4 screenshots of 256 KiB, app/ within
// 993 files and 16 MiB, and the dossier text within 160 KiB.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
