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
    background: ['#ffd7c9', '#ffe4c5', '#ffe9d9'],
    text: ['#8f4f5d', '#7d5f8c', '#5b6e8b', '#8a6a45', '#5b7f73', '#9b5c4c']
  },
  {
    background: ['#ffcfc7', '#ffe1b9', '#ffe6d5'],
    text: ['#91545f', '#746192', '#5e738d', '#916a48', '#5f7b70', '#a15e4f']
  },
  {
    background: ['#ffd9d0', '#ffe8cd', '#ffe9de'],
    text: ['#8b4f67', '#6f5f8a', '#5a6f86', '#876943', '#5a7a69', '#9a5949']
  },
  {
    background: ['#ffd5c2', '#ffe2b8', '#ffe7d3'],
    text: ['#8e5360', '#79608a', '#5b7286', '#8f6c4c', '#5f8173', '#a55f52']
  }
];

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function applyRandomGradient() {
  const palette = randomFrom(warmPalettes);
  const root = document.documentElement;

  root.style.setProperty('--bg-1', palette.background[0]);
  root.style.setProperty('--bg-2', palette.background[1]);
  root.style.setProperty('--bg-3', palette.background[2]);
  root.style.setProperty('--bg-angle', `${Math.floor(randomInRange(120, 220))}deg`);
  root.style.setProperty('--bg-pos-1', `${Math.floor(randomInRange(8, 22))}% ${Math.floor(randomInRange(12, 26))}%`);
  root.style.setProperty('--bg-pos-2', `${Math.floor(randomInRange(76, 92))}% ${Math.floor(randomInRange(14, 30))}%`);
  root.style.setProperty('--bg-pos-3', `${Math.floor(randomInRange(40, 60))}% ${Math.floor(randomInRange(78, 92))}%`);

  return palette;
}

function createPhraseNode(text, textPalette) {
  const node = document.createElement('p');
  const fontSize = randomInRange(18, 46);
  const duration = randomInRange(9, 18);
  const shimmerDuration = randomInRange(1.8, 3.8);
  const delay = -randomInRange(0, duration);

  node.className = 'phrase';
  node.textContent = text;
  node.style.fontSize = `${fontSize}px`;
  node.style.fontWeight = `${Math.floor(randomInRange(580, 840))}`;
  node.style.letterSpacing = `${randomInRange(0, 1.2).toFixed(2)}px`;
  node.style.color = randomFrom(textPalette);
  node.style.animationDuration = `${duration}s, ${shimmerDuration}s`;
  node.style.animationDelay = `${delay}s, ${Math.abs(delay) / 3}s`;

  return node;
}

function renderPhraseWall() {
  phraseWall.innerHTML = '';
  const palette = applyRandomGradient();
  const wallWidth = phraseWall.clientWidth;
  const wallHeight = phraseWall.clientHeight;

  const laneHeight = Math.max(46, Math.min(70, Math.floor(wallHeight / 12)));
  const laneCount = Math.max(8, Math.floor(wallHeight / laneHeight));
  const itemsPerLane = Math.max(2, Math.min(6, Math.floor(wallWidth / 360)));

  for (let lane = 0; lane < laneCount; lane += 1) {
    for (let i = 0; i < itemsPerLane; i += 1) {
      const text = randomFrom(encouragements);
      const node = createPhraseNode(text, palette.text);
      phraseWall.append(node);

      const laneTop = lane * laneHeight;
      const textHeight = node.offsetHeight;
      const maxOffsetTop = Math.max(0, laneHeight - textHeight);
      const top = laneTop + randomInRange(0, maxOffsetTop);

      node.style.top = `${top}px`;
      node.style.left = `${Math.floor(randomInRange(wallWidth * 0.9, wallWidth * 1.75))}px`;
      node.style.setProperty('--phrase-width', `${node.offsetWidth + 40}px`);
    }
  }
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(renderPhraseWall, 180);
});

setInterval(applyRandomGradient, 10000);
renderPhraseWall();
