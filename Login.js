// 初回セットアップ画面コンポーネント
const SetupView = ({ onComplete }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSetup = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('すべての項目を入力してください');
      return;
    }
    if (password !== confirmPassword) {
      setError('パスワードが一致しません');
      return;
    }
    if (password.length < 4) {
      setError('パスワードは4文字以上にしてください');
      return;
    }
    
    const admin = {
      id: Date.now(),
      name: name,
      email: email,
      password: password,
      isAdmin: true
    };
    onComplete(admin);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f0f7ff 0%, #dbeafe 100%)', fontFamily: 'sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #7c3aed, #9333ea)', padding: '16px 20px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎓</div>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>新人研修システム</span>
        </div>
      </div>
      
      <div style={{ padding: '24px', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>👋</div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>ようこそ！</h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>最初に管理者アカウントを設定してください</p>
        </div>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>名前</label>
            <input type="text" value={name} onChange={e => { setName(e.target.value); setError(''); }} placeholder="例：山田 太郎" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>メールアドレス</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="例：admin@example.com" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>パスワード</label>
            <input type="password" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="4文字以上" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>パスワード（確認）</label>
            <input type="password" value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setError(''); }} placeholder="もう一度入力" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '10px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

          <button onClick={handleSetup} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #7c3aed, #9333ea)', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>設定を完了してログイン</button>
        </div>
      </div>
    </div>
  );
};

// ログイン画面コンポーネント
const LoginView = ({ trainees, admins, setCurrentUser, setView }) => {
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginName, setLoginName] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  
  // URLパラメータで管理者モードを判定
  const urlParams = new URLSearchParams(window.location.search);
  const isOwnerMode = urlParams.get('owner') === 'true';
  const isAdminMode = urlParams.get('admin') === 'true' || isOwnerMode;

  const handleLogin = () => {
    if (isAdminMode) {
      const admin = admins.find(a => a.email === loginEmail && a.name === loginName && a.password === loginPassword);
      if (admin) {
        // オーナーモードの場合、オーナーのみログイン可能
        if (isOwnerMode && admin.role !== 'owner') {
          setLoginError('オーナー権限がありません');
          return;
        }
        setCurrentUser(admin);
        setView('admin');
        setLoginError('');
      } else {
        setLoginError('ログイン情報が正しくありません');
      }
    } else {
      const trainee = trainees.find(t => t.email === loginEmail && t.name === loginName);
      if (trainee) {
        setCurrentUser(trainee);
        setView(trainee.status === 'expired' ? 'locked' : 'trainee');
        setLoginError('');
      } else {
        setLoginError('メールアドレスまたは名前が正しくありません');
      }
    }
  };

  // オーナーモードのヘッダー色
  const headerBg = isOwnerMode 
    ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
    : isAdminMode 
      ? 'linear-gradient(135deg, #7c3aed, #9333ea)' 
      : 'linear-gradient(135deg, #1e40af, #2563eb)';

  const headerIcon = isOwnerMode ? '👑' : isAdminMode ? '👤' : '🎓';
  const headerTitle = isOwnerMode ? 'オーナーログイン' : isAdminMode ? '管理者ログイン' : '新人研修システム';

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f0f7ff 0%, #dbeafe 100%)', fontFamily: 'sans-serif' }}>
      <div style={{ background: headerBg, padding: '16px 20px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>{headerIcon}</div>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>{headerTitle}</span>
        </div>
      </div>
      
      <div style={{ padding: '24px', maxWidth: '400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginBottom: '24px', color: '#1e293b' }}>{isAdminMode ? '管理者ログイン' : 'ログイン'}</h1>
        
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>メールアドレス</label>
            <input type="email" value={loginEmail} onChange={e => { setLoginEmail(e.target.value); setLoginError(''); }} placeholder="登録されたメールアドレス" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>名前</label>
            <input type="text" value={loginName} onChange={e => { setLoginName(e.target.value); setLoginError(''); }} placeholder="登録された名前" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>

          {isAdminMode && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>パスワード</label>
              <input type="password" value={loginPassword} onChange={e => { setLoginPassword(e.target.value); setLoginError(''); }} placeholder="パスワードを入力" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' }} />
            </div>
          )}

          {loginError && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '10px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{loginError}</div>}

          <button onClick={handleLogin} disabled={!loginEmail.trim() || !loginName.trim() || (isAdminMode && !loginPassword.trim())} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: (!loginEmail.trim() || !loginName.trim() || (isAdminMode && !loginPassword.trim())) ? '#e2e8f0' : isAdminMode ? 'linear-gradient(135deg, #7c3aed, #9333ea)' : 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: (!loginEmail.trim() || !loginName.trim() || (isAdminMode && !loginPassword.trim())) ? '#94a3b8' : 'white', fontWeight: '700', fontSize: '16px', cursor: (!loginEmail.trim() || !loginName.trim() || (isAdminMode && !loginPassword.trim())) ? 'not-allowed' : 'pointer' }}>ログイン</button>
        </div>
      </div>
    </div>
  );
};

// ロック画面コンポーネント
const LockedView = ({ setView, setCurrentUser }) => (
  <div style={{ minHeight: '100vh', background: '#fef2f2', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
    <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔒</div>
    <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626', marginBottom: '12px' }}>研修期限が切れました</h1>
    <p style={{ color: '#64748b', marginBottom: '24px' }}>管理者に直接ご連絡ください</p>
    <div style={{ background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '20px' }}>
      <p style={{ color: '#64748b', fontSize: '14px' }}>連絡先</p>
      <p style={{ fontWeight: '600', color: '#1e293b' }}>📧 admin@example.com</p>
    </div>
    <button onClick={() => { setView('login'); setCurrentUser(null); }} style={{ padding: '12px 24px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>ログアウト</button>
  </div>
);
