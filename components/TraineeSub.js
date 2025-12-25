// シフトタブ
const TraineeShiftTab = ({ currentMonth, setCurrentMonth, shifts, setSelectedDate, setShowShiftModal }) => (
  <>
    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>📅 シフト入力</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>◀</button>
      <span style={{ fontWeight: '700', color: '#1e293b' }}>{currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月</span>
      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>▶</button>
    </div>
    <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
        {['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (<div key={d} style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', color: i === 0 ? '#dc2626' : i === 6 ? '#2563eb' : '#64748b', padding: '8px 0' }}>{d}</div>))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {getDaysInMonth(currentMonth).map((date, i) => {
          if (!date) return <div key={i} />;
          const key = formatDateKey(date);
          const shift = shifts[key];
          const isToday = formatDateKey(date) === formatDateKey(new Date());
          return (
            <div key={i} onClick={() => { setSelectedDate(date); setShowShiftModal(true); }} style={{ aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', cursor: 'pointer', background: shift?.type === 'work' ? '#dbeafe' : shift?.type === 'off' ? '#fee2e2' : isToday ? '#f0fdf4' : 'white', border: isToday ? '2px solid #16a34a' : '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '14px', fontWeight: isToday ? '700' : '500', color: date.getDay() === 0 ? '#dc2626' : date.getDay() === 6 ? '#2563eb' : '#1e293b' }}>{date.getDate()}</div>
              {shift && <div style={{ fontSize: '8px', color: shift.type === 'work' ? '#2563eb' : '#dc2626' }}>{shift.type === 'work' ? shift.start : 'OFF'}</div>}
            </div>
          );
        })}
      </div>
    </div>
  </>
);

// 研修一覧
const TraineeTrainingList = ({ curriculum, setSelectedItem }) => (
  <>
    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>📚 研修カリキュラム</h2>
    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>全{curriculum.length}項目を順番に進めてください</p>
    
    {/* 進捗カード */}
    <div style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', borderRadius: '16px', padding: '20px', marginBottom: '16px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>研修進捗率</div>
          <div style={{ fontSize: '40px', fontWeight: '800' }}>{Math.round((curriculum.filter(c => c.done).length / curriculum.length) * 100)}%</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>{curriculum.filter(c => c.done).length === curriculum.length ? '🎉' : '📚'}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>{curriculum.filter(c => c.done).length} / {curriculum.length}</div>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
        <div style={{ background: 'white', height: '100%', width: `${(curriculum.filter(c => c.done).length / curriculum.length) * 100}%`, borderRadius: '10px' }} />
      </div>
    </div>

    {/* カリキュラム一覧 */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {curriculum.map((item, index) => (
        <div key={item.id} onClick={() => setSelectedItem(item)} style={{ background: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', border: item.done ? '2px solid #16a34a' : '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: item.done ? '#16a34a' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.done ? 'white' : '#64748b', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>{item.done ? '✓' : index + 1}</div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: item.type === 'video' ? '#fee2e2' : item.type === 'task' ? '#dbeafe' : '#fef3c7', color: item.type === 'video' ? '#dc2626' : item.type === 'task' ? '#2563eb' : '#b45309' }}>{item.type === 'video' ? '🎬 動画' : item.type === 'task' ? '📝 タスク' : '📄 資料'}</span>
              <div style={{ fontWeight: '600', color: '#1e293b', marginTop: '4px' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#64748b' }}>{item.description}</div>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '20px' }}>▶</div>
          </div>
        </div>
      ))}
    </div>
  </>
);

// 研修詳細
const TraineeTrainingDetail = ({ selectedItem, setSelectedItem, curriculum, setCurriculum }) => (
  <>
    <button onClick={() => setSelectedItem(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', background: 'none', border: 'none', color: '#2563eb', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>◀ 戻る</button>

    <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '12px', background: selectedItem.type === 'video' ? '#fee2e2' : selectedItem.type === 'task' ? '#dbeafe' : '#fef3c7', color: selectedItem.type === 'video' ? '#dc2626' : selectedItem.type === 'task' ? '#2563eb' : '#b45309' }}>{selectedItem.type === 'video' ? '🎬 動画' : selectedItem.type === 'task' ? '📝 タスク' : '📄 資料'}</span>
        <span style={{ fontSize: '14px', color: '#64748b' }}>#{selectedItem.id}</span>
      </div>
      
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>{selectedItem.title}</h2>
      <p style={{ color: '#64748b', marginBottom: '16px' }}>{selectedItem.description}</p>

      {selectedItem.note && <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '12px', marginBottom: '16px', fontSize: '14px', color: '#b45309' }}>💡 {selectedItem.note}</div>}

      {selectedItem.steps && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>手順</div>
          {selectedItem.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px', padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
              <span style={{ background: '#2563eb', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontSize: '14px', color: '#1e293b' }}>{step}</span>
            </div>
          ))}
        </div>
      )}

      {selectedItem.link && <a href={selectedItem.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', marginBottom: '12px' }}>{selectedItem.type === 'video' ? '🎬 動画を見る' : '🔗 開く'}</a>}

      {selectedItem.links && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {selectedItem.links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', padding: '14px', background: i === 0 ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'white', color: i === 0 ? 'white' : '#2563eb', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', border: i === 0 ? 'none' : '1px solid #2563eb' }}>🔗 {link.label}</a>
          ))}
        </div>
      )}
    </div>

    <button onClick={() => { setCurriculum(curriculum.map(c => c.id === selectedItem.id ? { ...c, done: !c.done } : c)); setSelectedItem({ ...selectedItem, done: !selectedItem.done }); }} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: selectedItem.done ? '#f1f5f9' : 'linear-gradient(135deg, #16a34a, #15803d)', color: selectedItem.done ? '#64748b' : 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer', marginBottom: '12px' }}>{selectedItem.done ? '✓ 完了済み（タップで取消）' : '✓ 完了にする'}</button>

    {selectedItem.done && selectedItem.id < curriculum.length && (
      <button onClick={() => { const nextItem = curriculum.find(c => c.id === selectedItem.id + 1); if (nextItem) setSelectedItem(nextItem); }} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>次へ進む ▶</button>
    )}
  </>
);
