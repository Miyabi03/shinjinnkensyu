// スプレッドシートのURL（CSV公開）
const SPREADSHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1gok6wo4eN2S5kcCsnJVvQznZlEmMk07m7mXlb6Wu0Pg/export?format=csv&gid=277387492';

// CSVをパースする関数
const parseCSV = (csvText) => {
  const lines = [];
  let currentLine = '';
  let insideQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    
    if (char === '"') {
      insideQuotes = !insideQuotes;
      currentLine += char;
    } else if (char === '\n' && !insideQuotes) {
      lines.push(currentLine);
      currentLine = '';
    } else if (char === '\r' && !insideQuotes) {
      // skip carriage return
    } else {
      currentLine += char;
    }
  }
  if (currentLine) lines.push(currentLine);
  
  return lines.map(line => {
    const cells = [];
    let cell = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        cells.push(cell);
        cell = '';
      } else {
        cell += char;
      }
    }
    cells.push(cell);
    return cells;
  });
};

// スプレッドシートから研修データを取得
const fetchCurriculumFromSheet = async () => {
  try {
    const response = await fetch(SPREADSHEET_CSV_URL);
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    // ヘッダー行をスキップ（1行目）
    const dataRows = rows.slice(1);
    
    const curriculum = [];
    let idCounter = 1;
    
    for (const row of dataRows) {
      const no = row[0]?.trim();
      const title = row[1]?.trim();
      const content = row[3]?.trim();
      
      // タイトルがある行のみ処理（空行やセクションヘッダーをスキップ）
      if (title && title !== '') {
        curriculum.push({
          id: idCounter,
          title: title,
          description: content || '',
          done: false
        });
        idCounter++;
      }
    }
    
    console.log('スプレッドシートから研修データを取得しました:', curriculum.length, '件');
    return curriculum;
  } catch (error) {
    console.error('スプレッドシート取得エラー:', error);
    return null;
  }
};

// デフォルトの研修カリキュラム（フォールバック用）
const trainingCurriculum = [
  { id: 1, title: '営業研修', description: '営業の基本を学ぶ動画研修', done: false },
  { id: 2, title: 'Google Chrome セットアップ', description: 'Chromeをダウンロードし、営業部アカウントでログイン', done: false },
  { id: 3, title: '営業部Googleアカウントログイン & ZOOM設定', description: 'ZOOMアカウント作成、背景設定、ヘッドセット設定', done: false },
  { id: 4, title: 'aileadを使えるようになろう', description: 'aileadにログインして使用できるようにする', done: false },
  { id: 5, title: '実際の面談動画を視聴', description: '面談の流れをイメージできるようにする', done: false },
  { id: 6, title: 'マインドマップ使用時の注意点', description: '必ずコピーして使用すること', done: false },
  { id: 7, title: '商談で使用するマインドマップ', description: 'マインドマップの使い方を確認', done: false },
  { id: 8, title: 'ヒアリングパート', description: 'コンサルティングセールスのフローを学ぶ', done: false },
  { id: 9, title: 'コンサルティングセールスについて学ぶ', description: '見本動画のコンサルパートを完コピして自然に話せるようになる', done: false },
  { id: 10, title: 'クロージングパート', description: '営業資料（AI訴求）を学ぶ', done: false },
  { id: 11, title: '商談前の準備〜契約までのto do', description: '面談関連業務フローマップに従って進める', done: false },
  { id: 12, title: 'コンプライアンス', description: 'コンプライアンス研修資料を確認', done: false },
  { id: 13, title: 'コンプライアンス同意書', description: '動画視聴後、同意書にサイン', done: false }
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
