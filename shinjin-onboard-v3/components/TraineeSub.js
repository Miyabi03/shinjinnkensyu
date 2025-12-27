// ã‚·ãƒ•ãƒˆã‚¿ãƒ–
const TraineeShiftTab = ({ currentMonth, setCurrentMonth, shifts, setSelectedDate, setShowShiftModal }) => (
  <>
    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>ðŸ“… ã‚·ãƒ•ãƒˆå…¥åŠ›</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>â—€</button>
      <span style={{ fontWeight: '700', color: '#1e293b' }}>{currentMonth.getFullYear()}å¹´ {currentMonth.getMonth() + 1}æœˆ</span>
      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>â–¶</button>
    </div>
    <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
        {['æ—¥', 'æœˆ', 'ç«', 'æ°´', 'æœ¨', 'é‡‘', 'åœŸ'].map((d, i) => (<div key={d} style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', color: i === 0 ? '#dc2626' : i === 6 ? '#2563eb' : '#64748b', padding: '8px 0' }}>{d}</div>))}
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

// ç ”ä¿®ä¸€è¦§
const TraineeTrainingList = ({ curriculum, setSelectedItem }) => (
  <>
    <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>ðŸ“š ç ”ä¿®ã‚«ãƒªã‚­ãƒ¥ãƒ©ãƒ </h2>
    <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>å…¨{curriculum.length}é …ç›®ã‚’é †ç•ªã«é€²ã‚ã¦ãã ã•ã„</p>
    
    {/* é€²æ—ã‚«ãƒ¼ãƒ‰ */}
    <div style={{ background: 'linear-gradient(135deg, #1e40af, #2563eb)', borderRadius: '16px', padding: '20px', marginBottom: '16px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>ç ”ä¿®é€²æ—çŽ‡</div>
          <div style={{ fontSize: '40px', fontWeight: '800' }}>{Math.round((curriculum.filter(c => c.done).length / curriculum.length) * 100)}%</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '32px', marginBottom: '4px' }}>{curriculum.filter(c => c.done).length === curriculum.length ? 'ðŸŽ‰' : 'ðŸ“š'}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>{curriculum.filter(c => c.done).length} / {curriculum.length}</div>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
        <div style={{ background: 'white', height: '100%', width: `${(curriculum.filter(c => c.done).length / curriculum.length) * 100}%`, borderRadius: '10px' }} />
      </div>
    </div>

    {/* ã‚«ãƒªã‚­ãƒ¥ãƒ©ãƒ ä¸€è¦§ */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {curriculum.map((item, index) => (
        <div key={item.id} onClick={() => setSelectedItem(item)} style={{ background: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', border: item.done ? '2px solid #16a34a' : '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: item.done ? '#16a34a' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.done ? 'white' : '#64748b', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>{item.done ? 'âœ“' : index + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: '#1e293b' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{item.description?.split('\n')[0]}</div>
            </div>
            <div style={{ color: '#94a3b8', fontSize: '20px' }}>â–¶</div>
          </div>
        </div>
      ))}
    </div>
  </>
);

// ãƒ†ã‚­ã‚¹ãƒˆå†…ã®URLã‚’ãƒªãƒ³ã‚¯åŒ–ã™ã‚‹ãƒ˜ãƒ«ãƒ‘ãƒ¼é–¢æ•°
const renderContentWithLinks = (text) => {
  if (!text) return null;
  
  const urlRegex = /(https?:\/\/[^\s\n]+)/g;
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    const parts = line.split(urlRegex);
    
    return React.createElement(React.Fragment, { key: lineIndex },
      parts.map((part, partIndex) => {
        if (part.match(/^https?:\/\//)) {
          return React.createElement('a', {
            key: partIndex,
            href: part,
            target: '_blank',
            rel: 'noopener noreferrer',
            style: { color: '#2563eb', wordBreak: 'break-all', display: 'inline-block' }
          }, part);
        }
        return React.createElement('span', { key: partIndex }, part);
      }),
      lineIndex < lines.length - 1 ? React.createElement('br') : null
    );
  });
};

// ç ”ä¿®è©³ç´°ï¼ˆURLæ¤œå‡ºãƒ»ãƒªãƒ³ã‚¯åŒ–å¯¾å¿œï¼‰
const TraineeTrainingDetail = ({ selectedItem, setSelectedItem, curriculum, setCurriculum }) => (
  <>
    <button onClick={() => setSelectedItem(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', background: 'none', border: 'none', color: '#2563eb', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>â—€ æˆ»ã‚‹</button>

    <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px', color: '#64748b' }}>#{selectedItem.id}</span>
        {selectedItem.done && <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a' }}>âœ“ å®Œäº†</span>}
      </div>
      
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>{selectedItem.title}</h2>
      
      {/* å†…å®¹ï¼ˆURLã¯è‡ªå‹•ãƒªãƒ³ã‚¯åŒ–ã€æ”¹è¡Œã‚‚åæ˜ ï¼‰ */}
      <div style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8' }}>
        {renderContentWithLinks(selectedItem.description)}
      </div>
    </div>

    <button onClick={() => { setCurriculum(curriculum.map(c => c.id === selectedItem.id ? { ...c, done: !c.done } : c)); setSelectedItem({ ...selectedItem, done: !selectedItem.done }); }} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: selectedItem.done ? '#f1f5f9' : 'linear-gradient(135deg, #16a34a, #15803d)', color: selectedItem.done ? '#64748b' : 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer', marginBottom: '12px' }}>{selectedItem.done ? 'âœ“ å®Œäº†æ¸ˆã¿ï¼ˆã‚¿ãƒƒãƒ—ã§å–æ¶ˆï¼‰' : 'âœ“ å®Œäº†ã«ã™ã‚‹'}</button>

    {selectedItem.done && selectedItem.id < curriculum.length && (
      <button onClick={() => { const nextItem = curriculum.find(c => c.id === selectedItem.id + 1); if (nextItem) setSelectedItem(nextItem); }} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>æ¬¡ã¸é€²ã‚€ â–¶</button>
    )}
  </>
);
