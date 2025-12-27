// ç®¡ç†è€…ç”»é¢ã‚³ãƒ³ãƒãƒ¼ãƒãƒ³ãƒˆ
const AdminView = ({ 
  currentUser, currentTime, setView, setCurrentUser, 
  trainees, setTrainees, admins, setAdmins,
  traineeProgress, allShifts, setAllShifts,
  fadeOutList,
  showAddTraineeModal, setShowAddTraineeModal,
  showDeleteModal, setShowDeleteModal, deleteTarget, setDeleteTarget,
  showResetModal, setShowResetModal, handleReset,
  showAddAdminModal, setShowAddAdminModal,
  handlePromoteToOwner, handleDeleteAdmin,
  handleAddTraineeFromModal, handleAddAdminFromModal,
  handlePermanentDelete,
  baseCurriculum,
  onAddCurriculumItem, onUpdateCurriculumItem, onDeleteCurriculumItem, onReorderCurriculum
}) => {
  const [adminTab, setAdminTab] = React.useState('training');
  const [selectedTraineeForShift, setSelectedTraineeForShift] = React.useState(null);
  const [adminCurrentMonth, setAdminCurrentMonth] = React.useState(new Date());
  const [showAdminShiftModal, setShowAdminShiftModal] = React.useState(false);
  const [adminSelectedDate, setAdminSelectedDate] = React.useState(null);
  const [adminShiftType, setAdminShiftType] = React.useState('work');
  const [adminShiftStart, setAdminShiftStart] = React.useState('09:00');
  const [adminShiftEnd, setAdminShiftEnd] = React.useState('18:00');
  const [selectedMember, setSelectedMember] = React.useState(null); // å€‹äººãƒšãƒ¼ã‚¸ç”¨
  const [showAddMemberModal, setShowAddMemberModal] = React.useState(false); // çµ±åˆè¿½åŠ ãƒ¢ãƒ¼ãƒ€ãƒ«

  // æ¨©é™ãƒã‚§ãƒƒã‚¯
  const isOwner = currentUser?.role === 'owner';

  const trainingCount = trainees.filter(t => t.status === 'training').length;
  const expiredCount = trainees.filter(t => t.status === 'expired').length;
  const debutCount = trainees.filter(t => t.status === 'debut').length;
  const fadeOutCount = fadeOutList.length;

  const handleAdminShiftSave = () => {
    const key = formatDateKey(adminSelectedDate);
    const traineeId = selectedTraineeForShift.id;
    const traineeShifts = allShifts[traineeId] || {};
    if (adminShiftType === 'off') {
      traineeShifts[key] = { type: 'off' };
    } else {
      traineeShifts[key] = { type: 'work', start: adminShiftStart, end: adminShiftEnd };
    }
    setAllShifts({ ...allShifts, [traineeId]: traineeShifts });
    setShowAdminShiftModal(false);
  };

  const handleAdminShiftDelete = () => {
    const key = formatDateKey(adminSelectedDate);
    const traineeId = selectedTraineeForShift.id;
    const traineeShifts = { ...(allShifts[selectedTraineeForShift.id] || {}) };
    delete traineeShifts[key];
    setAllShifts({ ...allShifts, [traineeId]: traineeShifts });
    setShowAdminShiftModal(false);
  };

  // å€‹äººãƒšãƒ¼ã‚¸ãŒé¸æŠžã•ã‚Œã¦ã„ã‚‹å ´åˆ
  if (selectedMember) {
    return (
      <MemberProfilePage
        member={selectedMember}
        currentUser={currentUser}
        trainees={trainees}
        admins={admins}
        traineeProgress={traineeProgress}
        allShifts={allShifts}
        currentTime={currentTime}
        onBack={() => setSelectedMember(null)}
        onPromoteToOwner={handlePromoteToOwner}
        onPermanentDelete={handlePermanentDelete}
        isOwner={isOwner}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* ãƒ˜ãƒƒãƒ€ãƒ¼ */}
      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', padding: '16px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{isOwner ? 'ðŸ‘‘' : 'ðŸ‘¤'}</div>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>{isOwner ? 'ã‚ªãƒ¼ãƒŠãƒ¼' : 'ç®¡ç†è€…'}ç”»é¢</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setShowResetModal(true)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>ðŸ”„</button>
          <button onClick={() => { setView('login'); setCurrentUser(null); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>ãƒ­ã‚°ã‚¢ã‚¦ãƒˆ</button>
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {/* çµ±è¨ˆã‚µãƒžãƒªãƒ¼ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb' }}>{trainingCount}</div><div style={{ fontSize: '10px', color: '#64748b' }}>ç ”ä¿®ä¸­</div></div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626' }}>{expiredCount}</div><div style={{ fontSize: '10px', color: '#64748b' }}>æœŸé™åˆ‡ã‚Œ</div></div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a' }}>{debutCount}</div><div style={{ fontSize: '10px', color: '#64748b' }}>ãƒ‡ãƒ“ãƒ¥ãƒ¼</div></div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontSize: '24px', fontWeight: '700', color: '#94a3b8' }}>{fadeOutCount}</div><div style={{ fontSize: '10px', color: '#64748b' }}>FO</div></div>
        </div>

        {/* ã‚¿ãƒ– */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'training', label: 'ðŸŽ“ ç ”ä¿®ä¸­' },
            { id: 'expired', label: 'ðŸ”’ æœŸé™åˆ‡ã‚Œ' },
            { id: 'debut', label: 'â­ ãƒ‡ãƒ“ãƒ¥ãƒ¼' },
            { id: 'fadeout', label: 'ðŸ‘» FO' },
            { id: 'members', label: 'ðŸ‘¥ ãƒ¡ãƒ³ãƒãƒ¼' },
            { id: 'progress', label: 'ðŸ“Š é€²æ—' },
            { id: 'shifts', label: 'ðŸ“… ã‚·ãƒ•ãƒˆ' },
            { id: 'curriculum', label: '📚 研修内容' },
            { id: 'settings', label: 'âš™ï¸ è¨­å®š' }
          ].map(tab => (
            <button key={tab.id} onClick={() => { setAdminTab(tab.id); setSelectedTraineeForShift(null); }} style={{ padding: '10px 14px', borderRadius: '10px', border: 'none', background: adminTab === tab.id ? '#7c3aed' : 'white', color: adminTab === tab.id ? 'white' : '#64748b', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '13px' }}>{tab.label}</button>
          ))}
        </div>

        {/* ç ”ä¿®ä¸­ã‚¿ãƒ– */}
        {adminTab === 'training' && (
          <AdminTrainingTab
            trainees={trainees}
            setTrainees={setTrainees}
            currentTime={currentTime}
            setShowAddTraineeModal={setShowAddTraineeModal}
            setDeleteTarget={setDeleteTarget}
            setShowDeleteModal={setShowDeleteModal}
            onSelectMember={setSelectedMember}
          />
        )}

        {/* æœŸé™åˆ‡ã‚Œã‚¿ãƒ– */}
        {adminTab === 'expired' && (
          <AdminExpiredTab
            trainees={trainees}
            setTrainees={setTrainees}
            setDeleteTarget={setDeleteTarget}
            setShowDeleteModal={setShowDeleteModal}
            onSelectMember={setSelectedMember}
          />
        )}

        {/* ãƒ‡ãƒ“ãƒ¥ãƒ¼ã‚¿ãƒ– */}
        {adminTab === 'debut' && (
          <AdminDebutTab trainees={trainees} onSelectMember={setSelectedMember} />
        )}

        {/* ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆã‚¿ãƒ– */}
        {adminTab === 'fadeout' && (
          <AdminFadeOutTab fadeOutList={fadeOutList} />
        )}

        {/* ãƒ¡ãƒ³ãƒãƒ¼ã‚¿ãƒ– */}
        {adminTab === 'members' && (
          <AdminMembersTab
            trainees={trainees}
            admins={admins}
            currentUser={currentUser}
            traineeProgress={traineeProgress}
            onSelectMember={setSelectedMember}
            isOwner={isOwner}
            onShowAddModal={() => setShowAddMemberModal(true)}
          />
        )}

        {/* é€²æ—ã‚¿ãƒ– */}
        {adminTab === 'progress' && (
          <AdminProgressTab
            trainees={trainees}
            traineeProgress={traineeProgress}
            currentTime={currentTime}
            onSelectMember={setSelectedMember}
          />
        )}

        {/* ã‚·ãƒ•ãƒˆç®¡ç†ã‚¿ãƒ– */}
        {adminTab === 'shifts' && !selectedTraineeForShift && (
          <AdminShiftList
            trainees={trainees}
            allShifts={allShifts}
            setSelectedTraineeForShift={setSelectedTraineeForShift}
          />
        )}

        {adminTab === 'shifts' && selectedTraineeForShift && (
          <AdminShiftCalendar
            selectedTraineeForShift={selectedTraineeForShift}
            setSelectedTraineeForShift={setSelectedTraineeForShift}
            adminCurrentMonth={adminCurrentMonth}
            setAdminCurrentMonth={setAdminCurrentMonth}
            allShifts={allShifts}
            setAdminSelectedDate={setAdminSelectedDate}
            setAdminShiftType={setAdminShiftType}
            setAdminShiftStart={setAdminShiftStart}
            setAdminShiftEnd={setAdminShiftEnd}
            setShowAdminShiftModal={setShowAdminShiftModal}
          />
        )}

        {/* カリキュラム管理タブ */}
        {adminTab === 'curriculum' && (
          <AdminCurriculumTab
            curriculum={baseCurriculum}
            onAdd={onAddCurriculumItem}
            onUpdate={onUpdateCurriculumItem}
            onDelete={onDeleteCurriculumItem}
            onReorder={onReorderCurriculum}
            isOwner={isOwner}
          />
        )}

        {/* è¨­å®šã‚¿ãƒ– */}
        {adminTab === 'settings' && (
          <AdminSettingsTab
            admins={admins}
            currentUser={currentUser}
            setShowAddAdminModal={setShowAddAdminModal}
            onDeleteAdmin={handleDeleteAdmin}
            onPromoteToOwner={handlePromoteToOwner}
          />
        )}
      </div>

      {/* ã‚·ãƒ•ãƒˆç·¨é›†ãƒ¢ãƒ¼ãƒ€ãƒ« */}
      {showAdminShiftModal && adminSelectedDate && (
        <AdminShiftModal
          selectedTraineeForShift={selectedTraineeForShift}
          adminSelectedDate={adminSelectedDate}
          adminShiftType={adminShiftType}
          setAdminShiftType={setAdminShiftType}
          adminShiftStart={adminShiftStart}
          setAdminShiftStart={setAdminShiftStart}
          adminShiftEnd={adminShiftEnd}
          setAdminShiftEnd={setAdminShiftEnd}
          handleAdminShiftSave={handleAdminShiftSave}
          handleAdminShiftDelete={handleAdminShiftDelete}
          allShifts={allShifts}
          setShowAdminShiftModal={setShowAdminShiftModal}
        />
      )}

      {/* çµ±åˆãƒ¡ãƒ³ãƒãƒ¼è¿½åŠ ãƒ¢ãƒ¼ãƒ€ãƒ« */}
      {showAddMemberModal && (
        <AddMemberModal
          isOwner={isOwner}
          onAddTrainee={handleAddTraineeFromModal}
          onAddAdmin={handleAddAdminFromModal}
          onClose={() => setShowAddMemberModal(false)}
        />
      )}
    </div>
  );
};

// å€‹äººãƒ—ãƒ­ãƒ•ã‚£ãƒ¼ãƒ«ãƒšãƒ¼ã‚¸
const MemberProfilePage = ({ member, currentUser, trainees, admins, traineeProgress, allShifts, currentTime, onBack, onPromoteToOwner, onPermanentDelete, isOwner }) => {
  const [profileMonth, setProfileMonth] = React.useState(new Date());
  
  // ãƒ¡ãƒ³ãƒãƒ¼ã®ç¨®é¡žã‚’åˆ¤å®š
  const isTrainee = trainees.some(t => t.id === member.id);
  const isAdmin = admins.some(a => a.id === member.id);
  const memberRole = member.role || (isTrainee ? 'trainee' : 'admin');
  
  // æ–°äººã®é€²æ—
  const progress = traineeProgress[member.id] || [];
  const progressPercent = Math.round((progress.length / 13) * 100);
  
  // æ¬¡å›žå‡ºå‹¤æ—¥ã‚’è¨ˆç®—
  const getNextWorkDay = () => {
    const memberShifts = allShifts[member.id] || {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    for (let i = 0; i <= 60; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() + i);
      const key = formatDateKey(checkDate);
      if (memberShifts[key]?.type === 'work') {
        return { date: checkDate, shift: memberShifts[key] };
      }
    }
    return null;
  };
  const nextWork = getNextWorkDay();

  // å½¹è·ãƒ©ãƒ™ãƒ«
  const getRoleLabel = () => {
    if (memberRole === 'owner') return 'ðŸ‘‘ ã‚ªãƒ¼ãƒŠãƒ¼';
    if (memberRole === 'admin') return 'ðŸ‘¤ ç®¡ç†è€…';
    if (member.status === 'debut') return 'â­ ãƒ‡ãƒ“ãƒ¥ãƒ¼æ¸ˆã¿';
    if (member.status === 'expired') return 'ðŸ”’ æœŸé™åˆ‡ã‚Œ';
    return 'ðŸŽ“ ç ”ä¿®ä¸­';
  };

  const getRoleColor = () => {
    if (memberRole === 'owner') return '#f59e0b';
    if (memberRole === 'admin') return '#7c3aed';
    if (member.status === 'debut') return '#16a34a';
    if (member.status === 'expired') return '#dc2626';
    return '#2563eb';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* ãƒ˜ãƒƒãƒ€ãƒ¼ */}
      <div style={{ background: `linear-gradient(135deg, ${getRoleColor()}, ${getRoleColor()}dd)`, padding: '16px 20px', color: 'white' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginBottom: '16px', fontSize: '14px' }}>
          â—€ æˆ»ã‚‹
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: '700' }}>
            {member.name.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>{member.name}</div>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '12px', fontSize: '12px' }}>
              {getRoleLabel()}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {/* åŸºæœ¬æƒ…å ± */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>ðŸ“‹ åŸºæœ¬æƒ…å ±</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>åå‰</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{member.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>ãƒ¡ãƒ¼ãƒ«</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{member.email}</span>
            </div>
            {isTrainee && member.firstLoginAt && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>ç ”ä¿®é–‹å§‹æ—¥</span>
                <span style={{ fontWeight: '600', color: '#1e293b' }}>{new Date(member.firstLoginAt).toLocaleDateString('ja-JP')}</span>
              </div>
            )}
            {isTrainee && member.status === 'training' && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>æ®‹ã‚Šæ—¥æ•°</span>
                <span style={{ fontWeight: '600', color: '#2563eb' }}>{getTimeRemaining(member.firstLoginAt, currentTime).days}æ—¥</span>
              </div>
            )}
          </div>
        </div>

        {/* æ–°äººã®å ´åˆ: ç ”ä¿®é€²æ— */}
        {isTrainee && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>ðŸ“š ç ”ä¿®é€²æ—</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#64748b' }}>å®Œäº†çŽ‡</span>
              <span style={{ fontSize: '24px', fontWeight: '700', color: progressPercent === 100 ? '#16a34a' : '#2563eb' }}>{progressPercent}%</span>
            </div>
            <div style={{ background: '#e2e8f0', borderRadius: '10px', height: '12px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ background: progressPercent === 100 ? '#16a34a' : 'linear-gradient(90deg, #2563eb, #3b82f6)', height: '100%', width: `${progressPercent}%`, borderRadius: '10px' }} />
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {Array.from({ length: 13 }, (_, i) => i + 1).map(itemId => (
                <div key={itemId} style={{ width: '28px', height: '28px', borderRadius: '6px', background: progress.includes(itemId) ? '#16a34a' : '#e2e8f0', color: progress.includes(itemId) ? 'white' : '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>{itemId}</div>
              ))}
            </div>
          </div>
        )}

        {/* æ¬¡å›žå‡ºå‹¤äºˆå®š */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>ðŸ“… æ¬¡å›žå‡ºå‹¤äºˆå®š</h3>
          {nextWork ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: '#dbeafe', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb' }}>{nextWork.date.getMonth() + 1}/{nextWork.date.getDate()}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{['æ—¥','æœˆ','ç«','æ°´','æœ¨','é‡‘','åœŸ'][nextWork.date.getDay()]}æ›œæ—¥</div>
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{nextWork.shift.start} ã€œ {nextWork.shift.end}</div>
              </div>
            </div>
          ) : (
            <div style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>äºˆå®šãªã—</div>
          )}
        </div>

        {/* ã‚ªãƒ¼ãƒŠãƒ¼æ¨©é™å§”è­²ãƒœã‚¿ãƒ³ï¼ˆã‚ªãƒ¼ãƒŠãƒ¼ãŒä»–ã®ãƒ¡ãƒ³ãƒãƒ¼ã‚’è¦‹ã¦ã„ã‚‹å ´åˆã®ã¿ï¼‰ */}
        {isOwner && member.id !== currentUser.id && memberRole !== 'owner' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>âš™ï¸ æ¨©é™ç®¡ç†</h3>
            {isAdmin && (
              <button 
                onClick={() => { 
                  if (confirm(`${member.name}ã•ã‚“ã«ã‚ªãƒ¼ãƒŠãƒ¼æ¨©é™ã‚’å§”è­²ã—ã¾ã™ã‹ï¼Ÿ\n\nâ€»ã“ã®æ“ä½œã¯å–ã‚Šæ¶ˆã›ã¾ã›ã‚“`)) {
                    onPromoteToOwner(member.id);
                    onBack();
                  }
                }} 
                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}
              >
                ðŸ‘‘ ã‚ªãƒ¼ãƒŠãƒ¼æ¨©é™ã‚’å§”è­²ã™ã‚‹
              </button>
            )}
            {isTrainee && (
              <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '14px' }}>æ–°äººã«ã¯ã‚ªãƒ¼ãƒŠãƒ¼æ¨©é™ã‚’å§”è­²ã§ãã¾ã›ã‚“ã€‚<br/>å…ˆã«ç®¡ç†è€…ã«æ˜‡æ ¼ã•ã›ã¦ãã ã•ã„ã€‚</p>
            )}
          </div>
        )}

        {/* ã‚ªãƒ¼ãƒŠãƒ¼å°‚ç”¨ï¼šå®Œå…¨å‰Šé™¤ï¼ˆãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆã¨ã¯åˆ¥ï¼‰ */}
        {isOwner && member.id !== currentUser.id && (
          <div style={{ background: '#fef2f2', borderRadius: '16px', padding: '20px', marginBottom: '16px', border: '1px solid #fecaca' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#dc2626', marginBottom: '12px' }}>ðŸ—‘ï¸ å®Œå…¨å‰Šé™¤</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆãƒªã‚¹ãƒˆã«æ®‹ã•ãšã€ã“ã®ãƒ¡ãƒ³ãƒãƒ¼ã®ãƒ‡ãƒ¼ã‚¿ã‚’å®Œå…¨ã«å‰Šé™¤ã—ã¾ã™ã€‚<br/>
              ãƒ†ã‚¹ãƒˆç”¨ã‚¢ã‚«ã‚¦ãƒ³ãƒˆã®å‰Šé™¤ãªã©ã«ä½¿ç”¨ã—ã¦ãã ã•ã„ã€‚
            </p>
            <button 
              onClick={() => { 
                if (confirm(`âš ï¸ å®Œå…¨å‰Šé™¤ã®ç¢ºèª\n\n${member.name}ã•ã‚“ã®ãƒ‡ãƒ¼ã‚¿ã‚’å®Œå…¨ã«å‰Šé™¤ã—ã¾ã™ã‹ï¼Ÿ\n\nâ€¢ ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆãƒªã‚¹ãƒˆã«ã¯æ®‹ã‚Šã¾ã›ã‚“\nâ€¢ ã‚·ãƒ•ãƒˆãƒ»é€²æ—ãƒ‡ãƒ¼ã‚¿ã‚‚å‰Šé™¤ã•ã‚Œã¾ã™\nâ€¢ ã“ã®æ“ä½œã¯å–ã‚Šæ¶ˆã›ã¾ã›ã‚“`)) {
                  onPermanentDelete(member, isTrainee ? 'trainee' : 'admin');
                  onBack();
                }
              }} 
              style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: '#dc2626', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}
            >
              ðŸ—‘ï¸ å®Œå…¨ã«å‰Šé™¤ã™ã‚‹
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
