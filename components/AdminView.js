// 管理者画面コンポーネント
const AdminView = ({ 
  currentUser, currentTime, setView, setCurrentUser, 
  trainees, setTrainees, admins, setAdmins,
  traineeProgress, allShifts, setAllShifts,
  fadeOutList,
  showAddTraineeModal, setShowAddTraineeModal,
  showDeleteModal, setShowDeleteModal, deleteTarget, setDeleteTarget,
  showResetModal, setShowResetModal, handleReset,
  showAddAdminModal, setShowAddAdminModal,
  handlePromoteToOwner, handleDeleteAdmin
}) => {
  const [adminTab, setAdminTab] = React.useState('training');
  const [selectedTraineeForShift, setSelectedTraineeForShift] = React.useState(null);
  const [adminCurrentMonth, setAdminCurrentMonth] = React.useState(new Date());
  const [showAdminShiftModal, setShowAdminShiftModal] = React.useState(false);
  const [adminSelectedDate, setAdminSelectedDate] = React.useState(null);
  const [adminShiftType, setAdminShiftType] = React.useState('work');
  const [adminShiftStart, setAdminShiftStart] = React.useState('09:00');
  const [adminShiftEnd, setAdminShiftEnd] = React.useState('18:00');
  const [selectedMember, setSelectedMember] = React.useState(null); // 個人ページ用

  // 権限チェック
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

  // 個人ページが選択されている場合
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
        isOwner={isOwner}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* ヘッダー */}
      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', padding: '16px 20px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{isOwner ? '👑' : '👤'}</div>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>{isOwner ? 'オーナー' : '管理者'}画面</span>
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
            { id: 'members', label: '👥 メンバー' },
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
            onSelectMember={setSelectedMember}
          />
        )}

        {/* 期限切れタブ */}
        {adminTab === 'expired' && (
          <AdminExpiredTab
            trainees={trainees}
            setTrainees={setTrainees}
            setDeleteTarget={setDeleteTarget}
            setShowDeleteModal={setShowDeleteModal}
            onSelectMember={setSelectedMember}
          />
        )}

        {/* デビュータブ */}
        {adminTab === 'debut' && (
          <AdminDebutTab trainees={trainees} onSelectMember={setSelectedMember} />
        )}

        {/* フェードアウトタブ */}
        {adminTab === 'fadeout' && (
          <AdminFadeOutTab fadeOutList={fadeOutList} />
        )}

        {/* メンバータブ */}
        {adminTab === 'members' && (
          <AdminMembersTab
            trainees={trainees}
            admins={admins}
            currentUser={currentUser}
            traineeProgress={traineeProgress}
            onSelectMember={setSelectedMember}
            isOwner={isOwner}
          />
        )}

        {/* 進捗タブ */}
        {adminTab === 'progress' && (
          <AdminProgressTab
            trainees={trainees}
            traineeProgress={traineeProgress}
            currentTime={currentTime}
            onSelectMember={setSelectedMember}
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
            currentUser={currentUser}
            setShowAddAdminModal={setShowAddAdminModal}
            onDeleteAdmin={handleDeleteAdmin}
            onPromoteToOwner={handlePromoteToOwner}
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

// 個人プロフィールページ
const MemberProfilePage = ({ member, currentUser, trainees, admins, traineeProgress, allShifts, currentTime, onBack, onPromoteToOwner, isOwner }) => {
  const [profileMonth, setProfileMonth] = React.useState(new Date());
  
  // メンバーの種類を判定
  const isTrainee = trainees.some(t => t.id === member.id);
  const isAdmin = admins.some(a => a.id === member.id);
  const memberRole = member.role || (isTrainee ? 'trainee' : 'admin');
  
  // 新人の進捗
  const progress = traineeProgress[member.id] || [];
  const progressPercent = Math.round((progress.length / 13) * 100);
  
  // 次回出勤日を計算
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

  // 役職ラベル
  const getRoleLabel = () => {
    if (memberRole === 'owner') return '👑 オーナー';
    if (memberRole === 'admin') return '👤 管理者';
    if (member.status === 'debut') return '⭐ デビュー済み';
    if (member.status === 'expired') return '🔒 期限切れ';
    return '🎓 研修中';
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
      {/* ヘッダー */}
      <div style={{ background: `linear-gradient(135deg, ${getRoleColor()}, ${getRoleColor()}dd)`, padding: '16px 20px', color: 'white' }}>
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', marginBottom: '16px', fontSize: '14px' }}>
          ◀ 戻る
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
        {/* 基本情報 */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>📋 基本情報</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>名前</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{member.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>メール</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{member.email}</span>
            </div>
            {isTrainee && member.firstLoginAt && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>研修開始日</span>
                <span style={{ fontWeight: '600', color: '#1e293b' }}>{new Date(member.firstLoginAt).toLocaleDateString('ja-JP')}</span>
              </div>
            )}
            {isTrainee && member.status === 'training' && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>残り日数</span>
                <span style={{ fontWeight: '600', color: '#2563eb' }}>{getTimeRemaining(member.firstLoginAt, currentTime).days}日</span>
              </div>
            )}
          </div>
        </div>

        {/* 新人の場合: 研修進捗 */}
        {isTrainee && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>📚 研修進捗</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ color: '#64748b' }}>完了率</span>
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

        {/* 次回出勤予定 */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>📅 次回出勤予定</h3>
          {nextWork ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: '#dbeafe', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb' }}>{nextWork.date.getMonth() + 1}/{nextWork.date.getDate()}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{['日','月','火','水','木','金','土'][nextWork.date.getDay()]}曜日</div>
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>{nextWork.shift.start} 〜 {nextWork.shift.end}</div>
              </div>
            </div>
          ) : (
            <div style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>予定なし</div>
          )}
        </div>

        {/* オーナー権限委譲ボタン（オーナーが他のメンバーを見ている場合のみ） */}
        {isOwner && member.id !== currentUser.id && memberRole !== 'owner' && (
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>⚙️ 権限管理</h3>
            {isAdmin && (
              <button 
                onClick={() => { 
                  if (confirm(`${member.name}さんにオーナー権限を委譲しますか？\n\n※この操作は取り消せません`)) {
                    onPromoteToOwner(member.id);
                    onBack();
                  }
                }} 
                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}
              >
                👑 オーナー権限を委譲する
              </button>
            )}
            {isTrainee && (
              <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '14px' }}>新人にはオーナー権限を委譲できません。<br/>先に管理者に昇格させてください。</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
