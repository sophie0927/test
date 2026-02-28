const phraseWall = document.getElementById('phraseWall');

const encouragements = [
  '你真的很棒！',
  '今天也要为自己骄傲。',
  '你值得被温柔以待。',
  '慢一点也没关系，你在前进。',
  'Keep going, you are amazing!',
  'You are enough, just as you are.',
  'Small steps are still progress.',
  'Shine in your own way ✨',
  'Tu es formidable !',
  'Tu avances très bien, courage !',
  'Eres increíble, sigue así.',
  'Todo va a salir bien.',
  'Du schaffst das, jeden Tag ein bisschen mehr!',
  'Sei stolz auf deinen Weg.',
  'あなたはそのままで素敵です。',
  '大丈夫、きっとうまくいく。',
  '당신은 정말 소중한 사람이에요.',
  '천천히 가도 괜찮아요.',
  'Você consegue, continue!',
  'Você ilumina o mundo ao seu redor.',
  'Sei una meraviglia.',
  'Vai avanti, ce la fai!',
  'Ты справишься, я верю в тебя!',
  'Ты уже молодец.',
  'أنت قادر على تحقيقها.',
  'كل خطوة صغيرة لها معنى.',
  'तुम कमाल हो, ऐसे ही चलते रहो।',
  'हर दिन एक नई शुरुआत है।',
  'Kamu hebat, tetap semangat!',
  'Jangan menyerah, kamu bisa.',
  'Bạn làm tốt lắm!',
  'Cứ bình tĩnh, bạn sẽ làm được.',
  'คุณเก่งมากนะ!',
  'ไปต่อเลย คุณทำได้แน่นอน',
  'Jij doet het geweldig!',
  'Du är fantastisk precis som du är.',
  'Jesteś silniejszy/silniejsza niż myślisz.',
  'Sen harikasın, devam et!',
  'את/ה מדהים/ה בדיוק כמו שאת/ה.',
  'Είσαι υπέροχος/η!'
];

const warmPalettes = [
  {
    background: ['#ffe7dc', '#ffd8cc', '#ffeede'],
    text: ['#8f4f5d', '#7d5f8c', '#5b6e8b', '#8a6a45', '#5b7f73', '#9b5c4c']
  },
  {
    background: ['#ffe3d7', '#ffeccf', '#ffe8e2'],
    text: ['#91545f', '#746192', '#5e738d', '#916a48', '#5f7b70', '#a15e4f']
  },
  {
    background: ['#ffe9e0', '#ffe4d2', '#fff1e8'],
    text: ['#8b4f67', '#6f5f8a', '#5a6f86', '#876943', '#5a7a69', '#9a5949']
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
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function intersects(a, b, gap) {
  return !(a.right + gap <= b.left || a.left >= b.right + gap || a.bottom + gap <= b.top || a.top >= b.bottom + gap);
}

function canPlace(rect, placedRects, gap) {
  return placedRects.every((existing) => !intersects(rect, existing, gap));
}

function applyPalette() {
  const palette = randomFrom(warmPalettes);
  const root = document.documentElement;
  root.style.setProperty('--bg-1', palette.background[0]);
  root.style.setProperty('--bg-2', palette.background[1]);
  root.style.setProperty('--bg-3', palette.background[2]);
  return palette;
}

function createPhraseNode(text, palette) {
  const phrase = document.createElement('p');
  const fontSize = randomInRange(18, 62);
  const driftX = randomInRange(-4, 4);
  const driftY = randomInRange(-4, 4);
  const driftDuration = randomInRange(5, 10);
  const shimmerDuration = randomInRange(2.4, 4.8);
  const delay = randomInRange(0, 1.5);

  phrase.className = 'phrase';
  phrase.textContent = text;
  phrase.style.fontSize = `${fontSize}px`;
  phrase.style.color = randomFrom(palette.text);
  phrase.style.letterSpacing = `${randomInRange(0, 1).toFixed(2)}px`;
  phrase.style.fontWeight = `${Math.floor(randomInRange(600, 850))}`;
  phrase.style.setProperty('--dx', `${driftX}px`);
  phrase.style.setProperty('--dy', `${driftY}px`);
  phrase.style.animationDuration = `${driftDuration}s, ${shimmerDuration}s`;
  phrase.style.animationDelay = `${delay}s, ${delay / 2}s`;
  phrase.style.visibility = 'hidden';

  return phrase;
}

function placeWithoutOverlap(node, placedRects, gap) {
  const wallWidth = phraseWall.clientWidth;
  const wallHeight = phraseWall.clientHeight;
  const width = node.offsetWidth;
  const height = node.offsetHeight;

  if (width >= wallWidth || height >= wallHeight) {
    node.remove();
    return false;
  }

  for (let i = 0; i < 260; i += 1) {
    const left = randomInRange(0, wallWidth - width);
    const top = randomInRange(0, wallHeight - height);
    const rect = { left, top, right: left + width, bottom: top + height };

    if (canPlace(rect, placedRects, gap)) {
      node.style.left = `${left}px`;
      node.style.top = `${top}px`;
      node.style.visibility = 'visible';
      placedRects.push(rect);
      return true;
    }
  }

  node.remove();
  return false;
}

function renderPhraseWall() {
  phraseWall.innerHTML = '';
  const palette = applyPalette();
  const placedRects = [];
  const area = window.innerWidth * window.innerHeight;
  const targetCount = Math.max(55, Math.min(165, Math.floor(area / 11000)));
  const gap = 8;

  let index = 0;
  let placed = 0;
  let attempts = 0;
  const words = shuffle(encouragements);

  while (placed < targetCount && attempts < targetCount * 14) {
    const text = words[index % words.length];
    const node = createPhraseNode(text, palette);
    phraseWall.append(node);

    if (placeWithoutOverlap(node, placedRects, gap)) {
      placed += 1;
    }

    attempts += 1;
    index += 1;
  }
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderPhraseWall, 160);
});

renderPhraseWall();
