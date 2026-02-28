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

const morandiPalettes = [
  {
    background: ['#C9B6A9', '#AEB5A2', '#9FA8B7'],
    text: ['#505763', '#6A5D54', '#4F5B58', '#62556A']
  },
  {
    background: ['#D4C3B5', '#B8C0B2', '#B5BBC7'],
    text: ['#5D5862', '#556162', '#6C5A52', '#4E5D68']
  },
  {
    background: ['#CAB7B5', '#B4B7AA', '#A9B2C0'],
    text: ['#4E515E', '#655A52', '#50615E', '#665A6B']
  },
  {
    background: ['#CFC0AD', '#AEB8B0', '#BCC3D0'],
    text: ['#525C65', '#6C5A51', '#4E5E5A', '#655D6C']
  },
  {
    background: ['#D6C7BD', '#B4BEB9', '#B9C2CC'],
    text: ['#5B5562', '#58625A', '#6A5E54', '#4F6070']
  }
];

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function applyPalette() {
  const palette = randomFrom(morandiPalettes);
  const root = document.documentElement;
  root.style.setProperty('--bg-1', palette.background[0]);
  root.style.setProperty('--bg-2', palette.background[1]);
  root.style.setProperty('--bg-3', palette.background[2]);
  return palette;
}

function createPhraseNode(text, palette) {
  const phrase = document.createElement('p');
  const fontSize = 18 + Math.random() * 58;
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const tilt = -10 + Math.random() * 20;
  const driftX = -18 + Math.random() * 36;
  const driftY = -14 + Math.random() * 28;
  const driftDuration = 6 + Math.random() * 10;
  const shimmerDuration = 2.2 + Math.random() * 3.6;
  const delay = Math.random() * 3;

  phrase.className = 'phrase';
  phrase.textContent = text;
  phrase.style.left = `${left}%`;
  phrase.style.top = `${top}%`;
  phrase.style.fontSize = `${fontSize}px`;
  phrase.style.color = randomFrom(palette.text);
  phrase.style.setProperty('--tilt', `${tilt}deg`);
  phrase.style.setProperty('--dx', `${driftX}px`);
  phrase.style.setProperty('--dy', `${driftY}px`);
  phrase.style.animationDuration = `${driftDuration}s, ${shimmerDuration}s`;
  phrase.style.animationDelay = `${delay}s, ${delay / 2}s`;

  return phrase;
}

function renderPhraseWall() {
  phraseWall.innerHTML = '';
  const palette = applyPalette();
  const area = window.innerWidth * window.innerHeight;
  const total = Math.max(45, Math.min(130, Math.floor(area / 14000)));

  for (let index = 0; index < total; index += 1) {
    const text = randomFrom(encouragements);
    phraseWall.append(createPhraseNode(text, palette));
  }
}

renderPhraseWall();
window.addEventListener('resize', renderPhraseWall);
