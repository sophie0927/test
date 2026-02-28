const phraseWall = document.getElementById('phraseWall');

const encouragements = [
  '你已经很棒了！',
  '今天也在发光 ✨',
  'You are doing great!',
  'Keep going, you are unstoppable!',
  'Tu es incroyable !',
  'Eres más fuerte de lo que crees.',
  'Du schaffst das!',
  'Sei stolz auf dich.',
  'あなたならできる！',
  '君の努力は必ず報われる。',
  '당신은 정말 멋져요!',
  '계속 나아가요, 잘하고 있어요!',
  'Você é capaz de coisas incríveis!',
  'Coragem, um passo de cada vez.',
  'Sei una meraviglia!',
  'Non mollare, ci sei quasi!',
  'Ты справишься!',
  'Ты делаешь это отлично!',
  'أنت رائع كما أنت!',
  'استمر، النجاح قريب.',
  'तुम कमाल हो!',
  'एक कदम और, तुम कर लोगे।',
  'Kamu hebat!',
  'Lanjutkan, kamu pasti bisa!',
  'Вы молодец!',
  'Sen harikasın!',
  'Jsi úžasný/á!',
  'Jesteś niesamowity/a!',
  'Jij kunt dit!',
  'Du är fantastisk!',
  'คุณทำได้แน่นอน!',
  'Bạn tuyệt vời lắm!',
  'Magaling ka!',
  'Sən bacararsan!',
  'Ndiyo, unaweza!',
  'Είσαι υπέροχος/η!',
  'את/ה אלוף/ה!',
  'Продовжуй, у тебе все вийде!',
  '你值得一切美好。',
  '勇敢一点，奇迹会出现。'
];

const livelyMorandiPalettes = [
  {
    background: ['#F5CFC2', '#BFE0CF', '#C8D7F3'],
    text: ['#5B4F5D', '#4F5F67', '#5F5A4D', '#4E6A64', '#6F6078', '#556B86']
  },
  {
    background: ['#F6D9C8', '#C3E2D5', '#CFD9F0'],
    text: ['#5A5567', '#4E6260', '#6A5C4E', '#4D6273', '#6F5E67', '#4F6C89']
  },
  {
    background: ['#F3D3D0', '#C8DEC8', '#CAD4EC'],
    text: ['#5C5365', '#4F655E', '#6A5A52', '#4E6070', '#665B77', '#54718B']
  },
  {
    background: ['#F7DCCB', '#C6DFD9', '#D2DBF4'],
    text: ['#5D5668', '#53665F', '#6D5E51', '#4C6375', '#5F637B', '#4F6F8E']
  },
  {
    background: ['#F4D6C7', '#C0E1D3', '#CDD8F2'],
    text: ['#5A5266', '#4F6663', '#6B5B50', '#506171', '#6A5E72', '#51708A']
  }
];

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function shuffle(array) {
  const copy = [...array];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function intersects(a, b, gap) {
  return !(
    a.right + gap < b.left ||
    a.left - gap > b.right ||
    a.bottom + gap < b.top ||
    a.top - gap > b.bottom
  );
}

function canPlace(rect, placedRects, gap) {
  return placedRects.every((existing) => !intersects(rect, existing, gap));
}

function applyPalette() {
  const palette = randomFrom(livelyMorandiPalettes);
  const root = document.documentElement;
  root.style.setProperty('--bg-1', palette.background[0]);
  root.style.setProperty('--bg-2', palette.background[1]);
  root.style.setProperty('--bg-3', palette.background[2]);
  return palette;
}

function createPhraseNode(text, palette) {
  const phrase = document.createElement('p');
  const fontSize = randomInRange(18, 64);
  const driftX = randomInRange(-3, 3);
  const driftY = randomInRange(-3, 3);
  const driftDuration = randomInRange(4.2, 8.6);
  const shimmerDuration = randomInRange(1.9, 4.2);
  const delay = randomInRange(0, 1.8);

  phrase.className = 'phrase';
  phrase.textContent = text;
  phrase.style.color = randomFrom(palette.text);
  phrase.style.fontSize = `${fontSize}px`;
  phrase.style.setProperty('--dx', `${driftX}px`);
  phrase.style.setProperty('--dy', `${driftY}px`);
  phrase.style.animationDuration = `${driftDuration}s, ${shimmerDuration}s`;
  phrase.style.animationDelay = `${delay}s, ${delay / 2}s`;
  phrase.style.visibility = 'hidden';

  return phrase;
}

function placeWithoutOverlap(phrase, placedRects, gap) {
  const wallWidth = phraseWall.clientWidth;
  const wallHeight = phraseWall.clientHeight;
  const textWidth = phrase.offsetWidth;
  const textHeight = phrase.offsetHeight;

  if (textWidth >= wallWidth || textHeight >= wallHeight) {
    phrase.remove();
    return false;
  }

  const attempts = 180;

  for (let tryIndex = 0; tryIndex < attempts; tryIndex += 1) {
    const left = randomInRange(0, wallWidth - textWidth);
    const top = randomInRange(0, wallHeight - textHeight);

    const rect = {
      left,
      top,
      right: left + textWidth,
      bottom: top + textHeight
    };

    if (canPlace(rect, placedRects, gap)) {
      phrase.style.left = `${left}px`;
      phrase.style.top = `${top}px`;
      phrase.style.visibility = 'visible';
      placedRects.push(rect);
      return true;
    }
  }

  phrase.remove();
  return false;
}

function renderPhraseWall() {
  phraseWall.innerHTML = '';
  const palette = applyPalette();
  const area = window.innerWidth * window.innerHeight;
  const targetCount = Math.max(40, Math.min(110, Math.floor(area / 17000)));
  const pool = shuffle(encouragements);
  const placedRects = [];
  const gap = 8;

  let index = 0;
  let created = 0;
  let safety = 0;

  while (created < targetCount && safety < targetCount * 6) {
    const text = pool[index % pool.length];
    const phrase = createPhraseNode(text, palette);
    phraseWall.append(phrase);

    if (placeWithoutOverlap(phrase, placedRects, gap)) {
      created += 1;
    }

    index += 1;
    safety += 1;
  const total = Math.max(45, Math.min(130, Math.floor(area / 14000)));

  for (let index = 0; index < total; index += 1) {
    const text = randomFrom(encouragements);
    phraseWall.append(createPhraseNode(text, palette));
  }
}

renderPhraseWall();
window.addEventListener('resize', renderPhraseWall);
