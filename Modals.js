// ã‚·ãƒ•ãƒˆãƒ¢ãƒ¼ãƒ€ãƒ«ï¼ˆæ–°äººç”¨ï¼‰
const ShiftModal = ({ selectedDate, shiftType, setShiftType, shiftStart, setShiftStart, shiftEnd, setShiftEnd, shifts, onSaveShift, setShowShiftModal }) => {
  const handleSave = () => {
    const key = formatDateKey(selectedDate);
    const newShifts = { ...shifts };
    if (shiftType === 'off') {
      newShifts[key] = { type: 'off' };
    } else {
      newShifts[key] = { type: 'work', start: shiftStart, end: shiftEnd };
    }
    onSaveShift(newShifts);
    setShowShiftModal(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>ðŸ“… ã‚·ãƒ•ãƒˆå…¥åŠ›</h3>
        <p style={{ color: '#2563eb', fontWeight: '600', marginBottom: '20px' }}>{selectedDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' })}</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button onClick={() => setShiftType('work')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: shiftType === 'work' ? '2px solid #2563eb' : '1px solid #e2e8f0', background: shiftType === 'work' ? '#dbeafe' : 'white', color: shiftType === 'work' ? '#2563eb' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>ðŸŸ¢ å‡ºå‹¤</button>
          <button onClick={() => setShiftType('off')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: shiftType === 'off' ? '2px solid #dc2626' : '1px solid #e2e8f0', background: shiftType === 'off' ? '#fee2e2' : 'white', color: shiftType === 'off' ? '#dc2626' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>â›” OFF</button>
        </div>
        {shiftType === 'work' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <select value={shiftStart} onChange={e => setShiftStart(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px' }}>{timeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select>
            <span>ã€œ</span>
            <select value={shiftEnd} onChange={e => setShiftEnd(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px' }}>{timeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select>
          </div>
        )}
        <button onClick={handleSave} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>ä¿å­˜</button>
        <button onClick={() => setShowShiftModal(false)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}>ã‚­ãƒ£ãƒ³ã‚»ãƒ«</button>
      </div>
    </div>
  );
};

// ç®¡ç†è€…ç”¨ã‚·ãƒ•ãƒˆãƒ¢ãƒ¼ãƒ€ãƒ«
const AdminShiftModal = ({ selectedTraineeForShift, adminSelectedDate, adminShiftType, setAdminShiftType, adminShiftStart, setAdminShiftStart, adminShiftEnd, setAdminShiftEnd, handleAdminShiftSave, handleAdminShiftDelete, allShifts, setShowAdminShiftModal }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
    <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>ðŸ“… ã‚·ãƒ•ãƒˆç·¨é›†</h3>
      <p style={{ fontSize: '14px', color: '#7c3aed', fontWeight: '600', marginBottom: '4px' }}>{selectedTraineeForShift?.name}</p>
      <p style={{ color: '#2563eb', fontWeight: '600', marginBottom: '20px' }}>{adminSelectedDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' })}</p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button onClick={() => setAdminShiftType('work')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: adminShiftType === 'work' ? '2px solid #2563eb' : '1px solid #e2e8f0', background: adminShiftType === 'work' ? '#dbeafe' : 'white', color: adminShiftType === 'work' ? '#2563eb' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>ðŸŸ¢ å‡ºå‹¤</button>
        <button onClick={() => setAdminShiftType('off')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: adminShiftType === 'off' ? '2px solid #dc2626' : '1px solid #e2e8f0', background: adminShiftType === 'off' ? '#fee2e2' : 'white', color: adminShiftType === 'off' ? '#dc2626' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>â›” OFF</button>
      </div>
      {adminShiftType === 'work' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <select value={adminShiftStart} onChange={e => setAdminShiftStart(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px' }}>{timeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <span>ã€œ</span>
          <select value={adminShiftEnd} onChange={e => setAdminShiftEnd(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px' }}>{timeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select>
        </div>
      )}
      <button onClick={handleAdminShiftSave} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #9333ea)', color: 'white', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>ä¿å­˜</button>
      {(allShifts[selectedTraineeForShift?.id] || {})[formatDateKey(adminSelectedDate)] && (<button onClick={handleAdminShiftDelete} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>å‰Šé™¤</button>)}
      <button onClick={() => setShowAdminShiftModal(false)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}>ã‚­ãƒ£ãƒ³ã‚»ãƒ«</button>
    </div>
  </div>
);

// æ–°äººè¿½åŠ ãƒ¢ãƒ¼ãƒ€ãƒ«
const AddTraineeModal = ({ newTraineeName, setNewTraineeName, newTraineeEmail, setNewTraineeEmail, handleAddTrainee, setShowAddTraineeModal }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
    <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>âž• æ–°äººã‚’è¿½åŠ </h3>
      <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>åå‰</label><input type="text" value={newTraineeName} onChange={e => setNewTraineeName(e.target.value)} placeholder="ä¾‹ï¼šå±±ç”° å¤ªéƒŽ" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <div style={{ marginBottom: '24px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>ãƒ¡ãƒ¼ãƒ«ã‚¢ãƒ‰ãƒ¬ã‚¹</label><input type="email" value={newTraineeEmail} onChange={e => setNewTraineeEmail(e.target.value)} placeholder="ä¾‹ï¼šyamada@example.com" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <button onClick={handleAddTrainee} disabled={!newTraineeName.trim() || !newTraineeEmail.trim()} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: newTraineeName.trim() && newTraineeEmail.trim() ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : '#e2e8f0', color: newTraineeName.trim() && newTraineeEmail.trim() ? 'white' : '#94a3b8', fontWeight: '700', fontSize: '16px', cursor: newTraineeName.trim() && newTraineeEmail.trim() ? 'pointer' : 'not-allowed', marginBottom: '8px' }}>è¿½åŠ ã™ã‚‹</button>
      <button onClick={() => { setShowAddTraineeModal(false); setNewTraineeName(''); setNewTraineeEmail(''); }} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}>ã‚­ãƒ£ãƒ³ã‚»ãƒ«</button>
    </div>
  </div>
);

// å‰Šé™¤ç¢ºèªãƒ¢ãƒ¼ãƒ€ãƒ«
const DeleteModal = ({ deleteTarget, setShowDeleteModal, setDeleteTarget, handleDeleteTrainee }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
    <div style={{ background: 'white', borderRadius: '20px', padding: '24px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>ðŸ‘»</div>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆç¢ºèª</h3>
      <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px' }}><span style={{ fontWeight: '600', color: '#dc2626' }}>{deleteTarget.name}</span>ã•ã‚“ã‚’<br />ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆã—ã¾ã™ã‹ï¼Ÿ</p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => { setShowDeleteModal(false); setDeleteTarget(null); }} style={{ flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}>ã‚­ãƒ£ãƒ³ã‚»ãƒ«</button>
        <button onClick={() => handleDeleteTrainee(deleteTarget)} style={{ flex: 1, padding: '14px', borderRadius: '10px', border: 'none', background: '#94a3b8', color: 'white', fontWeight: '600', cursor: 'pointer' }}>ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆ</button>
      </div>
    </div>
  </div>
);

// ãƒªã‚»ãƒƒãƒˆç¢ºèªãƒ¢ãƒ¼ãƒ€ãƒ«ï¼ˆã‚ªãƒ¼ãƒŠãƒ¼å°‚ç”¨ï¼šè‡ªåˆ†ä»¥å¤–å…¨å‰Šé™¤ï¼‰
const ResetModal = ({ setShowResetModal, handleReset, currentUser }) => {
  const isOwner = currentUser?.role === 'owner';
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>âš ï¸</div>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>
          {isOwner ? 'å…¨ãƒ‡ãƒ¼ã‚¿ãƒªã‚»ãƒƒãƒˆ' : 'æ¨©é™ãŒã‚ã‚Šã¾ã›ã‚“'}
        </h3>
        {isOwner ? (
          <>
            <p style={{ fontSize: '15px', color: '#dc2626', marginBottom: '16px', fontWeight: '600' }}>
              è‡ªåˆ†ä»¥å¤–ã®å…¨ã¦ã®ãƒ‡ãƒ¼ã‚¿ã‚’å‰Šé™¤ã—ã¾ã™
            </p>
            <div style={{ background: '#fef2f2', borderRadius: '10px', padding: '12px', marginBottom: '24px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>
              <div>â€¢ å…¨ã¦ã®ç®¡ç†è€…ï¼ˆè‡ªåˆ†ä»¥å¤–ï¼‰</div>
              <div>â€¢ å…¨ã¦ã®æ–°äºº</div>
              <div>â€¢ å…¨ã¦ã®ã‚·ãƒ•ãƒˆãƒ»é€²æ—ãƒ‡ãƒ¼ã‚¿</div>
              <div>â€¢ ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆãƒªã‚¹ãƒˆ</div>
            </div>
            <p style={{ fontSize: '13px', color: '#dc2626', marginBottom: '16px' }}>
              ã“ã®æ“ä½œã¯å–ã‚Šæ¶ˆã›ã¾ã›ã‚“ï¼
            </p>
          </>
        ) : (
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px' }}>
            ã“ã®æ“ä½œã¯ã‚ªãƒ¼ãƒŠãƒ¼ã®ã¿å®Ÿè¡Œã§ãã¾ã™
          </p>
        )}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowResetModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}>
            {isOwner ? 'ã‚­ãƒ£ãƒ³ã‚»ãƒ«' : 'é–‰ã˜ã‚‹'}
          </button>
          {isOwner && (
            <button onClick={handleReset} style={{ flex: 1, padding: '14px', borderRadius: '10px', border: 'none', background: '#dc2626', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
              å…¨å‰Šé™¤ã™ã‚‹
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ç®¡ç†è€…è¿½åŠ ãƒ¢ãƒ¼ãƒ€ãƒ«
const AddAdminModal = ({ newAdminName, setNewAdminName, newAdminEmail, setNewAdminEmail, newAdminPassword, setNewAdminPassword, handleAddAdmin, setShowAddAdminModal }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
    <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>ðŸ‘¤ ç®¡ç†è€…ã‚’è¿½åŠ </h3>
      <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>åå‰</label><input type="text" value={newAdminName} onChange={e => setNewAdminName(e.target.value)} placeholder="ä¾‹ï¼šéˆ´æœ¨ ä¸€éƒŽ" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>ãƒ¡ãƒ¼ãƒ«ã‚¢ãƒ‰ãƒ¬ã‚¹</label><input type="email" value={newAdminEmail} onChange={e => setNewAdminEmail(e.target.value)} placeholder="ä¾‹ï¼šsuzuki@example.com" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <div style={{ marginBottom: '24px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>ãƒ‘ã‚¹ãƒ¯ãƒ¼ãƒ‰</label><input type="text" value={newAdminPassword} onChange={e => setNewAdminPassword(e.target.value)} placeholder="ãƒ‘ã‚¹ãƒ¯ãƒ¼ãƒ‰ã‚’è¨­å®š" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <button onClick={handleAddAdmin} disabled={!newAdminName.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: newAdminName.trim() && newAdminEmail.trim() && newAdminPassword.trim() ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : '#e2e8f0', color: newAdminName.trim() && newAdminEmail.trim() && newAdminPassword.trim() ? 'white' : '#94a3b8', fontWeight: '700', fontSize: '16px', cursor: newAdminName.trim() && newAdminEmail.trim() && newAdminPassword.trim() ? 'pointer' : 'not-allowed', marginBottom: '8px' }}>è¿½åŠ ã™ã‚‹</button>
      <button onClick={() => { setShowAddAdminModal(false); setNewAdminName(''); setNewAdminEmail(''); setNewAdminPassword(''); }} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}>ã‚­ãƒ£ãƒ³ã‚»ãƒ«</button>
    </div>
  </div>
);

// çµ±åˆãƒ¡ãƒ³ãƒãƒ¼è¿½åŠ ãƒ¢ãƒ¼ãƒ€ãƒ«ï¼ˆå½¹è·é¸æŠžä»˜ãï¼‰
const AddMemberModal = ({ isOwner, onAddTrainee, onAddAdmin, onClose }) => {
  const [memberType, setMemberType] = React.useState('trainee');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleAdd = () => {
    if (memberType === 'trainee') {
      onAddTrainee({ name, email });
    } else {
      onAddAdmin({ name, email, password });
    }
    setName('');
    setEmail('');
    setPassword('');
    onClose();
  };

  const isValid = name.trim() && email.trim() && (memberType === 'trainee' || password.trim());

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>âž• ãƒ¡ãƒ³ãƒãƒ¼ã‚’è¿½åŠ </h3>
        
        {/* å½¹è·é¸æŠžï¼ˆã‚ªãƒ¼ãƒŠãƒ¼ã®ã¿ç®¡ç†è€…ã‚’é¸æŠžå¯èƒ½ï¼‰ */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>è¿½åŠ ã™ã‚‹å½¹è·</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setMemberType('trainee')} 
              style={{ 
                flex: 1, padding: '12px', borderRadius: '10px', 
                border: memberType === 'trainee' ? '2px solid #2563eb' : '1px solid #e2e8f0', 
                background: memberType === 'trainee' ? '#dbeafe' : 'white', 
                color: memberType === 'trainee' ? '#2563eb' : '#64748b', 
                fontWeight: '600', cursor: 'pointer' 
              }}
            >
              ðŸŽ“ æ–°äºº
            </button>
            {isOwner && (
              <button 
                onClick={() => setMemberType('admin')} 
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '10px', 
                  border: memberType === 'admin' ? '2px solid #7c3aed' : '1px solid #e2e8f0', 
                  background: memberType === 'admin' ? '#f3e8ff' : 'white', 
                  color: memberType === 'admin' ? '#7c3aed' : '#64748b', 
                  fontWeight: '600', cursor: 'pointer' 
                }}
              >
                ðŸ‘¤ ç®¡ç†è€…
              </button>
            )}
          </div>
        </div>

        {/* åå‰ */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>åå‰</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="ä¾‹ï¼šå±±ç”° å¤ªéƒŽ" 
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} 
          />
        </div>

        {/* ãƒ¡ãƒ¼ãƒ«ã‚¢ãƒ‰ãƒ¬ã‚¹ */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>ãƒ¡ãƒ¼ãƒ«ã‚¢ãƒ‰ãƒ¬ã‚¹</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="ä¾‹ï¼šyamada@example.com" 
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} 
          />
        </div>

        {/* ãƒ‘ã‚¹ãƒ¯ãƒ¼ãƒ‰ï¼ˆç®¡ç†è€…ã®ã¿ï¼‰ */}
        {memberType === 'admin' && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>ãƒ‘ã‚¹ãƒ¯ãƒ¼ãƒ‰</label>
            <input 
              type="text" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="ãƒ‘ã‚¹ãƒ¯ãƒ¼ãƒ‰ã‚’è¨­å®š" 
              style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} 
            />
          </div>
        )}

        <button 
          onClick={handleAdd} 
          disabled={!isValid} 
          style={{ 
            width: '100%', padding: '16px', borderRadius: '12px', border: 'none', 
            background: isValid ? (memberType === 'admin' ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : 'linear-gradient(135deg, #2563eb, #3b82f6)') : '#e2e8f0', 
            color: isValid ? 'white' : '#94a3b8', 
            fontWeight: '700', fontSize: '16px', 
            cursor: isValid ? 'pointer' : 'not-allowed', 
            marginBottom: '8px' 
          }}
        >
          {memberType === 'admin' ? 'ðŸ‘¤ ç®¡ç†è€…ã‚’è¿½åŠ ' : 'ðŸŽ“ æ–°äººã‚’è¿½åŠ '}
        </button>
        <button 
          onClick={() => { setName(''); setEmail(''); setPassword(''); onClose(); }} 
          style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}
        >
          ã‚­ãƒ£ãƒ³ã‚»ãƒ«
        </button>
      </div>
    </div>
  );
};
