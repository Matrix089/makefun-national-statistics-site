# makefun-national-statistics-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Matrix089/makefun-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Matrix089/makefun-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

China in Figures — a national statistics site for China: population, economy, health, education and environment, 2014–2024, from the World Bank. Eight linked sections, hand-drawn SVG charts, working controls (chart ranges, a China-vs-world comparison, a searchable indicator list and a CSV download of all the data). Static files with no build step, nothing loaded over the network, and it works on a desktop and on a phone.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080. To hand the site in the way the bounty grades it:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Data

Every figure is a World Bank World Development Indicators series, retrieved 2026-11-26 and listed with its indicator code on the site's Sources page. Where the World Bank publishes no value for a year, the cell is left blank.

---

<sub>Entered on [make.fun](https://make.fun/?ref=see70vxv&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
