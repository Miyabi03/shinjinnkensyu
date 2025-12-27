// ç ”ä¿®ä¸­ã‚¿ãƒ–
const AdminTrainingTab = ({ trainees, setTrainees, currentTime, setShowAddTraineeModal, setDeleteTarget, setShowDeleteModal, onSelectMember }) => {
  const trainingList = trainees.filter(t => t.status === 'training');
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>ðŸŽ“ ç ”ä¿®ä¸­ ({trainingList.length}å)</h2>
        <button onClick={() => setShowAddTraineeModal(true)} style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #9333ea)', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>âž• æ–°äººè¿½åŠ </button>
      </div>

      {trainingList.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>ðŸ“­</div>
          <p style={{ color: '#94a3b8' }}>ç ”ä¿®ä¸­ã®æ–°äººã¯ã„ã¾ã›ã‚“</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {trainingList.map(t => {
            const time = getTimeRemaining(t.firstLoginAt, currentTime);
            return (
              <div key={t.id} style={{ background: 'white', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div onClick={() => onSelectMember && onSelectMember(t)} style={{ cursor: onSelectMember ? 'pointer' : 'default', flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{t.name} {onSelectMember && <span style={{ fontSize: '12px', color: '#7c3aed' }}>â–¶</span>}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>æ®‹ã‚Š {time.days}æ—¥ {time.hours}æ™‚é–“</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>é–‹å§‹: {new Date(t.firstLoginAt).toLocaleDateString('ja-JP')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setTrainees(trainees.map(x => x.id === t.id ? { ...x, status: 'debut', debutAt: new Date() } : x))} style={{ padding: '10px 14px', borderRadius: '8px', border: 'none', background: '#16a34a', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>â­ ãƒ‡ãƒ“ãƒ¥ãƒ¼</button>
                    <button onClick={() => { setDeleteTarget(t); setShowDeleteModal(true); }} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>ðŸ—‘</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

// æœŸé™åˆ‡ã‚Œã‚¿ãƒ–
const AdminExpiredTab = ({ trainees, setTrainees, setDeleteTarget, setShowDeleteModal, onSelectMember }) => {
  const expiredList = trainees.filter(t => t.status === 'expired');
  
  return (
    <>
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>ðŸ”’ æœŸé™åˆ‡ã‚Œ ({expiredList.length}å)</h2>

      {expiredList.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>âœ¨</div>
          <p style={{ color: '#94a3b8' }}>æœŸé™åˆ‡ã‚Œã®æ–°äººã¯ã„ã¾ã›ã‚“</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {expiredList.map(t => (
            <div key={t.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #fecaca' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div onClick={() => onSelectMember && onSelectMember(t)} style={{ cursor: onSelectMember ? 'pointer' : 'default', flex: 1 }}>
                  <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{t.name} {onSelectMember && <span style={{ fontSize: '12px', color: '#7c3aed' }}>â–¶</span>}</div>
                  <div style={{ fontSize: '12px', color: '#dc2626' }}>æœŸé™åˆ‡ã‚Œ</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>é–‹å§‹: {new Date(t.firstLoginAt).toLocaleDateString('ja-JP')}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setTrainees(trainees.map(x => x.id === t.id ? { ...x, status: 'training', firstLoginAt: new Date() } : x))} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #2563eb', background: 'white', color: '#2563eb', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>ðŸ”„ å¾©æ´»</button>
                  <button onClick={() => { setDeleteTarget(t); setShowDeleteModal(true); }} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>ðŸ—‘</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// ãƒ‡ãƒ“ãƒ¥ãƒ¼ã‚¿ãƒ–
const AdminDebutTab = ({ trainees, onSelectMember }) => {
  const debutList = trainees.filter(t => t.status === 'debut');
  
  return (
    <>
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>â­ ãƒ‡ãƒ“ãƒ¥ãƒ¼ ({debutList.length}å)</h2>

      {debutList.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>ðŸŒ±</div>
          <p style={{ color: '#94a3b8' }}>ã¾ã ãƒ‡ãƒ“ãƒ¥ãƒ¼ã—ãŸäººã¯ã„ã¾ã›ã‚“</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {debutList.map(t => (
            <div key={t.id} onClick={() => onSelectMember && onSelectMember(t)} style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '12px', padding: '16px', border: '1px solid #86efac', cursor: onSelectMember ? 'pointer' : 'default' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #16a34a, #22c55e)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{t.name} {onSelectMember && <span style={{ fontSize: '12px', color: '#16a34a' }}>â–¶</span>}</div>
                    <div style={{ fontSize: '12px', color: '#16a34a' }}>â­ ãƒ‡ãƒ“ãƒ¥ãƒ¼: {t.debutAt ? new Date(t.debutAt).toLocaleDateString('ja-JP') : 'ä¸æ˜Ž'}</div>
                  </div>
                </div>
                <div style={{ fontSize: '24px' }}>ðŸŽ‰</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆã‚¿ãƒ–
const AdminFadeOutTab = ({ fadeOutList }) => {
  return (
    <>
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>ðŸ‘» ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆ ({fadeOutList.length}å)</h2>

      {fadeOutList.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>ðŸŽŠ</div>
          <p style={{ color: '#94a3b8' }}>ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆã—ãŸäººã¯ã„ã¾ã›ã‚“</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {fadeOutList.map(t => (
            <div key={t.id} style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', opacity: 0.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', background: '#94a3b8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>{t.name.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>ðŸ‘» ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆ: {t.fadeOutAt ? new Date(t.fadeOutAt).toLocaleDateString('ja-JP') : 'ä¸æ˜Ž'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// é€²æ—ä¸€è¦§ã‚¿ãƒ–
const AdminProgressTab = ({ trainees, traineeProgress, currentTime, onSelectMember }) => (
  <>
    <div style={{ marginBottom: '20px' }}><h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>ðŸ“Š ç ”ä¿®é€²æ—ä¸€è¦§</h2></div>

    <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', borderRadius: '16px', padding: '20px', marginBottom: '20px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <div><div style={{ fontSize: '28px', fontWeight: '700' }}>{trainees.filter(t => t.status !== 'expired').length}</div><div style={{ fontSize: '12px', opacity: 0.9 }}>ã‚¢ã‚¯ãƒ†ã‚£ãƒ–</div></div>
        <div><div style={{ fontSize: '28px', fontWeight: '700' }}>{Math.round(trainees.filter(t => t.status !== 'expired').reduce((sum, t) => sum + ((traineeProgress[t.id]?.length || 0) / 13 * 100), 0) / Math.max(trainees.filter(t => t.status !== 'expired').length, 1))}%</div><div style={{ fontSize: '12px', opacity: 0.9 }}>å¹³å‡é€²æ—</div></div>
        <div><div style={{ fontSize: '28px', fontWeight: '700' }}>{trainees.filter(t => (traineeProgress[t.id]?.length || 0) === 13).length}</div><div style={{ fontSize: '12px', opacity: 0.9 }}>å®Œäº†è€…</div></div>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {trainees.filter(t => t.status !== 'expired').map(trainee => {
        const completed = traineeProgress[trainee.id]?.length || 0;
        const percent = Math.round((completed / 13) * 100);
        const time = getTimeRemaining(trainee.firstLoginAt, currentTime);
        return (
          <div key={trainee.id} onClick={() => onSelectMember && onSelectMember(trainee)} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: percent === 100 ? '2px solid #16a34a' : '1px solid #e2e8f0', cursor: onSelectMember ? 'pointer' : 'default' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', background: trainee.status === 'debut' ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>{trainee.name.charAt(0)}</div>
                <div><div style={{ fontWeight: '600', color: '#1e293b' }}>{trainee.name} {onSelectMember && <span style={{ fontSize: '12px', color: '#7c3aed' }}>â–¶</span>}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{trainee.status === 'debut' ? 'â­ ãƒ‡ãƒ“ãƒ¥ãƒ¼æ¸ˆã¿' : `æ®‹ã‚Š ${time.days}æ—¥`}</div></div>
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: percent === 100 ? '#16a34a' : percent >= 50 ? '#2563eb' : '#f59e0b' }}>{percent}%</div>
            </div>
            <div style={{ background: '#e2e8f0', borderRadius: '10px', height: '8px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ background: percent === 100 ? '#16a34a' : 'linear-gradient(90deg, #2563eb, #3b82f6)', height: '100%', width: `${percent}%`, borderRadius: '10px' }} />
            </div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '12px', flexWrap: 'wrap' }}>
              {Array.from({ length: 13 }, (_, i) => i + 1).map(itemId => (
                <div key={itemId} style={{ width: '20px', height: '20px', borderRadius: '4px', background: traineeProgress[trainee.id]?.includes(itemId) ? '#16a34a' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: traineeProgress[trainee.id]?.includes(itemId) ? 'white' : '#94a3b8', fontWeight: '600' }}>{itemId}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  </>
);

// ãƒ¡ãƒ³ãƒãƒ¼ä¸€è¦§ã‚¿ãƒ–ï¼ˆã‚ªãƒ¼ãƒŠãƒ¼ã¯å…¨å“¡ã€ç®¡ç†è€…ã¯æ–°äººã®ã¿ï¼‰
const AdminMembersTab = ({ trainees, admins, currentUser, traineeProgress, onSelectMember, isOwner, onShowAddModal }) => {
  const getRoleLabel = (role) => {
    if (role === 'owner') return 'ðŸ‘‘ ã‚ªãƒ¼ãƒŠãƒ¼';
    if (role === 'admin') return 'ðŸ‘¤ ç®¡ç†è€…';
    return 'ðŸŽ“ æ–°äºº';
  };

  const getRoleColor = (role) => {
    if (role === 'owner') return '#f59e0b';
    if (role === 'admin') return '#7c3aed';
    return '#2563eb';
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>ðŸ‘¥ ãƒ¡ãƒ³ãƒãƒ¼ä¸€è¦§</h2>
        <button onClick={onShowAddModal} style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #9333ea)', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>âž• è¿½åŠ </button>
      </div>
      
      {/* ã‚ªãƒ¼ãƒŠãƒ¼ã®ã¿: ç®¡ç†è€…ä¸€è¦§ */}
      {isOwner && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '12px' }}>ç®¡ç†è€…ãƒ»ã‚ªãƒ¼ãƒŠãƒ¼</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {admins.map(admin => (
              <div key={admin.id} onClick={() => onSelectMember(admin)} style={{ background: admin.role === 'owner' ? 'linear-gradient(135deg, #fefce8, #fef9c3)' : 'white', borderRadius: '12px', padding: '16px', border: admin.role === 'owner' ? '1px solid #fde047' : '1px solid #e2e8f0', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', background: `linear-gradient(135deg, ${getRoleColor(admin.role)}, ${getRoleColor(admin.role)}cc)`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>{admin.name.charAt(0)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#1e293b' }}>{admin.name} {admin.id === currentUser.id && <span style={{ fontSize: '11px', color: '#94a3b8' }}>(è‡ªåˆ†)</span>}</div>
                    <div style={{ fontSize: '12px', color: getRoleColor(admin.role) }}>{getRoleLabel(admin.role)}</div>
                  </div>
                  <div style={{ color: '#94a3b8' }}>â–¶</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* æ–°äººä¸€è¦§ */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '12px' }}>æ–°äºº</h3>
        {trainees.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <p style={{ color: '#94a3b8' }}>æ–°äººãŒã„ã¾ã›ã‚“</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {trainees.map(trainee => {
              const progress = traineeProgress[trainee.id] || [];
              const progressPercent = Math.round((progress.length / 13) * 100);
              const statusLabel = trainee.status === 'debut' ? 'â­ ãƒ‡ãƒ“ãƒ¥ãƒ¼' : trainee.status === 'expired' ? 'ðŸ”’ æœŸé™åˆ‡ã‚Œ' : 'ðŸŽ“ ç ”ä¿®ä¸­';
              const statusColor = trainee.status === 'debut' ? '#16a34a' : trainee.status === 'expired' ? '#dc2626' : '#2563eb';
              
              return (
                <div key={trainee.id} onClick={() => onSelectMember(trainee)} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', background: `linear-gradient(135deg, ${statusColor}, ${statusColor}cc)`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>{trainee.name.charAt(0)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>{trainee.name}</div>
                      <div style={{ fontSize: '12px', color: statusColor }}>{statusLabel}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: progressPercent === 100 ? '#16a34a' : '#2563eb' }}>{progressPercent}%</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>é€²æ—</div>
                    </div>
                    <div style={{ color: '#94a3b8' }}>â–¶</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

// ã‚·ãƒ•ãƒˆä¸€è¦§ï¼ˆæ¬¡å›žå‡ºå‹¤äºˆå®šä»˜ãï¼‰
const AdminShiftList = ({ trainees, allShifts, setSelectedTraineeForShift }) => {
  // æ¬¡å›žå‡ºå‹¤æ—¥ã‚’è¨ˆç®—
  const getNextWorkDay = (traineeId) => {
    const traineeShifts = allShifts[traineeId] || {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // ä»Šæ—¥ã‹ã‚‰60æ—¥å…ˆã¾ã§ãƒã‚§ãƒƒã‚¯
    for (let i = 0; i <= 60; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const key = formatDateKey(checkDate);
      const shift = traineeShifts[key];
      if (shift?.type === 'work') {
        return { date: checkDate, shift };
      }
    }
    return null;
  };

  const activeTrainees = trainees.filter(t => t.status !== 'expired');

  return (
    <>
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>ðŸ“… ã‚·ãƒ•ãƒˆç®¡ç†</h2>
      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>ãƒ¡ãƒ³ãƒãƒ¼ã‚’ã‚¿ãƒƒãƒ—ã—ã¦ã‚·ãƒ•ãƒˆã‚’ç¢ºèªãƒ»ç·¨é›†</div>
      
      {activeTrainees.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>ðŸ“­</div>
          <p style={{ color: '#94a3b8' }}>ãƒ¡ãƒ³ãƒãƒ¼ãŒã„ã¾ã›ã‚“</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeTrainees.map(t => {
            const nextWork = getNextWorkDay(t.id);
            return (
              <div key={t.id} onClick={() => setSelectedTraineeForShift(t)} style={{ background: 'white', borderRadius: '12px', padding: '16px', cursor: 'pointer', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', background: t.status === 'debut' ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>{t.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{t.status === 'debut' ? 'â­ ãƒ‡ãƒ“ãƒ¥ãƒ¼æ¸ˆã¿' : 'ðŸŽ“ ç ”ä¿®ä¸­'}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {nextWork ? (
                      <>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>æ¬¡å›žå‡ºå‹¤</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#2563eb' }}>
                          {nextWork.date.getMonth() + 1}/{nextWork.date.getDate()}({['æ—¥','æœˆ','ç«','æ°´','æœ¨','é‡‘','åœŸ'][nextWork.date.getDay()]})
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{nextWork.shift.start}ã€œ</div>
                      </>
                    ) : (
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>äºˆå®šãªã—</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

// ã‚·ãƒ•ãƒˆã‚«ãƒ¬ãƒ³ãƒ€ãƒ¼
const AdminShiftCalendar = ({ selectedTraineeForShift, setSelectedTraineeForShift, adminCurrentMonth, setAdminCurrentMonth, allShifts, setAdminSelectedDate, setAdminShiftType, setAdminShiftStart, setAdminShiftEnd, setShowAdminShiftModal }) => (
  <>
    <button onClick={() => setSelectedTraineeForShift(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', background: 'none', border: 'none', color: '#7c3aed', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>â—€ æˆ»ã‚‹</button>
    <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', borderRadius: '12px', padding: '16px', marginBottom: '16px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700' }}>{selectedTraineeForShift.name.charAt(0)}</div>
      <div><div style={{ fontWeight: '700', fontSize: '18px' }}>{selectedTraineeForShift.name}</div></div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <button onClick={() => setAdminCurrentMonth(new Date(adminCurrentMonth.getFullYear(), adminCurrentMonth.getMonth() - 1))} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>â—€</button>
      <span style={{ fontWeight: '700', color: '#1e293b' }}>{adminCurrentMonth.getFullYear()}å¹´ {adminCurrentMonth.getMonth() + 1}æœˆ</span>
      <button onClick={() => setAdminCurrentMonth(new Date(adminCurrentMonth.getFullYear(), adminCurrentMonth.getMonth() + 1))} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>â–¶</button>
    </div>
    <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
        {['æ—¥', 'æœˆ', 'ç«', 'æ°´', 'æœ¨', 'é‡‘', 'åœŸ'].map((d, i) => (<div key={d} style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', color: i === 0 ? '#dc2626' : i === 6 ? '#2563eb' : '#64748b', padding: '8px 0' }}>{d}</div>))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {getDaysInMonth(adminCurrentMonth).map((date, i) => {
          if (!date) return <div key={i} />;
          const key = formatDateKey(date);
          const traineeShifts = allShifts[selectedTraineeForShift.id] || {};
          const shift = traineeShifts[key];
          const isToday = formatDateKey(date) === formatDateKey(new Date());
          return (
            <div key={i} onClick={() => { setAdminSelectedDate(date); setAdminShiftType(shift?.type || 'work'); setAdminShiftStart(shift?.start || '09:00'); setAdminShiftEnd(shift?.end || '18:00'); setShowAdminShiftModal(true); }} style={{ aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', cursor: 'pointer', background: shift?.type === 'work' ? '#dbeafe' : shift?.type === 'off' ? '#fee2e2' : isToday ? '#f0fdf4' : 'white', border: isToday ? '2px solid #16a34a' : '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '14px', fontWeight: isToday ? '700' : '500', color: date.getDay() === 0 ? '#dc2626' : date.getDay() === 6 ? '#2563eb' : '#1e293b' }}>{date.getDate()}</div>
              {shift && <div style={{ fontSize: '8px', color: shift.type === 'work' ? '#2563eb' : '#dc2626' }}>{shift.type === 'work' ? shift.start : 'OFF'}</div>}
            </div>
          );
        })}
      </div>
    </div>
  </>
);

// è¨­å®šã‚¿ãƒ–ï¼ˆæ¨©é™å¯¾å¿œï¼‰
const AdminSettingsTab = ({ admins, currentUser, setShowAddAdminModal, isOwner, handlePromoteToOwner, handleDeleteAdmin }) => {
  
  // å½¹è·ã®ãƒ©ãƒ™ãƒ«ã‚’å–å¾—
  const getRoleLabel = (role) => {
    switch (role) {
      case 'owner': return 'ðŸ‘‘ ã‚ªãƒ¼ãƒŠãƒ¼';
      case 'admin': return 'ðŸ‘¤ ç®¡ç†è€…';
      default: return 'ðŸ‘¤ ç®¡ç†è€…';
    }
  };

  // å½¹è·ã®ãƒãƒƒã‚¸ã‚«ãƒ©ãƒ¼
  const getRoleBadgeStyle = (role) => {
    if (role === 'owner') {
      return { background: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' };
    }
    return { background: '#e0e7ff', color: '#4338ca', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' };
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}><h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>âš™ï¸ è¨­å®š</h2></div>
      
      {/* è‡ªåˆ†ã®æ¨©é™è¡¨ç¤º */}
      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', borderRadius: '16px', padding: '20px', marginBottom: '16px', color: 'white' }}>
        <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>ãƒ­ã‚°ã‚¤ãƒ³ä¸­</div>
        <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '4px' }}>{currentUser?.name}</div>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
          {getRoleLabel(currentUser?.role)}
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>ðŸ‘¥ ãƒ¡ãƒ³ãƒãƒ¼ä¸€è¦§</h3>
          {isOwner && (
            <button onClick={() => setShowAddAdminModal(true)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#7c3aed', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>âž• ç®¡ç†è€…è¿½åŠ </button>
          )}
        </div>
        
        {admins.map((admin) => (
          <div key={admin.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: admin.role === 'owner' ? '#fefce8' : '#faf5ff', borderRadius: '10px', marginBottom: '8px', border: admin.role === 'owner' ? '1px solid #fde047' : '1px solid #e9d5ff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: admin.role === 'owner' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #7c3aed, #9333ea)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>{admin.name.charAt(0)}</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>{admin.name}</span>
                  <span style={getRoleBadgeStyle(admin.role)}>{admin.role === 'owner' ? 'ã‚ªãƒ¼ãƒŠãƒ¼' : 'ç®¡ç†è€…'}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{admin.email}</div>
              </div>
            </div>
            
            {/* ã‚ªãƒ¼ãƒŠãƒ¼ã®ã¿æ“ä½œå¯èƒ½ */}
            {isOwner && admin.id !== currentUser?.id && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {admin.role !== 'owner' && (
                  <button onClick={() => { if (confirm(`${admin.name}ã•ã‚“ã‚’ã‚ªãƒ¼ãƒŠãƒ¼ã«æ˜‡æ ¼ã—ã¾ã™ã‹ï¼Ÿ`)) handlePromoteToOwner(admin.id); }} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #f59e0b', background: 'white', color: '#f59e0b', fontWeight: '600', cursor: 'pointer', fontSize: '12px' }}>ðŸ‘‘ ã‚ªãƒ¼ãƒŠãƒ¼ã«</button>
                )}
                <button onClick={() => { if (confirm(`${admin.name}ã•ã‚“ã‚’å‰Šé™¤ã—ã¾ã™ã‹ï¼Ÿ`)) handleDeleteAdmin(admin.id); }} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: '600', cursor: 'pointer', fontSize: '12px' }}>ðŸ—‘</button>
              </div>
            )}
            
            {admin.id === currentUser?.id && (
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>è‡ªåˆ†</span>
            )}
          </div>
        ))}
      </div>

      {/* æ¨©é™ã®èª¬æ˜Ž */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>ðŸ“‹ æ¨©é™ã«ã¤ã„ã¦</h3>
        <div style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '8px' }}><span style={{ fontWeight: '600', color: '#f59e0b' }}>ðŸ‘‘ ã‚ªãƒ¼ãƒŠãƒ¼:</span> å…¨ã¦ã®æ“ä½œãŒå¯èƒ½ï¼ˆç®¡ç†è€…ã®è¿½åŠ ãƒ»å‰Šé™¤ã€ã‚ªãƒ¼ãƒŠãƒ¼ä»»å‘½ï¼‰</div>
          <div style={{ marginBottom: '8px' }}><span style={{ fontWeight: '600', color: '#7c3aed' }}>ðŸ‘¤ ç®¡ç†è€…:</span> æ–°äººã®è¿½åŠ ãƒ»ç·¨é›†ãƒ»å‰Šé™¤ãŒå¯èƒ½</div>
          <div><span style={{ fontWeight: '600', color: '#2563eb' }}>ðŸŽ“ æ–°äºº:</span> è‡ªåˆ†ã®ç ”ä¿®é€²æ—ãƒ»ã‚·ãƒ•ãƒˆã®ç®¡ç†ã®ã¿</div>
        </div>
      </div>
    </>
  );
};

// カリキュラム管理タブ
const AdminCurriculumTab = ({ curriculum, onAdd, onUpdate, onDelete, onReorder, isOwner }) => {
  const [editingItem, setEditingItem] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newDescription, setNewDescription] = React.useState('');
  const [editTitle, setEditTitle] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    await onAdd({ title: newTitle.trim(), description: newDescription.trim() });
    setNewTitle('');
    setNewDescription('');
    setShowAddModal(false);
  };

  const handleUpdate = async () => {
    if (!editTitle.trim() || !editingItem) return;
    await onUpdate(editingItem.id, { title: editTitle.trim(), description: editDescription.trim() });
    setEditingItem(null);
  };

  const handleDelete = async (item) => {
    if (confirm(`「${item.title}」を削除しますか？\n\n※この操作は取り消せません`)) {
      await onDelete(item.id);
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const newOrder = [...curriculum];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    await onReorder(newOrder);
  };

  const handleMoveDown = async (index) => {
    if (index === curriculum.length - 1) return;
    const newOrder = [...curriculum];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    await onReorder(newOrder);
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDescription(item.description || '');
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>📚 研修カリキュラム管理</h2>
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
          <p style={{ color: '#94a3b8' }}>カリキュラムがありません</p>
          <p style={{ color: '#94a3b8', fontSize: '13px' }}>「項目追加」から研修内容を追加してください</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {curriculum.map((item, index) => (
            <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {/* 順番バッジ */}
                <div style={{ width: '32px', height: '32px', background: '#e0e7ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4338ca', fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>
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
                    onClick={() => handleMoveUp(index)} 
                    disabled={index === 0}
                    style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #e2e8f0', background: index === 0 ? '#f8fafc' : 'white', color: index === 0 ? '#cbd5e1' : '#64748b', cursor: index === 0 ? 'not-allowed' : 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    ▲
                  </button>
                  <button 
                    onClick={() => handleMoveDown(index)} 
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
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>📝 研修項目を追加</h3>
            
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
                placeholder="研修内容の説明やURLを入力&#10;&#10;例：&#10;営業の基本を学ぶ動画研修&#10;https://example.com/video" 
                rows={6}
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box', resize: 'vertical' }} 
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
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>✏️ 研修項目を編集</h3>
            
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
                style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box', resize: 'vertical' }} 
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
