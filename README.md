# NIGHT SHIFT — The Power of Sequencing

A simple interactive photo essay using the same three personal photographs in two orders.

- **Just for a bit:** alone → city → together. Solitude becomes companionship.
- **Nobody wanted to leave:** together → city → alone. Companionship becomes a memory.

Each story has a beginning, middle and end. These are fictional interpretations of the photographs, not a record of the subjects' feelings or chronology.

## Run
Open `index.html` in a browser. No dependencies or build step are needed.

## Interaction and technical focus
Choose either story, then use Next / Previous frame, the frame thumbnails, or the left/right arrow keys. The last frame offers Start again. Switching stories resets to the beginning.

`script.js` uses variables for the selected version and step, arrays for image order, functions for rendering and navigation, event listeners for clicks and keyboard input, and DOM manipulation for images, text, progress and accessible control states. CSS supports desktop and mobile layouts.

## Files
- `index.html`: page structure
- `style.css`: responsive styles
- `script.js`: interaction
- `alone.jpg`, `city.jpg`, `together.jpg`: the three photographs

## GitHub Pages submission
Upload all project files to the root of a GitHub repository. Use the commit message **Class Progress**. In repository Settings → Pages, publish from the `main` branch and `/ (root)` folder. Submit both the repository URL and the live Pages URL once deployment succeeds.

## Beginner-friendly code guide

There are no libraries, dependencies, or build tools. The two changing variables are `currentVersion` (which story) and `currentStep` (which frame). `photos` stores the image paths, and `stories` stores the two orders and captions.

- `renderStory()` updates the image, text, progress, and selected buttons.
- `buildFilmstrip()` makes the three clickable photo prints.
- `changeVersion()` selects a story and starts at the beginning.
- `nextFrame()` and `previousFrame()` move between images.
- The event listeners at the bottom run these functions when buttons or arrow keys are used.

