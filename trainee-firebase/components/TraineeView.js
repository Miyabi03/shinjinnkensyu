// 新人画面コンポーネント
const TraineeView = ({ currentUser, currentTime, setView, setCurrentUser, curriculum, setCurriculum, shifts, setShifts }) => {
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [showShiftModal, setShowShiftModal] = React.useState(false);
  const [shiftType, setShiftType] = React.useState('work');
  const [shiftStart, setShiftStart] = React.useState('09:00');
  const [shiftEnd, setShiftEnd] = React.useState('18:00');

  const time = getTimeRemaining(currentUser.firstLoginAt, currentTime);
  const isDebut = currentUser.status === 'debut';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f0f7ff 0%, #e0efff 100%)', fontFamily: 'sans-serif', paddingBottom: '80px' }}>
      {/* ヘッダー */}
      <div style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', padding: '16px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{isDebut ? '⭐' : '🎓'}</div>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>{isDebut ? 'デビュー済み' : '研修中'}</span>
        </div>
        <button onClick={() => { setView('login'); setCurrentUser(null); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', cursor: 'pointer' }}>ログアウト</button>
      </div>

      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        {/* ホームタブ */}
        {activeTab === 'home' && (
          <TraineeHomeTab 
            currentUser={currentUser} 
            currentTime={currentTime} 
            time={time} 
            isDebut={isDebut} 
            curriculum={curriculum}
            setActiveTab={setActiveTab}
            setSelectedItem={setSelectedItem}
          />
        )}

        {/* シフトタブ */}
        {activeTab === 'shift' && (
          <TraineeShiftTab
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            shifts={shifts}
            setSelectedDate={setSelectedDate}
            setShowShiftModal={setShowShiftModal}
          />
        )}

        {/* 研修タブ */}
        {activeTab === 'training' && !selectedItem && (
          <TraineeTrainingList curriculum={curriculum} setSelectedItem={setSelectedItem} />
        )}

        {/* 研修詳細 */}
        {activeTab === 'training' && selectedItem && (
          <TraineeTrainingDetail 
            selectedItem={selectedItem} 
            setSelectedItem={setSelectedItem}
            curriculum={curriculum}
            setCurriculum={setCurriculum}
          />
        )}
      </div>

      {/* 下部ナビ */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', padding: '10px 0 20px' }}>
        {[{ id: 'home', icon: '🏠', label: 'ホーム' }, { id: 'training', icon: '📚', label: '研修' }, { id: 'shift', icon: '📅', label: 'シフト' }].map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setSelectedItem(null); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', border: 'none', background: 'transparent', cursor: 'pointer', color: activeTab === item.id ? '#2563eb' : '#94a3b8' }}>
            <span style={{ fontSize: '24px' }}>{item.icon}</span>
            <span style={{ fontSize: '11px', fontWeight: '600' }}>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* シフトモーダル */}
      {showShiftModal && selectedDate && (
        <ShiftModal
          selectedDate={selectedDate}
          shiftType={shiftType}
          setShiftType={setShiftType}
          shiftStart={shiftStart}
          setShiftStart={setShiftStart}
          shiftEnd={shiftEnd}
          setShiftEnd={setShiftEnd}
          shifts={shifts}
          setShifts={setShifts}
          setShowShiftModal={setShowShiftModal}
        />
      )}
    </div>
  );
};

// ホームタブ
const TraineeHomeTab = ({ currentUser, currentTime, time, isDebut, curriculum, setActiveTab, setSelectedItem }) => (
  <>
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '14px', color: '#64748b' }}>{currentTime.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' })}</div>
      <div style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>{currentUser.name}さん</div>
    </div>

    {!isDebut && (
      <div style={{ background: time.days <= 1 ? '#fef3c7' : '#eff6ff', borderRadius: '16px', padding: '20px', marginBottom: '16px', border: time.days <= 1 ? '1px solid #fcd34d' : '1px solid #bfdbfe' }}>
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', marginBottom: '12px' }}>⏱ 研修期限まで</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {[{ v: time.days, l: '日' }, { v: time.hours, l: '時間' }, { v: time.minutes, l: '分' }, { v: time.seconds, l: '秒' }].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', borderRadius: '8px', padding: '10px 12px', fontSize: '24px', fontWeight: '700', color: time.days <= 1 ? '#dc2626' : '#2563eb', fontFamily: 'monospace' }}>{String(item.v).padStart(2, '0')}</div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{item.l}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {isDebut && (
      <div style={{ background: '#faf5ff', borderRadius: '16px', padding: '24px', marginBottom: '16px', textAlign: 'center', border: '1px solid #e9d5ff' }}>
        <div style={{ fontSize: '48px', marginBottom: '8px' }}>⭐</div>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#7c3aed' }}>デビュー済み！</div>
      </div>
    )}

    {/* 進捗サマリー */}
    <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontWeight: '600', color: '#1e293b' }}>📚 研修進捗</span>
        <span style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb' }}>{Math.round((curriculum.filter(c => c.done).length / curriculum.length) * 100)}%</span>
      </div>
      <div style={{ background: '#e2e8f0', borderRadius: '10px', height: '12px', overflow: 'hidden', marginBottom: '12px' }}>
        <div style={{ background: curriculum.filter(c => c.done).length === curriculum.length ? 'linear-gradient(90deg, #16a34a, #22c55e)' : 'linear-gradient(90deg, #2563eb, #3b82f6)', height: '100%', width: `${(curriculum.filter(c => c.done).length / curriculum.length) * 100}%`, transition: 'width 0.5s', borderRadius: '10px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', color: '#64748b' }}>{curriculum.filter(c => c.done).length} / {curriculum.length} 完了</span>
        {curriculum.filter(c => c.done).length === curriculum.length ? <span style={{ fontSize: '14px', color: '#16a34a', fontWeight: '600' }}>🎉 完了！</span> : <span style={{ fontSize: '14px', color: '#64748b' }}>残り {curriculum.filter(c => !c.done).length} 項目</span>}
      </div>
    </div>

    {/* 項目別ステータス */}
    <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
      <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '16px' }}>📊 項目別ステータス</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {curriculum.map((item, i) => (
          <div key={item.id} onClick={() => { setActiveTab('training'); setSelectedItem(item); }} style={{ width: '36px', height: '36px', borderRadius: '8px', background: item.done ? '#16a34a' : '#e2e8f0', color: item.done ? 'white' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>{item.done ? '✓' : i + 1}</div>
        ))}
      </div>
    </div>

    {/* 次にやること */}
    {curriculum.find(c => !c.done) && (
      <div onClick={() => { setActiveTab('training'); setSelectedItem(curriculum.find(c => !c.done)); }} style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', borderRadius: '16px', padding: '20px', border: '1px solid #bfdbfe', cursor: 'pointer' }}>
        <div style={{ fontSize: '12px', color: '#1e40af', marginBottom: '8px', fontWeight: '600' }}>▶ 次にやること</div>
        <div style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{curriculum.find(c => !c.done)?.id}. {curriculum.find(c => !c.done)?.title}</div>
        <div style={{ fontSize: '13px', color: '#64748b' }}>{curriculum.find(c => !c.done)?.description}</div>
      </div>
    )}
  </>
);
