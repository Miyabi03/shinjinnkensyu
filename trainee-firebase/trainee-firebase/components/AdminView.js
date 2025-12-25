// 管理者画面コンポーネント
const AdminView = ({ 
  currentUser, currentTime, setView, setCurrentUser, 
  trainees, setTrainees, admins, setAdmins,
  traineeProgress, allShifts, setAllShifts,
  fadeOutList,
  showAddTraineeModal, setShowAddTraineeModal,
  showDeleteModal, setShowDeleteModal, deleteTarget, setDeleteTarget,
  showResetModal, setShowResetModal, handleReset,
  showAddAdminModal, setShowAddAdminModal
}) => {
  const [adminTab, setAdminTab] = React.useState('training');
  const [selectedTraineeForShift, setSelectedTraineeForShift] = React.useState(null);
  const [adminCurrentMonth, setAdminCurrentMonth] = React.useState(new Date());
  const [showAdminShiftModal, setShowAdminShiftModal] = React.useState(false);
  const [adminSelectedDate, setAdminSelectedDate] = React.useState(null);
  const [adminShiftType, setAdminShiftType] = React.useState('work');
  const [adminShiftStart, setAdminShiftStart] = React.useState('09:00');
  const [adminShiftEnd, setAdminShiftEnd] = React.useState('18:00');

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

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* ヘッダー */}
      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', padding: '16px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👤</div>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>管理者画面</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setShowResetModal(true)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>🔄</button>
          <button onClick={() => { setView('login'); setCurrentUser(null); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', padding: '8px 12px', color: 'white', cursor: 'pointer', fontSize: '13px' }}>ログアウト</button>
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        {/* 統計サマリー */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb' }}>{trainingCount}</div><div style={{ fontSize: '10px', color: '#64748b' }}>研修中</div></div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626' }}>{expiredCount}</div><div style={{ fontSize: '10px', color: '#64748b' }}>期限切れ</div></div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a' }}>{debutCount}</div><div style={{ fontSize: '10px', color: '#64748b' }}>デビュー</div></div>
          <div style={{ background: 'white', borderRadius: '10px', padding: '12px', textAlign: 'center' }}><div style={{ fontSize: '24px', fontWeight: '700', color: '#94a3b8' }}>{fadeOutCount}</div><div style={{ fontSize: '10px', color: '#64748b' }}>FO</div></div>
        </div>

        {/* タブ */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'training', label: '🎓 研修中' },
            { id: 'expired', label: '🔒 期限切れ' },
            { id: 'debut', label: '⭐ デビュー' },
            { id: 'fadeout', label: '👻 FO' },
            { id: 'progress', label: '📊 進捗' },
            { id: 'shifts', label: '📅 シフト' },
            { id: 'settings', label: '⚙️ 設定' }
          ].map(tab => (
            <button key={tab.id} onClick={() => { setAdminTab(tab.id); setSelectedTraineeForShift(null); }} style={{ padding: '10px 14px', borderRadius: '10px', border: 'none', background: adminTab === tab.id ? '#7c3aed' : 'white', color: adminTab === tab.id ? 'white' : '#64748b', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '13px' }}>{tab.label}</button>
          ))}
        </div>

        {/* 研修中タブ */}
        {adminTab === 'training' && (
          <AdminTrainingTab
            trainees={trainees}
            setTrainees={setTrainees}
            currentTime={currentTime}
            setShowAddTraineeModal={setShowAddTraineeModal}
            setDeleteTarget={setDeleteTarget}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}

        {/* 期限切れタブ */}
        {adminTab === 'expired' && (
          <AdminExpiredTab
            trainees={trainees}
            setTrainees={setTrainees}
            setDeleteTarget={setDeleteTarget}
            setShowDeleteModal={setShowDeleteModal}
          />
        )}

        {/* デビュータブ */}
        {adminTab === 'debut' && (
          <AdminDebutTab trainees={trainees} />
        )}

        {/* フェードアウトタブ */}
        {adminTab === 'fadeout' && (
          <AdminFadeOutTab fadeOutList={fadeOutList} />
        )}

        {/* 進捗タブ */}
        {adminTab === 'progress' && (
          <AdminProgressTab
            trainees={trainees}
            traineeProgress={traineeProgress}
            currentTime={currentTime}
          />
        )}

        {/* シフト管理タブ */}
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

        {/* 設定タブ */}
        {adminTab === 'settings' && (
          <AdminSettingsTab
            admins={admins}
            setAdmins={setAdmins}
            currentUser={currentUser}
            setShowAddAdminModal={setShowAddAdminModal}
          />
        )}
      </div>

      {/* シフト編集モーダル */}
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
    </div>
  );
};
