// 研修中タブ
const AdminTrainingTab = ({ trainees, setTrainees, currentTime, setShowAddTraineeModal, setDeleteTarget, setShowDeleteModal }) => {
  const trainingList = trainees.filter(t => t.status === 'training');
  
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b' }}>🎓 研修中 ({trainingList.length}名)</h2>
        <button onClick={() => setShowAddTraineeModal(true)} style={{ padding: '10px 16px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #9333ea)', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>➕ 新人追加</button>
      </div>

      {trainingList.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
          <p style={{ color: '#94a3b8' }}>研修中の新人はいません</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {trainingList.map(t => {
            const time = getTimeRemaining(t.firstLoginAt, currentTime);
            return (
              <div key={t.id} style={{ background: 'white', borderRadius: '12px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>残り {time.days}日 {time.hours}時間</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>開始: {new Date(t.firstLoginAt).toLocaleDateString('ja-JP')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setTrainees(trainees.map(x => x.id === t.id ? { ...x, status: 'debut', debutAt: new Date() } : x))} style={{ padding: '10px 14px', borderRadius: '8px', border: 'none', background: '#16a34a', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>⭐ デビュー</button>
                    <button onClick={() => { setDeleteTarget(t); setShowDeleteModal(true); }} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>🗑</button>
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

// 期限切れタブ
const AdminExpiredTab = ({ trainees, setTrainees, setDeleteTarget, setShowDeleteModal }) => {
  const expiredList = trainees.filter(t => t.status === 'expired');
  
  return (
    <>
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>🔒 期限切れ ({expiredList.length}名)</h2>

      {expiredList.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>✨</div>
          <p style={{ color: '#94a3b8' }}>期限切れの新人はいません</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {expiredList.map(t => (
            <div key={t.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #fecaca' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#dc2626' }}>期限切れ</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>開始: {new Date(t.firstLoginAt).toLocaleDateString('ja-JP')}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setTrainees(trainees.map(x => x.id === t.id ? { ...x, status: 'training', firstLoginAt: new Date() } : x))} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #2563eb', background: 'white', color: '#2563eb', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>🔄 復活</button>
                  <button onClick={() => { setDeleteTarget(t); setShowDeleteModal(true); }} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// デビュータブ
const AdminDebutTab = ({ trainees }) => {
  const debutList = trainees.filter(t => t.status === 'debut');
  
  return (
    <>
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>⭐ デビュー ({debutList.length}名)</h2>

      {debutList.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌱</div>
          <p style={{ color: '#94a3b8' }}>まだデビューした人はいません</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {debutList.map(t => (
            <div key={t.id} style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '12px', padding: '16px', border: '1px solid #86efac' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #16a34a, #22c55e)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>{t.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#16a34a' }}>⭐ デビュー: {t.debutAt ? new Date(t.debutAt).toLocaleDateString('ja-JP') : '不明'}</div>
                  </div>
                </div>
                <div style={{ fontSize: '24px' }}>🎉</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// フェードアウトタブ
const AdminFadeOutTab = ({ fadeOutList }) => {
  return (
    <>
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>👻 フェードアウト ({fadeOutList.length}名)</h2>

      {fadeOutList.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎊</div>
          <p style={{ color: '#94a3b8' }}>フェードアウトした人はいません</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {fadeOutList.map(t => (
            <div key={t.id} style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0', opacity: 0.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', background: '#94a3b8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>{t.name.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: '600', color: '#64748b', marginBottom: '4px' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8' }}>👻 フェードアウト: {t.fadeOutAt ? new Date(t.fadeOutAt).toLocaleDateString('ja-JP') : '不明'}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

// 進捗一覧タブ
const AdminProgressTab = ({ trainees, traineeProgress, currentTime }) => (
  <>
    <div style={{ marginBottom: '20px' }}><h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>📊 研修進捗一覧</h2></div>

    <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', borderRadius: '16px', padding: '20px', marginBottom: '20px', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <div><div style={{ fontSize: '28px', fontWeight: '700' }}>{trainees.filter(t => t.status !== 'expired').length}</div><div style={{ fontSize: '12px', opacity: 0.9 }}>アクティブ</div></div>
        <div><div style={{ fontSize: '28px', fontWeight: '700' }}>{Math.round(trainees.filter(t => t.status !== 'expired').reduce((sum, t) => sum + ((traineeProgress[t.id]?.length || 0) / 13 * 100), 0) / Math.max(trainees.filter(t => t.status !== 'expired').length, 1))}%</div><div style={{ fontSize: '12px', opacity: 0.9 }}>平均進捗</div></div>
        <div><div style={{ fontSize: '28px', fontWeight: '700' }}>{trainees.filter(t => (traineeProgress[t.id]?.length || 0) === 13).length}</div><div style={{ fontSize: '12px', opacity: 0.9 }}>完了者</div></div>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {trainees.filter(t => t.status !== 'expired').map(trainee => {
        const completed = traineeProgress[trainee.id]?.length || 0;
        const percent = Math.round((completed / 13) * 100);
        const time = getTimeRemaining(trainee.firstLoginAt, currentTime);
        return (
          <div key={trainee.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', border: percent === 100 ? '2px solid #16a34a' : '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', background: trainee.status === 'debut' ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>{trainee.name.charAt(0)}</div>
                <div><div style={{ fontWeight: '600', color: '#1e293b' }}>{trainee.name}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{trainee.status === 'debut' ? '⭐ デビュー済み' : `残り ${time.days}日`}</div></div>
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

// シフト一覧（次回出勤予定付き）
const AdminShiftList = ({ trainees, allShifts, setSelectedTraineeForShift }) => {
  // 次回出勤日を計算
  const getNextWorkDay = (traineeId) => {
    const traineeShifts = allShifts[traineeId] || {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // 今日から60日先までチェック
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
      <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>📅 シフト管理</h2>
      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>メンバーをタップしてシフトを確認・編集</div>
      
      {activeTrainees.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
          <p style={{ color: '#94a3b8' }}>メンバーがいません</p>
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
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{t.status === 'debut' ? '⭐ デビュー済み' : '🎓 研修中'}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {nextWork ? (
                      <>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>次回出勤</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#2563eb' }}>
                          {nextWork.date.getMonth() + 1}/{nextWork.date.getDate()}({['日','月','火','水','木','金','土'][nextWork.date.getDay()]})
                        </div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{nextWork.shift.start}〜</div>
                      </>
                    ) : (
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>予定なし</div>
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

// シフトカレンダー
const AdminShiftCalendar = ({ selectedTraineeForShift, setSelectedTraineeForShift, adminCurrentMonth, setAdminCurrentMonth, allShifts, setAdminSelectedDate, setAdminShiftType, setAdminShiftStart, setAdminShiftEnd, setShowAdminShiftModal }) => (
  <>
    <button onClick={() => setSelectedTraineeForShift(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 0', background: 'none', border: 'none', color: '#7c3aed', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>◀ 戻る</button>
    <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', borderRadius: '12px', padding: '16px', marginBottom: '16px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: '700' }}>{selectedTraineeForShift.name.charAt(0)}</div>
      <div><div style={{ fontWeight: '700', fontSize: '18px' }}>{selectedTraineeForShift.name}</div></div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <button onClick={() => setAdminCurrentMonth(new Date(adminCurrentMonth.getFullYear(), adminCurrentMonth.getMonth() - 1))} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>◀</button>
      <span style={{ fontWeight: '700', color: '#1e293b' }}>{adminCurrentMonth.getFullYear()}年 {adminCurrentMonth.getMonth() + 1}月</span>
      <button onClick={() => setAdminCurrentMonth(new Date(adminCurrentMonth.getFullYear(), adminCurrentMonth.getMonth() + 1))} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>▶</button>
    </div>
    <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
        {['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (<div key={d} style={{ textAlign: 'center', fontSize: '12px', fontWeight: '600', color: i === 0 ? '#dc2626' : i === 6 ? '#2563eb' : '#64748b', padding: '8px 0' }}>{d}</div>))}
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

// 設定タブ
const AdminSettingsTab = ({ admins, setAdmins, currentUser, setShowAddAdminModal }) => (
  <>
    <div style={{ marginBottom: '20px' }}><h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>⚙️ 設定</h2></div>
    <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>👤 管理者一覧</h3>
        <button onClick={() => setShowAddAdminModal(true)} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#7c3aed', color: 'white', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>➕ 追加</button>
      </div>
      {admins.map((admin) => (
        <div key={admin.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#faf5ff', borderRadius: '10px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #9333ea)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>{admin.name.charAt(0)}</div>
            <div><div style={{ fontWeight: '600', color: '#1e293b' }}>{admin.name}</div><div style={{ fontSize: '12px', color: '#64748b' }}>{admin.email}</div></div>
          </div>
          {admins.length > 1 && (<button onClick={() => { if (admin.id === currentUser?.id) { alert('自分自身は削除できません'); return; } setAdmins(admins.filter(a => a.id !== admin.id)); }} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>🗑</button>)}
        </div>
      ))}
    </div>
  </>
);
