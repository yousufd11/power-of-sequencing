// The same three images are reused; only their order and context change.
const photos = {
  alone: { src: 'alone.jpg?v=2', alt: 'A solo mirror portrait in an elevator, wearing a dark Toronto hoodie.', label: 'Alone' },
  city: { src: 'city.jpg', alt: 'The illuminated CN Tower above the city at night.', label: 'The city' },
  together: { src: 'together.jpg', alt: 'A group seated around a table on an outdoor patio at night.', label: 'Together' }
};
const stories = [
  {
    "title": "Just for a bit",
    "order": [
      "alone",
      "city",
      "together"
    ],
    "headings": [
      "Almost stayed home.",
      "On my way.",
      "Glad I came."
    ],
    "captions": [
      "I was ready to go, but I almost stayed home.",
      "I told them I would only stay for an hour. I was already late.",
      "Someone makes room for me. I end up staying longer than I planned."
    ],
    "interpretation": "Alone → city → together. I start off unsure about going out and end up glad I went."
  },
  {
    "title": "Nobody wanted to leave",
    "order": [
      "together",
      "city",
      "alone"
    ],
    "headings": [
      "A little longer.",
      "Heading home.",
      "Just me again."
    ],
    "captions": [
      "We say we should leave, then keep talking.",
      "Everyone heads their own way. I stop to take one last photo.",
      "Back in the elevator. I wish we had stayed a little longer."
    ],
    "interpretation": "Together → city → alone. Now the same photos show the end of a good night. The elevator feels like coming home instead of heading out."
  }
];
const stages = ['Beginning', 'Middle', 'End'];
let currentVersion = 0;
let currentStep = 0;
const mainPhoto = document.querySelector('#main-photo');
const nextButton = document.querySelector('#next');
const previousButton = document.querySelector('#previous');
const versionButtons = document.querySelectorAll('[data-version]');
const filmstrip = document.querySelector('#filmstrip');

// DOM manipulation keeps the image, captions, progress and controls in sync.
function renderStory() {
  const story = stories[currentVersion];
  const photo = photos[story.order[currentStep]];
  mainPhoto.src = photo.src;
  mainPhoto.alt = photo.alt;
  document.querySelector('#story-version').textContent = `STORY 0${currentVersion + 1} · ${story.title.toUpperCase()}`;
  document.querySelector('#stage').textContent = `0${currentStep + 1} — ${stages[currentStep]}`;
  document.querySelector('#frame-label').textContent = `FRAME 0${currentStep + 1} / 03`;
  document.querySelector('#caption-title').textContent = story.headings[currentStep];
  document.querySelector('#caption').textContent = story.captions[currentStep];
  document.querySelector('#interpretation').textContent = story.interpretation;
  previousButton.disabled = currentStep === 0;
  nextButton.textContent = currentStep === 2 ? 'Start again' : 'Next →';
  versionButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === currentVersion)));
  document.querySelectorAll('.progress span').forEach((bar, index) => bar.classList.toggle('complete', index <= currentStep));
  filmstrip.querySelectorAll('.frame').forEach((button, index) => {
    if (index === currentStep) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
}

function buildFilmstrip() {
  filmstrip.replaceChildren();
  stories[currentVersion].order.forEach((key, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'frame';
    button.setAttribute('aria-label', `Go to ${stages[index].toLowerCase()}: ${photos[key].label}`);
    const image = document.createElement('img');
    image.src = photos[key].src;
    image.alt = '';
    const text = document.createElement('span');
    text.className = 'frame-text';
    const stage = document.createElement('small');
    stage.textContent = `0${index + 1} / ${stages[index].toUpperCase()}`;
    const label = document.createElement('span');
    label.textContent = photos[key].label;
    text.append(stage, label);
    button.append(image, text);
    button.addEventListener('click', () => { currentStep = index; renderStory(); });
    filmstrip.append(button);
  });
}
function changeVersion(version) {
  currentVersion = version;
  currentStep = 0;
  buildFilmstrip();
  renderStory();
}
function nextFrame() {
  currentStep = (currentStep + 1) % 3;
  renderStory();
}
function previousFrame() {
  currentStep = Math.max(0, currentStep - 1);
  renderStory();
}
// Event listeners connect user actions to the functions above.
versionButtons.forEach(button => button.addEventListener('click', () => changeVersion(Number(button.dataset.version))));
nextButton.addEventListener('click', nextFrame);
previousButton.addEventListener('click', previousFrame);
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); nextFrame(); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); previousFrame(); }
});
changeVersion(0);
