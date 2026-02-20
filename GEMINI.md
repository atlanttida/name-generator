# Project Context

## Overview
This is a static website project for `www.nickname-generator.net`. The site is built using Node.js, Handlebars (hbs), and Sass.

## Directory Structure
- `docs/`: **DO NOT EDIT**. This is the compiled output directory for the website. Files here are overwritten during the build process.
- `pages/docs/`: Source HTML/Handlebars templates for the website pages. Edit these files to change content.
- `pages/partials/`: Handlebars partials used in the pages.
- `scss/`: Source Sass files for styling.
- `js/`: Source JavaScript files.
- `lib/`: Helper libraries and data for name generation.
- `build-pages.js`: The main script for building HTML pages from templates.

## Build & Run
- **Build**: `npm run build`
  - Compiles SCSS to CSS.
  - Bundles JS with Browserify.
  - Generates HTML pages using `build-pages.js`.
- **Development**: `npm start`
  - Runs a local server and watches for changes in `js`, `scss`, and `html` files, rebuilding automatically.
- **Serve**: `npm run server`
  - Serves the `docs/` folder using `http-server`.

## Conventions
- **Content**: Edit content in `pages/docs/`.
- **Logic**: Build logic is in `build-pages.js`. Helper functions are in `lib/`.
- **Styling**: Edit `scss/main.scss` or other files in `scss/`. Do not edit `docs/css/style.min.css` directly.
- **Templating**: Uses Handlebars helpers (defined in `build-pages.js`) and partials.

## Key Files
- `build-pages.js`: Handles the HTML generation logic, registers HBS helpers, and manages pagination/sitemaps.
- `package.json`: Defines scripts and dependencies.
