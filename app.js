const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const previewTitle = document.getElementById('previewTitle');
const previewContent = document.getElementById('previewContent');
const previewBtn = document.getElementById('previewBtn');
const shareBtn = document.getElementById('shareBtn');

function updatePreview() {
  const title = titleInput.value.trim() || '未命名演示';
  const content = contentInput.value.trim() || '（暂无内容）';

  previewTitle.textContent = title;
  previewContent.textContent = content;
}

function loadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  const content = params.get('content');

  if (title) {
    titleInput.value = title;
  }

  if (content) {
    contentInput.value = content;
  }

  updatePreview();
}

async function copyShareUrl() {
  const title = encodeURIComponent(titleInput.value.trim());
  const content = encodeURIComponent(contentInput.value.trim());
  const url = `${window.location.origin}${window.location.pathname}?title=${title}&content=${content}`;

  await navigator.clipboard.writeText(url);
  shareBtn.textContent = '已复制！';

  setTimeout(() => {
    shareBtn.textContent = '复制分享链接';
  }, 1200);
}

previewBtn.addEventListener('click', updatePreview);
shareBtn.addEventListener('click', () => {
  copyShareUrl().catch(() => {
    alert('复制失败，请手动复制地址栏链接。');
  });
});

loadFromUrl();
