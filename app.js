// Firebaseヘルパー関数
const FirebaseDB = {
  // 管理者を取得
  async getAdmins() {
    const snapshot = await db.collection('admins').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  // 管理者を追加
  async addAdmin(admin) {
    const docRef = await db.collection('admins').add(admin);
    return { id: docRef.id, ...admin };
  },
  
  // 管理者を更新
  async updateAdmin(id, data) {
    await db.collection('admins').doc(id).update(data);
  },
  
  // 管理者を削除
  async deleteAdmin(id) {
    await db.collection('admins').doc(id).delete();
  },
  
  // 新人一覧を取得
  async getTrainees() {
    const snapshot = await db.collection('trainees').get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        firstLoginAt: data.firstLoginAt?.toDate() || null,
        debutAt: data.debutAt?.toDate() || null
      };
    });
  },
  
  // 新人を追加
  async addTrainee(trainee) {
    const docRef = await db.collection('trainees').add({
      ...trainee,
      firstLoginAt: firebase.firestore.Timestamp.fromDate(trainee.firstLoginAt)
    });
    return { id: docRef.id, ...trainee };
  },
  
  // 新人を更新
  async updateTrainee(id, data) {
    const updateData = { ...data };
    if (data.firstLoginAt) {
      updateData.firstLoginAt = firebase.firestore.Timestamp.fromDate(new Date(data.firstLoginAt));
    }
    if (data.debutAt) {
      updateData.debutAt = firebase.firestore.Timestamp.fromDate(new Date(data.debutAt));
    }
    await db.collection('trainees').doc(id).update(updateData);
  },
  
  // 新人を削除
  async deleteTrainee(id) {
    await db.collection('trainees').doc(id).delete();
  },
  
  // フェードアウトリストを取得
  async getFadeOutList() {
    const snapshot = await db.collection('fadeout').get();
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        firstLoginAt: data.firstLoginAt?.toDate() || null,
        fadeOutAt: data.fadeOutAt?.toDate() || null
      };
    });
  },
  
  // フェードアウトに追加
  async addToFadeOut(trainee) {
    await db.collection('fadeout').add({
      ...trainee,
      firstLoginAt: trainee.firstLoginAt ? firebase.firestore.Timestamp.fromDate(new Date(trainee.firstLoginAt)) : null,
      fadeOutAt: firebase.firestore.Timestamp.fromDate(new Date())
    });
  },
  
  // シフトを取得
  async getAllShifts() {
    const snapshot = await db.collection('shifts').get();
    const shifts = {};
    snapshot.docs.forEach(doc => {
      shifts[doc.id] = doc.data();
    });
    return shifts;
  },
  
  // シフトを保存
  async saveShifts(traineeId, shiftsData) {
    await db.collection('shifts').doc(traineeId).set(shiftsData);
  },
  
  // 進捗データを取得
  async getProgress() {
    const snapshot = await db.collection('progress').get();
    const progress = {};
    snapshot.docs.forEach(doc => {
      progress[doc.id] = doc.data().completedItems || [];
    });
    return progress;
  },
  
  // 進捗データを保存
  async saveProgress(traineeId, completedItems) {
    await db.collection('progress').doc(traineeId).set({ completedItems });
  }
};

// メインアプリケーション
const App = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [view, setView] = React.useState('login');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isFirstSetup, setIsFirstSetup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [lastActivity, setLastActivity] = React.useState(Date.now());

  // データ
  const [trainees, setTrainees] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [shifts, setShifts] = React.useState({});
  const [allShifts, setAllShifts] = React.useState({});
  const [curriculum, setCurriculum] = React.useState(trainingCurriculum);
  const [traineeProgress, setTraineeProgress] = React.useState({});
  const [fadeOutList, setFadeOutList] = React.useState([]);

  // 5分間（300000ms）操作がなければ自動ログアウト
  const TIMEOUT_DURATION = 5 * 60 * 1000;

  // ユーザー操作を検知してlastActivityを更新
  React.useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());
    
    window.addEventListener('click', updateActivity);
    window.addEventListener('keypress', updateActivity);
    window.addEventListener('scroll', updateActivity);
    window.addEventListener('touchstart', updateActivity);
    
    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keypress', updateActivity);
      window.removeEventListener('scroll', updateActivity);
      window.removeEventListener('touchstart', updateActivity);
    };
  }, []);

  // 定期的にタイムアウトをチェック
  React.useEffect(() => {
    const checkTimeout = setInterval(() => {
      if (currentUser && Date.now() - lastActivity > TIMEOUT_DURATION) {
        // 自動ログアウト
        setCurrentUser(null);
        setView('login');
        alert('5分間操作がなかったため、自動的にログアウトしました。');
      }
    }, 10000); // 10秒ごとにチェック
    
    return () => clearInterval(checkTimeout);
  }, [currentUser, lastActivity]);

  // URL判定
  const urlParams = new URLSearchParams(window.location.search);
  const isOwnerUrl = urlParams.get('owner') === 'true';
  const isAdminUrl = urlParams.get('admin') === 'true';

  // 初回データ読み込み
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [adminsData, traineesData, fadeOutData, shiftsData, progressData] = await Promise.all([
          FirebaseDB.getAdmins(),
          FirebaseDB.getTrainees(),
          FirebaseDB.getFadeOutList(),
          FirebaseDB.getAllShifts(),
          FirebaseDB.getProgress()
        ]);
        
        setAdmins(adminsData);
        setTrainees(traineesData);
        setFadeOutList(fadeOutData);
        setAllShifts(shiftsData);
        setTraineeProgress(progressData);
        
        // 初回セットアップ判定
        if (adminsData.length === 0 && isOwnerUrl) {
          setIsFirstSetup(true);
        }
      } catch (error) {
        console.error('データ読み込みエラー:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 初回セットアップ完了（オーナーとして登録）
  const handleFirstSetupComplete = async (admin) => {
    try {
      // role: 'owner' を追加してオーナーとして登録
      const ownerAdmin = { ...admin, role: 'owner' };
      const newAdmin = await FirebaseDB.addAdmin(ownerAdmin);
      setAdmins([newAdmin]);
      setCurrentUser(newAdmin);
      setIsFirstSetup(false);
      setView('admin');
    } catch (error) {
      console.error('オーナー登録エラー:', error);
    }
  };

  // モーダル用state
  const [showAddTraineeModal, setShowAddTraineeModal] = React.useState(false);
  const [newTraineeName, setNewTraineeName] = React.useState('');
  const [newTraineeEmail, setNewTraineeEmail] = React.useState('');
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [showResetModal, setShowResetModal] = React.useState(false);
  const [showAddAdminModal, setShowAddAdminModal] = React.useState(false);
  const [newAdminName, setNewAdminName] = React.useState('');
  const [newAdminEmail, setNewAdminEmail] = React.useState('');
  const [newAdminPassword, setNewAdminPassword] = React.useState('');

  // タイマー
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 新人ログイン時にその人の進捗データをcurriculumに反映
  React.useEffect(() => {
    if (currentUser && !currentUser.isAdmin && view === 'trainee') {
      const userProgress = traineeProgress[currentUser.id] || [];
      setCurriculum(trainingCurriculum.map(item => ({
        ...item,
        done: userProgress.includes(item.id)
      })));
    }
  }, [currentUser, view, traineeProgress]);

  // ステータス自動更新（期限切れチェック）
  React.useEffect(() => {
    trainees.forEach(async (trainee) => {
      if (trainee.status === 'training') {
        const time = getTimeRemaining(trainee.firstLoginAt, currentTime);
        if (time.expired && trainee.status !== 'expired') {
          await FirebaseDB.updateTrainee(trainee.id, { status: 'expired' });
          setTrainees(prev => prev.map(t => t.id === trainee.id ? { ...t, status: 'expired' } : t));
        }
      }
    });
  }, [currentTime, trainees]);

  // ハンドラー
  const handleReset = () => {
    // リセットはFirebaseでは慎重に（今は何もしない）
    setShowResetModal(false);
  };

  // 削除処理（フェードアウトリストに移動）
  const handleDeleteTrainee = async (trainee) => {
    try {
      await FirebaseDB.addToFadeOut(trainee);
      await FirebaseDB.deleteTrainee(trainee.id);
      setFadeOutList([...fadeOutList, { ...trainee, fadeOutAt: new Date() }]);
      setTrainees(trainees.filter(t => t.id !== trainee.id));
      setShowDeleteModal(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error('削除エラー:', error);
    }
  };

  const handleAddTrainee = async () => {
    if (!newTraineeName.trim() || !newTraineeEmail.trim()) return;
    try {
      const newTrainee = {
        name: newTraineeName,
        email: newTraineeEmail,
        firstLoginAt: new Date(),
        status: 'training',
        workStatus: 'idle'
      };
      const added = await FirebaseDB.addTrainee(newTrainee);
      setTrainees([...trainees, added]);
      setNewTraineeName('');
      setNewTraineeEmail('');
      setShowAddTraineeModal(false);
    } catch (error) {
      console.error('新人追加エラー:', error);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminName.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()) return;
    try {
      const newAdmin = {
        name: newAdminName,
        email: newAdminEmail,
        password: newAdminPassword,
        isAdmin: true,
        role: 'admin' // 通常追加は管理者として
      };
      const added = await FirebaseDB.addAdmin(newAdmin);
      setAdmins([...admins, added]);
      setNewAdminName('');
      setNewAdminEmail('');
      setNewAdminPassword('');
      setShowAddAdminModal(false);
    } catch (error) {
      console.error('管理者追加エラー:', error);
    }
  };

  // 管理者をオーナーに昇格
  const handlePromoteToOwner = async (adminId) => {
    try {
      await FirebaseDB.updateAdmin(adminId, { role: 'owner' });
      setAdmins(admins.map(a => a.id === adminId ? { ...a, role: 'owner' } : a));
    } catch (error) {
      console.error('オーナー昇格エラー:', error);
    }
  };

  // 管理者を削除
  const handleDeleteAdmin = async (adminId) => {
    try {
      await FirebaseDB.deleteAdmin(adminId);
      setAdmins(admins.filter(a => a.id !== adminId));
    } catch (error) {
      console.error('管理者削除エラー:', error);
    }
  };

  // 新人のステータス更新（デビューなど）
  const handleUpdateTrainees = async (newTrainees) => {
    // 変更があった新人を検出して更新
    for (const newT of newTrainees) {
      const oldT = trainees.find(t => t.id === newT.id);
      if (oldT && (oldT.status !== newT.status || oldT.debutAt !== newT.debutAt)) {
        await FirebaseDB.updateTrainee(newT.id, {
          status: newT.status,
          ...(newT.debutAt && { debutAt: newT.debutAt })
        });
      }
    }
    setTrainees(newTrainees);
  };

  // シフト更新
  const handleUpdateAllShifts = async (newAllShifts) => {
    // 変更があったシフトを保存
    for (const traineeId of Object.keys(newAllShifts)) {
      if (JSON.stringify(allShifts[traineeId]) !== JSON.stringify(newAllShifts[traineeId])) {
        await FirebaseDB.saveShifts(traineeId, newAllShifts[traineeId]);
      }
    }
    setAllShifts(newAllShifts);
  };

  // カリキュラム進捗更新（Firebase保存付き）
  const handleUpdateCurriculum = async (newCurriculum) => {
    setCurriculum(newCurriculum);
    
    // currentUserがいる場合、完了したアイテムのIDを保存
    if (currentUser && !currentUser.isAdmin) {
      const completedItems = newCurriculum.filter(c => c.done).map(c => c.id);
      await FirebaseDB.saveProgress(currentUser.id, completedItems);
      setTraineeProgress({ ...traineeProgress, [currentUser.id]: completedItems });
    }
  };

  // ローディング中
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #f0f7ff 0%, #dbeafe 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎓</div>
          <div style={{ color: '#64748b' }}>読み込み中...</div>
        </div>
      </div>
    );
  }

  // ビュー切り替え
  if (isFirstSetup) {
    return <SetupView onComplete={handleFirstSetupComplete} />;
  }

  if (view === 'login') {
    return <LoginView trainees={trainees} admins={admins} setCurrentUser={setCurrentUser} setView={setView} />;
  }

  if (view === 'locked') {
    return <LockedView setView={setView} setCurrentUser={setCurrentUser} />;
  }

  if (view === 'admin') {
    return (
      <>
        <AdminView
          currentUser={currentUser}
          currentTime={currentTime}
          setView={setView}
          setCurrentUser={setCurrentUser}
          trainees={trainees}
          setTrainees={handleUpdateTrainees}
          admins={admins}
          setAdmins={setAdmins}
          traineeProgress={traineeProgress}
          allShifts={allShifts}
          setAllShifts={handleUpdateAllShifts}
          fadeOutList={fadeOutList}
          showAddTraineeModal={showAddTraineeModal}
          setShowAddTraineeModal={setShowAddTraineeModal}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          deleteTarget={deleteTarget}
          setDeleteTarget={setDeleteTarget}
          showResetModal={showResetModal}
          setShowResetModal={setShowResetModal}
          handleReset={handleReset}
          showAddAdminModal={showAddAdminModal}
          setShowAddAdminModal={setShowAddAdminModal}
          handlePromoteToOwner={handlePromoteToOwner}
          handleDeleteAdmin={handleDeleteAdmin}
        />
        {showAddTraineeModal && <AddTraineeModal newTraineeName={newTraineeName} setNewTraineeName={setNewTraineeName} newTraineeEmail={newTraineeEmail} setNewTraineeEmail={setNewTraineeEmail} handleAddTrainee={handleAddTrainee} setShowAddTraineeModal={setShowAddTraineeModal} />}
        {showDeleteModal && deleteTarget && <DeleteModal deleteTarget={deleteTarget} setShowDeleteModal={setShowDeleteModal} setDeleteTarget={setDeleteTarget} handleDeleteTrainee={handleDeleteTrainee} />}
        {showResetModal && <ResetModal setShowResetModal={setShowResetModal} handleReset={handleReset} />}
        {showAddAdminModal && <AddAdminModal newAdminName={newAdminName} setNewAdminName={setNewAdminName} newAdminEmail={newAdminEmail} setNewAdminEmail={setNewAdminEmail} newAdminPassword={newAdminPassword} setNewAdminPassword={setNewAdminPassword} handleAddAdmin={handleAddAdmin} setShowAddAdminModal={setShowAddAdminModal} />}
      </>
    );
  }

  if (view === 'trainee' && currentUser) {
    return <TraineeView currentUser={currentUser} currentTime={currentTime} setView={setView} setCurrentUser={setCurrentUser} curriculum={curriculum} setCurriculum={handleUpdateCurriculum} shifts={shifts} setShifts={setShifts} />;
  }

  return <div>Loading...</div>;
};

// レンダリング
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
