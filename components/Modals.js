// シフトモーダル（新人用）
const ShiftModal = ({ selectedDate, shiftType, setShiftType, shiftStart, setShiftStart, shiftEnd, setShiftEnd, shifts, setShifts, setShowShiftModal }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
    <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>📅 シフト入力</h3>
      <p style={{ color: '#2563eb', fontWeight: '600', marginBottom: '20px' }}>{selectedDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' })}</p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button onClick={() => setShiftType('work')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: shiftType === 'work' ? '2px solid #2563eb' : '1px solid #e2e8f0', background: shiftType === 'work' ? '#dbeafe' : 'white', color: shiftType === 'work' ? '#2563eb' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>🟢 出勤</button>
        <button onClick={() => setShiftType('off')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: shiftType === 'off' ? '2px solid #dc2626' : '1px solid #e2e8f0', background: shiftType === 'off' ? '#fee2e2' : 'white', color: shiftType === 'off' ? '#dc2626' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>⛔ OFF</button>
      </div>
      {shiftType === 'work' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <select value={shiftStart} onChange={e => setShiftStart(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px' }}>{timeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <span>〜</span>
          <select value={shiftEnd} onChange={e => setShiftEnd(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px' }}>{timeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select>
        </div>
      )}
      <button onClick={() => { const key = formatDateKey(selectedDate); if (shiftType === 'off') { setShifts({ ...shifts, [key]: { type: 'off' } }); } else { setShifts({ ...shifts, [key]: { type: 'work', start: shiftStart, end: shiftEnd } }); } setShowShiftModal(false); }} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: '#2563eb', color: 'white', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>保存</button>
      <button onClick={() => setShowShiftModal(false)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}>キャンセル</button>
    </div>
  </div>
);

// 管理者用シフトモーダル
const AdminShiftModal = ({ selectedTraineeForShift, adminSelectedDate, adminShiftType, setAdminShiftType, adminShiftStart, setAdminShiftStart, adminShiftEnd, setAdminShiftEnd, handleAdminShiftSave, handleAdminShiftDelete, allShifts, setShowAdminShiftModal }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
    <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>📅 シフト編集</h3>
      <p style={{ fontSize: '14px', color: '#7c3aed', fontWeight: '600', marginBottom: '4px' }}>{selectedTraineeForShift?.name}</p>
      <p style={{ color: '#2563eb', fontWeight: '600', marginBottom: '20px' }}>{adminSelectedDate.toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'long' })}</p>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button onClick={() => setAdminShiftType('work')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: adminShiftType === 'work' ? '2px solid #2563eb' : '1px solid #e2e8f0', background: adminShiftType === 'work' ? '#dbeafe' : 'white', color: adminShiftType === 'work' ? '#2563eb' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>🟢 出勤</button>
        <button onClick={() => setAdminShiftType('off')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: adminShiftType === 'off' ? '2px solid #dc2626' : '1px solid #e2e8f0', background: adminShiftType === 'off' ? '#fee2e2' : 'white', color: adminShiftType === 'off' ? '#dc2626' : '#64748b', fontWeight: '600', cursor: 'pointer' }}>⛔ OFF</button>
      </div>
      {adminShiftType === 'work' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <select value={adminShiftStart} onChange={e => setAdminShiftStart(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px' }}>{timeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <span>〜</span>
          <select value={adminShiftEnd} onChange={e => setAdminShiftEnd(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px' }}>{timeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select>
        </div>
      )}
      <button onClick={handleAdminShiftSave} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #9333ea)', color: 'white', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>保存</button>
      {(allShifts[selectedTraineeForShift?.id] || {})[formatDateKey(adminSelectedDate)] && (<button onClick={handleAdminShiftDelete} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #dc2626', background: 'white', color: '#dc2626', fontWeight: '600', cursor: 'pointer', marginBottom: '8px' }}>削除</button>)}
      <button onClick={() => setShowAdminShiftModal(false)} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}>キャンセル</button>
    </div>
  </div>
);

// 新人追加モーダル
const AddTraineeModal = ({ newTraineeName, setNewTraineeName, newTraineeEmail, setNewTraineeEmail, handleAddTrainee, setShowAddTraineeModal }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
    <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>➕ 新人を追加</h3>
      <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>名前</label><input type="text" value={newTraineeName} onChange={e => setNewTraineeName(e.target.value)} placeholder="例：山田 太郎" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <div style={{ marginBottom: '24px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>メールアドレス</label><input type="email" value={newTraineeEmail} onChange={e => setNewTraineeEmail(e.target.value)} placeholder="例：yamada@example.com" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <button onClick={handleAddTrainee} disabled={!newTraineeName.trim() || !newTraineeEmail.trim()} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: newTraineeName.trim() && newTraineeEmail.trim() ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : '#e2e8f0', color: newTraineeName.trim() && newTraineeEmail.trim() ? 'white' : '#94a3b8', fontWeight: '700', fontSize: '16px', cursor: newTraineeName.trim() && newTraineeEmail.trim() ? 'pointer' : 'not-allowed', marginBottom: '8px' }}>追加する</button>
      <button onClick={() => { setShowAddTraineeModal(false); setNewTraineeName(''); setNewTraineeEmail(''); }} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}>キャンセル</button>
    </div>
  </div>
);

// 削除確認モーダル
const DeleteModal = ({ deleteTarget, setShowDeleteModal, setDeleteTarget, handleDeleteTrainee }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
    <div style={{ background: 'white', borderRadius: '20px', padding: '24px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>👻</div>
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>フェードアウト確認</h3>
      <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px' }}><span style={{ fontWeight: '600', color: '#dc2626' }}>{deleteTarget.name}</span>さんを<br />フェードアウトしますか？</p>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => { setShowDeleteModal(false); setDeleteTarget(null); }} style={{ flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}>キャンセル</button>
        <button onClick={() => handleDeleteTrainee(deleteTarget)} style={{ flex: 1, padding: '14px', borderRadius: '10px', border: 'none', background: '#94a3b8', color: 'white', fontWeight: '600', cursor: 'pointer' }}>フェードアウト</button>
      </div>
    </div>
  </div>
);

// リセット確認モーダル（オーナー専用：自分以外全削除）
const ResetModal = ({ setShowResetModal, handleReset, currentUser }) => {
  const isOwner = currentUser?.role === 'owner';
  
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '24px', width: '90%', maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: '#1e293b' }}>
          {isOwner ? '全データリセット' : '権限がありません'}
        </h3>
        {isOwner ? (
          <>
            <p style={{ fontSize: '15px', color: '#dc2626', marginBottom: '16px', fontWeight: '600' }}>
              自分以外の全てのデータを削除します
            </p>
            <div style={{ background: '#fef2f2', borderRadius: '10px', padding: '12px', marginBottom: '24px', textAlign: 'left', fontSize: '13px', color: '#64748b' }}>
              <div>• 全ての管理者（自分以外）</div>
              <div>• 全ての新人</div>
              <div>• 全てのシフト・進捗データ</div>
              <div>• フェードアウトリスト</div>
            </div>
            <p style={{ fontSize: '13px', color: '#dc2626', marginBottom: '16px' }}>
              この操作は取り消せません！
            </p>
          </>
        ) : (
          <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '24px' }}>
            この操作はオーナーのみ実行できます
          </p>
        )}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setShowResetModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: '600', cursor: 'pointer' }}>
            {isOwner ? 'キャンセル' : '閉じる'}
          </button>
          {isOwner && (
            <button onClick={handleReset} style={{ flex: 1, padding: '14px', borderRadius: '10px', border: 'none', background: '#dc2626', color: 'white', fontWeight: '600', cursor: 'pointer' }}>
              全削除する
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 管理者追加モーダル
const AddAdminModal = ({ newAdminName, setNewAdminName, newAdminEmail, setNewAdminEmail, newAdminPassword, setNewAdminPassword, handleAddAdmin, setShowAddAdminModal }) => (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200 }}>
    <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: '24px', width: '100%', maxWidth: '500px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', color: '#1e293b' }}>👤 管理者を追加</h3>
      <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>名前</label><input type="text" value={newAdminName} onChange={e => setNewAdminName(e.target.value)} placeholder="例：鈴木 一郎" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <div style={{ marginBottom: '16px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>メールアドレス</label><input type="email" value={newAdminEmail} onChange={e => setNewAdminEmail(e.target.value)} placeholder="例：suzuki@example.com" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <div style={{ marginBottom: '24px' }}><label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>パスワード</label><input type="text" value={newAdminPassword} onChange={e => setNewAdminPassword(e.target.value)} placeholder="パスワードを設定" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} /></div>
      <button onClick={handleAddAdmin} disabled={!newAdminName.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: newAdminName.trim() && newAdminEmail.trim() && newAdminPassword.trim() ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : '#e2e8f0', color: newAdminName.trim() && newAdminEmail.trim() && newAdminPassword.trim() ? 'white' : '#94a3b8', fontWeight: '700', fontSize: '16px', cursor: newAdminName.trim() && newAdminEmail.trim() && newAdminPassword.trim() ? 'pointer' : 'not-allowed', marginBottom: '8px' }}>追加する</button>
      <button onClick={() => { setShowAddAdminModal(false); setNewAdminName(''); setNewAdminEmail(''); setNewAdminPassword(''); }} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer' }}>キャンセル</button>
    </div>
  </div>
);
