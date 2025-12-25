// 研修カリキュラムデータ
const trainingCurriculum = [
  { id: 1, title: '営業研修', description: '営業の基本を学ぶ動画研修', type: 'video', link: 'https://youtu.be/nXT_ait2Omg?si=pCuuJq2walKGgDRP', done: false },
  { id: 2, title: 'Google Chrome セットアップ', description: 'Chromeをダウンロードし、営業部アカウントでログイン', type: 'task', steps: ['Google Chromeをダウンロード', 'addness.sales@gmail.com でログイン', 'アカウント同期完了を待つ（最大1日）'], link: 'https://www.google.com/chrome/', done: false },
  { id: 3, title: '営業部Googleアカウントログイン & ZOOM設定', description: 'ZOOMアカウント作成、背景設定、ヘッドセット設定', type: 'task', steps: ['ZOOMアカウント作成・課金', 'バーチャル背景を設定', 'ヘッドセットマイクの初期設定', '待機室を設定'], link: 'https://zoom.us/ja/signin#/login', done: false },
  { id: 4, title: 'aileadを使えるようになろう', description: 'aileadにログインして使用できるようにする', type: 'task', steps: ['Chromeプロファイルを追加', '指定アカウントでログイン', 'aileadにアクセスしGoogleでログイン', 'アカウント名が「小松晃也」になっていればOK'], link: 'https://www.ailead.app/', done: false },
  { id: 5, title: '実際の面談動画を視聴', description: '面談の流れをイメージできるようにする', type: 'video', note: '手元に紙を用意してアウトプットしながら視聴', links: [{ label: 'かんなさんの商談動画', url: 'https://dashboard.ailead.app/call/d2f88c6b-bab8-4c29-831b-784e55d209a4' }, { label: '奈良さんの商談動画', url: 'https://dashboard.ailead.app/call/f512adda-e755-45c9-9f97-1d933b88edae' }], done: false },
  { id: 6, title: 'マインドマップ使用時の注意点', description: '必ずコピーして使用すること', type: 'resource', links: [{ label: '商談で使用するマップ', url: 'https://mm.tt/map/3898422535?t=pwEGi9tz0y' }, { label: '自己紹介マップテンプレ', url: 'https://mm.tt/map/3764530937?t=8xytTHijxC' }], done: false },
  { id: 7, title: '商談で使用するマインドマップ', description: 'マインドマップの使い方を確認', type: 'task', done: false },
  { id: 8, title: 'ヒアリングパート', description: 'コンサルティングセールスのフローを学ぶ', type: 'video', link: 'https://youtu.be/7OIRPx4uEFU', done: false },
  { id: 9, title: 'コンサルティングセールスについて学ぶ', description: '見本動画のコンサルパートを完コピして自然に話せるようになる', type: 'video', link: 'https://youtu.be/UJ28owembUg', note: '約30分', done: false },
  { id: 10, title: 'クロージングパート', description: '営業資料（AI訴求）を学ぶ', type: 'resource', link: 'https://www.notion.so/addness/wiki-72dbbe8bfe35490aaaf0b10d4a6103ce?p=de95e9eb2ea5484e9c5c2b24afc3e848&pm=s', done: false },
  { id: 11, title: '商談前の準備〜契約までのto do', description: '面談関連業務フローマップに従って進める', type: 'resource', link: 'https://mm.tt/map/3898843902?t=zV5aJIl2RT', note: 'やるか？質問するか？を徹底', done: false },
  { id: 12, title: 'コンプライアンス', description: 'コンプライアンス研修資料を確認', type: 'resource', link: 'https://app.irusiru.jp/slide/4473e18e-9028-4467-b274-42731f3fe9e2?share=true', done: false },
  { id: 13, title: 'コンプライアンス同意書', description: '動画視聴後、同意書にサイン', type: 'task', steps: ['動画を視聴', '同意書にサイン'], links: [{ label: '動画を視聴', url: 'https://youtu.be/jPpL3_KJbwc' }, { label: '同意書にサイン', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfEaGyED-hOWpxKuBCaTwfVFtqUBiK_u6bOXZoxjIAF20FAeg/viewform?usp=sharing' }], done: false }
];

// デフォルトデータ（空）
const getDefaultTrainees = () => [];

const getDefaultAdmins = () => [];

const defaultTraineeProgress = {};

// ユーティリティ関数
const getTimeRemaining = (firstLoginAt, currentTime) => {
  if (!firstLoginAt) return { expired: true };
  const deadline = new Date(new Date(firstLoginAt).getTime() + 7 * 24 * 60 * 60 * 1000);
  const diff = deadline - currentTime;
  if (diff <= 0) return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    expired: false,
    days: Math.floor(diff / (24 * 60 * 60 * 1000)),
    hours: Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
    minutes: Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000)),
    seconds: Math.floor((diff % (60 * 1000)) / 1000)
  };
};

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days = [];
  for (let i = 0; i < firstDay.getDay(); i++) { days.push(null); }
  for (let i = 1; i <= lastDay.getDate(); i++) { days.push(new Date(year, month, i)); }
  return days;
};

const formatDateKey = (date) => {
  if (!date) return '';
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const timeOptions = [];
for (let h = 0; h < 24; h++) {
  timeOptions.push(`${String(h).padStart(2, '0')}:00`);
  timeOptions.push(`${String(h).padStart(2, '0')}:30`);
}
timeOptions.push('24:00');
