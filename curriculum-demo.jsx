import React, { useState } from 'react';

// デモ用のカリキュラムデータ
const initialCurriculum = [
  { id: '1', title: '営業研修', description: '営業の基本を学ぶ動画研修\nhttps://example.com/video', order: 0 },
  { id: '2', title: 'Google Chrome セットアップ', description: 'Chromeをダウンロードし、営業部アカウントでログイン', order: 1 },
  { id: '3', title: '営業部Googleアカウントログイン & ZOOM設定', description: 'ZOOMアカウント作成、背景設定、ヘッドセット設定', order: 2 },
  { id: '4', title: 'aileadを使えるようになろう', description: 'aileadにログインして使用できるようにする', order: 3 },
  { id: '5', title: '実際の面談動画を視聴', description: '面談の流れをイメージできるようにする', order: 4 },
];

// カリキュラム管理タブ
const AdminCurriculumTab = ({ curriculum, onAdd, onUpdate, onDelete, onReorder }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAdd({ title: newTitle.trim(), description: newDescription.trim() });
    setNewTitle('');
    setNewDescription('');
    setShowAddModal(false);
  };

  const handleUpdate = () => {
    if (!editTitle.trim() || !editingItem) return;
    onUpdate(editingItem.id, { title: editTitle.trim(), description: editDescription.trim() });
    setEditingItem(null);
  };

  const handleDelete = (item) => {
    if (confirm(`「${item.title}」を削除しますか？\n\n※この操作は取り消せません`)) {
      onDelete(item.id);
      setEditingItem(null);
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...curriculum];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    onReorder(newOrder);
  };

  const handleMoveDown = (index) => {
    if (index === curriculum.length - 1) return;
    const newOrder = [...curriculum];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    onReorder(newOrder);
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDescription(item.description || '');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>📚 研修カリキュラム管理</h2>
        <button 
          onClick={() => setShowAddModal(true)} 
          style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #9333ea)', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
        >
          ➕ 項目追加
        </button>
      </div>

      <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '16px', marginBottom: '16px', border: '1px solid #bbf7d0' }}>
        <div style={{ fontSize: '14px', color: '#16a34a', fontWeight: '600', marginBottom: '4px' }}>💡 使い方</div>
        <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
          • 項目をタップして編集できます<br/>
          • ▲▼ボタンで順序を変更できます<br/>
          • 説明欄にURLを入れると自動でリンクになります
        </div>
      </div>

      {curriculum.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
          <p style={{ color: '#94a3b8', margin: 0 }}>カリキュラムがありません</p>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: '8px 0 0' }}>「項目追加」から研修内容を追加してください</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {curriculum.map((item, index) => (
            <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {/* 順番バッジ */}
                <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4338ca', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>
                  {index + 1}
                </div>
                
                {/* 内容 */}
                <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => startEdit(item)}>
                  <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{item.title}</div>
                  {item.description && (
                    <div style={{ fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {item.description.substring(0, 100)}{item.description.length > 100 ? '...' : ''}
                    </div>
                  )}
                </div>
                
                {/* 操作ボタン */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleMoveUp(index); }} 
                    disabled={index === 0}
                    style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: index === 0 ? '#f8fafc' : 'white', color: index === 0 ? '#cbd5e1' : '#64748b', cursor: index === 0 ? 'not-allowed' : 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ▲
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleMoveDown(index); }} 
                    disabled={index === curriculum.length - 1}
                    style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: index === curriculum.length - 1 ? '#f8fafc' : 'white', color: index === curriculum.length - 1 ? '#cbd5e1' : '#64748b', cursor: index === curriculum.length - 1 ? 'not-allowed' : 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ▼
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 追加モーダル */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
          <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px', maxHeight: '80vh', overflow: 'auto' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b', margin: '0 0 20px' }}>📝 研修項目を追加</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>タイトル *</label>
              <input 
                type="text" 
                value={newTitle} 
                onChange={e => setNewTitle(e.target.value)} 
                placeholder="例：営業研修" 
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} 
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>説明・内容</label>
              <textarea 
                value={newDescription} 
                onChange={e => setNewDescription(e.target.value)} 
                placeholder={"研修内容の説明やURLを入力\n\n例：\n営業の基本を学ぶ動画研修\nhttps://example.com/video"}
                rows={6}
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} 
              />
            </div>

            <button 
              onClick={handleAdd} 
              disabled={!newTitle.trim()} 
              style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: newTitle.trim() ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : '#e2e8f0', color: newTitle.trim() ? 'white' : '#94a3b8', fontWeight: '700', fontSize: '16px', cursor: newTitle.trim() ? 'pointer' : 'not-allowed', marginBottom: '8px' }}
            >
              追加する
            </button>
            <button 
              onClick={() => { setShowAddModal(false); setNewTitle(''); setNewDescription(''); }} 
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      {/* 編集モーダル */}
      {editingItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
          <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px', maxHeight: '80vh', overflow: 'auto' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b', margin: '0 0 20px' }}>✏️ 研修項目を編集</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>タイトル *</label>
              <input 
                type="text" 
                value={editTitle} 
                onChange={e => setEditTitle(e.target.value)} 
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} 
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>説明・内容</label>
              <textarea 
                value={editDescription} 
                onChange={e => setEditDescription(e.target.value)} 
                rows={8}
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} 
              />
            </div>

            <button 
              onClick={handleUpdate} 
              disabled={!editTitle.trim()} 
              style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: editTitle.trim() ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : '#e2e8f0', color: editTitle.trim() ? 'white' : '#94a3b8', fontWeight: '700', fontSize: '16px', cursor: editTitle.trim() ? 'pointer' : 'not-allowed', marginBottom: '8px' }}
            >
              保存する
            </button>
            <button 
              onClick={() => handleDelete(editingItem)} 
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}
            >
              🗑 この項目を削除
            </button>
            <button 
              onClick={() => setEditingItem(null)} 
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// メインのデモコンポーネント
export default function CurriculumDemo() {
  const [curriculum, setCurriculum] = useState(initialCurriculum);
  const [activeTab, setActiveTab] = useState('curriculum');
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleAdd = (item) => {
    const newItem = {
      id: Date.now().toString(),
      ...item,
      order: curriculum.length
    };
    setCurriculum([...curriculum, newItem]);
    showToast('✅ 項目を追加しました');
  };

  const handleUpdate = (id, data) => {
    setCurriculum(curriculum.map(item => 
      item.id === id ? { ...item, ...data } : item
    ));
    showToast('✅ 保存しました');
  };

  const handleDelete = (id) => {
    setCurriculum(curriculum.filter(item => item.id !== id));
    showToast('🗑 削除しました');
  };

  const handleReorder = (newOrder) => {
    setCurriculum(newOrder);
  };

  const tabs = [
    { id: 'training', label: '🎓 研修中', count: 3 },
    { id: 'progress', label: '📊 進捗' },
    { id: 'shifts', label: '📅 シフト' },
    { id: 'curriculum', label: '📚 研修内容' },
    { id: 'settings', label: '⚙️ 設定' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* ヘッダー */}
      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', padding: '16px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👑</div>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>オーナー画面</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>ログアウト</button>
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {/* 統計サマリー */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb' }}>3</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>研修中</div>
          </div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626' }}>0</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>期限切れ</div>
          </div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a' }}>5</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>デビュー</div>
          </div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#94a3b8' }}>2</div>
            <div style={{ fontSize: '10px', color: '#64748b' }}>FO</div>
          </div>
        </div>

        {/* タブ */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              style={{ 
                padding: '10px 14px', 
                borderRadius: '10px', 
                border: 'none', 
                background: activeTab === tab.id ? '#7c3aed' : 'white', 
                color: activeTab === tab.id ? 'white' : '#64748b', 
                fontWeight: '600', 
                cursor: 'pointer', 
                whiteSpace: 'nowrap', 
                fontSize: '13px',
                boxShadow: activeTab === tab.id ? '0 2px 8px rgba(124,58,237,0.3)' : '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* カリキュラム管理タブ */}
        {activeTab === 'curriculum' && (
          <AdminCurriculumTab
            curriculum={curriculum}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onReorder={handleReorder}
          />
        )}

        {/* 他のタブ（プレースホルダー） */}
        {activeTab !== 'curriculum' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>
              {activeTab === 'training' ? '🎓' : activeTab === 'progress' ? '📊' : activeTab === 'shifts' ? '📅' : '⚙️'}
            </div>
            <p style={{ color: '#64748b', margin: 0 }}>
              「📚 研修内容」タブをタップして<br/>カリキュラム管理機能をお試しください
            </p>
          </div>
        )}
      </div>

      {/* トースト通知 */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1e293b',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          animation: 'fadeIn 0.2s ease'
        }}>
          {toast}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
