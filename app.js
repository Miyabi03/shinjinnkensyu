// Firebaseãƒ˜ãƒ«ãƒ‘ãƒ¼é–¢æ•°
const FirebaseDB = {
  // ç®¡ç†è€…ã‚’å–å¾—
  async getAdmins() {
    const snapshot = await db.collection('admins').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  
  // ç®¡ç†è€…ã‚’è¿½åŠ 
  async addAdmin(admin) {
    const docRef = await db.collection('admins').add(admin);
    return { id: docRef.id, ...admin };
  },
  
  // ç®¡ç†è€…ã‚’æ›´æ–°
  async updateAdmin(id, data) {
    await db.collection('admins').doc(id).update(data);
  },
  
  // ç®¡ç†è€…ã‚’å‰Šé™¤
  async deleteAdmin(id) {
    await db.collection('admins').doc(id).delete();
  },
  
  // æ–°äººä¸€è¦§ã‚’å–å¾—
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
  
  // æ–°äººã‚’è¿½åŠ 
  async addTrainee(trainee) {
    const docRef = await db.collection('trainees').add({
      ...trainee,
      firstLoginAt: firebase.firestore.Timestamp.fromDate(trainee.firstLoginAt)
    });
    return { id: docRef.id, ...trainee };
  },
  
  // æ–°äººã‚’æ›´æ–°
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
  
  // æ–°äººã‚’å‰Šé™¤
  async deleteTrainee(id) {
    await db.collection('trainees').doc(id).delete();
  },
  
  // ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆãƒªã‚¹ãƒˆã‚’å–å¾—
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
  
  // ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆã«è¿½åŠ 
  async addToFadeOut(trainee) {
    await db.collection('fadeout').add({
      ...trainee,
      firstLoginAt: trainee.firstLoginAt ? firebase.firestore.Timestamp.fromDate(new Date(trainee.firstLoginAt)) : null,
      fadeOutAt: firebase.firestore.Timestamp.fromDate(new Date())
    });
  },
  
  // ã‚·ãƒ•ãƒˆã‚’å–å¾—
  async getAllShifts() {
    const snapshot = await db.collection('shifts').get();
    const shifts = {};
    snapshot.docs.forEach(doc => {
      shifts[doc.id] = doc.data();
    });
    return shifts;
  },
  
  // ã‚·ãƒ•ãƒˆã‚’ä¿å­˜
  async saveShifts(traineeId, shiftsData) {
    await db.collection('shifts').doc(traineeId).set(shiftsData);
  },
  
  // é€²æ—ãƒ‡ãƒ¼ã‚¿ã‚’å–å¾—
  async getProgress() {
    const snapshot = await db.collection('progress').get();
    const progress = {};
    snapshot.docs.forEach(doc => {
      progress[doc.id] = doc.data().completedItems || [];
    });
    return progress;
  },
  
  // é€²æ—ãƒ‡ãƒ¼ã‚¿ã‚’ä¿å­˜
  async saveProgress(traineeId, completedItems) {
    await db.collection('progress').doc(traineeId).set({ completedItems });
  },

  // カリキュラムを取得
  async getCurriculum() {
    const snapshot = await db.collection('curriculum').orderBy('order').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // カリキュラム項目を追加
  async addCurriculumItem(item) {
    const docRef = await db.collection('curriculum').add(item);
    return { id: docRef.id, ...item };
  },

  // カリキュラム項目を更新
  async updateCurriculumItem(id, data) {
    await db.collection('curriculum').doc(id).update(data);
  },

  // カリキュラム項目を削除
  async deleteCurriculumItem(id) {
    await db.collection('curriculum').doc(id).delete();
  },

  // カリキュラム全体を保存（並び替え時）
  async saveCurriculumOrder(items) {
    const batch = db.batch();
    items.forEach((item, index) => {
      const ref = db.collection('curriculum').doc(item.id);
      batch.update(ref, { order: index });
    });
    await batch.commit();
  }
};

// ãƒ¡ã‚¤ãƒ³ã‚¢ãƒ—ãƒªã‚±ãƒ¼ã‚·ãƒ§ãƒ³
const App = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [view, setView] = React.useState('login');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isFirstSetup, setIsFirstSetup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [lastActivity, setLastActivity] = React.useState(Date.now());

  // ãƒ‡ãƒ¼ã‚¿
  const [trainees, setTrainees] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [shifts, setShifts] = React.useState({});
  const [allShifts, setAllShifts] = React.useState({});
  const [curriculum, setCurriculum] = React.useState([]);
  const [baseCurriculum, setBaseCurriculum] = React.useState([]); // ã‚¹ãƒ—ãƒ¬ãƒƒãƒ‰ã‚·ãƒ¼ãƒˆã‹ã‚‰å–å¾—ã—ãŸãƒ™ãƒ¼ã‚¹ãƒ‡ãƒ¼ã‚¿
  const [traineeProgress, setTraineeProgress] = React.useState({});
  const [fadeOutList, setFadeOutList] = React.useState([]);

  // 5åˆ†é–“ï¼ˆ300000msï¼‰æ“ä½œãŒãªã‘ã‚Œã°è‡ªå‹•ãƒ­ã‚°ã‚¢ã‚¦ãƒˆ
  const TIMEOUT_DURATION = 5 * 60 * 1000;

  // ãƒ¦ãƒ¼ã‚¶ãƒ¼æ“ä½œã‚’æ¤œçŸ¥ã—ã¦lastActivityã‚’æ›´æ–°
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

  // å®šæœŸçš„ã«ã‚¿ã‚¤ãƒ ã‚¢ã‚¦ãƒˆã‚’ãƒã‚§ãƒƒã‚¯
  React.useEffect(() => {
    const checkTimeout = setInterval(() => {
      if (currentUser && Date.now() - lastActivity > TIMEOUT_DURATION) {
        // è‡ªå‹•ãƒ­ã‚°ã‚¢ã‚¦ãƒˆ
        setCurrentUser(null);
        setView('login');
        alert('5åˆ†é–“æ“ä½œãŒãªã‹ã£ãŸãŸã‚ã€è‡ªå‹•çš„ã«ãƒ­ã‚°ã‚¢ã‚¦ãƒˆã—ã¾ã—ãŸã€‚');
      }
    }, 10000); // 10ç§’ã”ã¨ã«ãƒã‚§ãƒƒã‚¯
    
    return () => clearInterval(checkTimeout);
  }, [currentUser, lastActivity]);

  // URLåˆ¤å®š
  const urlParams = new URLSearchParams(window.location.search);
  const isOwnerUrl = urlParams.get('owner') === 'true';
  const isAdminUrl = urlParams.get('admin') === 'true';

  // åˆå›žãƒ‡ãƒ¼ã‚¿èª­ã¿è¾¼ã¿
  React.useEffect(() => {
    const loadData = async () => {
      try {
        // ã‚¹ãƒ—ãƒ¬ãƒƒãƒ‰ã‚·ãƒ¼ãƒˆã‹ã‚‰ç ”ä¿®ãƒ‡ãƒ¼ã‚¿ã‚’å–å¾—
        const sheetCurriculum = await fetchCurriculumFromSheet();
        const curriculumData = sheetCurriculum || trainingCurriculum; // ãƒ•ã‚©ãƒ¼ãƒ«ãƒãƒƒã‚¯
        setBaseCurriculum(curriculumData);
        setCurriculum(curriculumData);
        
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
        
        // åˆå›žã‚»ãƒƒãƒˆã‚¢ãƒƒãƒ—åˆ¤å®š
        if (adminsData.length === 0 && isOwnerUrl) {
          setIsFirstSetup(true);
        }
      } catch (error) {
        console.error('ãƒ‡ãƒ¼ã‚¿èª­ã¿è¾¼ã¿ã‚¨ãƒ©ãƒ¼:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // åˆå›žã‚»ãƒƒãƒˆã‚¢ãƒƒãƒ—å®Œäº†ï¼ˆã‚ªãƒ¼ãƒŠãƒ¼ã¨ã—ã¦ç™»éŒ²ï¼‰
  const handleFirstSetupComplete = async (admin) => {
    try {
      // role: 'owner' ã‚’è¿½åŠ ã—ã¦ã‚ªãƒ¼ãƒŠãƒ¼ã¨ã—ã¦ç™»éŒ²
      const ownerAdmin = { ...admin, role: 'owner' };
      const newAdmin = await FirebaseDB.addAdmin(ownerAdmin);
      setAdmins([newAdmin]);
      setCurrentUser(newAdmin);
      setIsFirstSetup(false);
      setView('admin');
    } catch (error) {
      console.error('ã‚ªãƒ¼ãƒŠãƒ¼ç™»éŒ²ã‚¨ãƒ©ãƒ¼:', error);
    }
  };

  // ãƒ¢ãƒ¼ãƒ€ãƒ«ç”¨state
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

  // ã‚¿ã‚¤ãƒžãƒ¼
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // æ–°äººãƒ­ã‚°ã‚¤ãƒ³æ™‚ã«ãã®äººã®é€²æ—ãƒ‡ãƒ¼ã‚¿ã‚’curriculumã«åæ˜ 
  React.useEffect(() => {
    if (currentUser && !currentUser.isAdmin && view === 'trainee' && baseCurriculum.length > 0) {
      const userProgress = traineeProgress[currentUser.id] || [];
      setCurriculum(baseCurriculum.map(item => ({
        ...item,
        done: userProgress.includes(item.id)
      })));
      // ã‚·ãƒ•ãƒˆãƒ‡ãƒ¼ã‚¿ã‚‚èª­ã¿è¾¼ã¿
      const userShifts = allShifts[currentUser.id] || {};
      setShifts(userShifts);
    }
  }, [currentUser, view, traineeProgress, allShifts, baseCurriculum]);

  // ã‚¹ãƒ†ãƒ¼ã‚¿ã‚¹è‡ªå‹•æ›´æ–°ï¼ˆæœŸé™åˆ‡ã‚Œãƒã‚§ãƒƒã‚¯ï¼‰
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

  // ãƒãƒ³ãƒ‰ãƒ©ãƒ¼
  const handleReset = async () => {
    // ã‚ªãƒ¼ãƒŠãƒ¼å°‚ç”¨ï¼šè‡ªåˆ†ä»¥å¤–ã®å…¨ãƒ‡ãƒ¼ã‚¿ã‚’å‰Šé™¤
    if (currentUser?.role !== 'owner') {
      alert('ã“ã®æ“ä½œã¯ã‚ªãƒ¼ãƒŠãƒ¼ã®ã¿å®Ÿè¡Œã§ãã¾ã™');
      setShowResetModal(false);
      return;
    }
    
    try {
      // è‡ªåˆ†ä»¥å¤–ã®ç®¡ç†è€…ã‚’å‰Šé™¤
      for (const admin of admins) {
        if (admin.id !== currentUser.id) {
          await FirebaseDB.deleteAdmin(admin.id);
        }
      }
      
      // å…¨æ–°äººã‚’å‰Šé™¤
      for (const trainee of trainees) {
        await FirebaseDB.deleteTrainee(trainee.id);
      }
      
      // å…¨ã‚·ãƒ•ãƒˆã‚’å‰Šé™¤
      for (const traineeId of Object.keys(allShifts)) {
        await db.collection('shifts').doc(traineeId).delete();
      }
      
      // å…¨é€²æ—ã‚’å‰Šé™¤
      const progressSnapshot = await db.collection('progress').get();
      for (const doc of progressSnapshot.docs) {
        await db.collection('progress').doc(doc.id).delete();
      }
      
      // å…¨ãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆã‚’å‰Šé™¤
      const fadeoutSnapshot = await db.collection('fadeout').get();
      for (const doc of fadeoutSnapshot.docs) {
        await db.collection('fadeout').doc(doc.id).delete();
      }
      
      // ãƒ­ãƒ¼ã‚«ãƒ«çŠ¶æ…‹ã‚’æ›´æ–°
      setAdmins([currentUser]);
      setTrainees([]);
      setAllShifts({});
      setTraineeProgress({});
      setFadeOutList([]);
      
      alert('è‡ªåˆ†ä»¥å¤–ã®å…¨ãƒ‡ãƒ¼ã‚¿ã‚’å‰Šé™¤ã—ã¾ã—ãŸ');
    } catch (error) {
      console.error('ãƒªã‚»ãƒƒãƒˆã‚¨ãƒ©ãƒ¼:', error);
      alert('ãƒªã‚»ãƒƒãƒˆä¸­ã«ã‚¨ãƒ©ãƒ¼ãŒç™ºç”Ÿã—ã¾ã—ãŸ');
    }
    
    setShowResetModal(false);
  };

  // å‰Šé™¤å‡¦ç†ï¼ˆãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆãƒªã‚¹ãƒˆã«ç§»å‹•ï¼‰
  const handleDeleteTrainee = async (trainee) => {
    try {
      await FirebaseDB.addToFadeOut(trainee);
      await FirebaseDB.deleteTrainee(trainee.id);
      setFadeOutList([...fadeOutList, { ...trainee, fadeOutAt: new Date() }]);
      setTrainees(trainees.filter(t => t.id !== trainee.id));
      setShowDeleteModal(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error('å‰Šé™¤ã‚¨ãƒ©ãƒ¼:', error);
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
      console.error('æ–°äººè¿½åŠ ã‚¨ãƒ©ãƒ¼:', error);
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
        role: 'admin' // é€šå¸¸è¿½åŠ ã¯ç®¡ç†è€…ã¨ã—ã¦
      };
      const added = await FirebaseDB.addAdmin(newAdmin);
      setAdmins([...admins, added]);
      setNewAdminName('');
      setNewAdminEmail('');
      setNewAdminPassword('');
      setShowAddAdminModal(false);
    } catch (error) {
      console.error('ç®¡ç†è€…è¿½åŠ ã‚¨ãƒ©ãƒ¼:', error);
    }
  };

  // çµ±åˆãƒ¢ãƒ¼ãƒ€ãƒ«ã‹ã‚‰ã®æ–°äººè¿½åŠ 
  const handleAddTraineeFromModal = async ({ name, email }) => {
    if (!name.trim() || !email.trim()) return;
    try {
      const newTrainee = {
        name: name,
        email: email,
        firstLoginAt: new Date(),
        status: 'training',
        workStatus: 'idle'
      };
      const added = await FirebaseDB.addTrainee(newTrainee);
      setTrainees([...trainees, added]);
    } catch (error) {
      console.error('æ–°äººè¿½åŠ ã‚¨ãƒ©ãƒ¼:', error);
    }
  };

  // çµ±åˆãƒ¢ãƒ¼ãƒ€ãƒ«ã‹ã‚‰ã®ç®¡ç†è€…è¿½åŠ 
  const handleAddAdminFromModal = async ({ name, email, password }) => {
    if (!name.trim() || !email.trim() || !password.trim()) return;
    try {
      const newAdmin = {
        name: name,
        email: email,
        password: password,
        isAdmin: true,
        role: 'admin'
      };
      const added = await FirebaseDB.addAdmin(newAdmin);
      setAdmins([...admins, added]);
    } catch (error) {
      console.error('ç®¡ç†è€…è¿½åŠ ã‚¨ãƒ©ãƒ¼:', error);
    }
  };

  // ç®¡ç†è€…ã‚’ã‚ªãƒ¼ãƒŠãƒ¼ã«æ˜‡æ ¼
  const handlePromoteToOwner = async (adminId) => {
    try {
      await FirebaseDB.updateAdmin(adminId, { role: 'owner' });
      setAdmins(admins.map(a => a.id === adminId ? { ...a, role: 'owner' } : a));
    } catch (error) {
      console.error('ã‚ªãƒ¼ãƒŠãƒ¼æ˜‡æ ¼ã‚¨ãƒ©ãƒ¼:', error);
    }
  };

  // ç®¡ç†è€…ã‚’å‰Šé™¤
  const handleDeleteAdmin = async (adminId) => {
    try {
      await FirebaseDB.deleteAdmin(adminId);
      setAdmins(admins.filter(a => a.id !== adminId));
    } catch (error) {
      console.error('ç®¡ç†è€…å‰Šé™¤ã‚¨ãƒ©ãƒ¼:', error);
    }
  };

  // å®Œå…¨å‰Šé™¤ï¼ˆãƒ•ã‚§ãƒ¼ãƒ‰ã‚¢ã‚¦ãƒˆãƒªã‚¹ãƒˆã«æ®‹ã•ãªã„ï¼‰
  const handlePermanentDelete = async (member, memberType) => {
    try {
      if (memberType === 'trainee') {
        // æ–°äººã‚’å‰Šé™¤
        await FirebaseDB.deleteTrainee(member.id);
        setTrainees(trainees.filter(t => t.id !== member.id));
        
        // ã‚·ãƒ•ãƒˆãƒ‡ãƒ¼ã‚¿ã‚‚å‰Šé™¤
        if (allShifts[member.id]) {
          await db.collection('shifts').doc(member.id).delete();
          const newAllShifts = { ...allShifts };
          delete newAllShifts[member.id];
          setAllShifts(newAllShifts);
        }
        
        // é€²æ—ãƒ‡ãƒ¼ã‚¿ã‚‚å‰Šé™¤
        if (traineeProgress[member.id]) {
          await db.collection('progress').doc(member.id).delete();
          const newProgress = { ...traineeProgress };
          delete newProgress[member.id];
          setTraineeProgress(newProgress);
        }
      } else {
        // ç®¡ç†è€…ã‚’å‰Šé™¤
        await FirebaseDB.deleteAdmin(member.id);
        setAdmins(admins.filter(a => a.id !== member.id));
      }
      
      alert(`${member.name}ã•ã‚“ã‚’å®Œå…¨ã«å‰Šé™¤ã—ã¾ã—ãŸ`);
    } catch (error) {
      console.error('å®Œå…¨å‰Šé™¤ã‚¨ãƒ©ãƒ¼:', error);
      alert('å‰Šé™¤ä¸­ã«ã‚¨ãƒ©ãƒ¼ãŒç™ºç”Ÿã—ã¾ã—ãŸ');
    }
  };

  // カリキュラム項目を追加
  const handleAddCurriculumItem = async (item) => {
    try {
      const newItem = await FirebaseDB.addCurriculumItem({
        ...item,
        order: baseCurriculum.length
      });
      const newCurriculum = [...baseCurriculum, newItem];
      setBaseCurriculum(newCurriculum);
      setCurriculum(newCurriculum);
    } catch (error) {
      console.error('カリキュラム追加エラー:', error);
      alert('追加中にエラーが発生しました');
    }
  };

  // カリキュラム項目を更新
  const handleUpdateCurriculumItem = async (id, data) => {
    try {
      await FirebaseDB.updateCurriculumItem(id, data);
      const newCurriculum = baseCurriculum.map(item => 
        item.id === id ? { ...item, ...data } : item
      );
      setBaseCurriculum(newCurriculum);
      setCurriculum(newCurriculum);
    } catch (error) {
      console.error('カリキュラム更新エラー:', error);
      alert('更新中にエラーが発生しました');
    }
  };

  // カリキュラム項目を削除
  const handleDeleteCurriculumItem = async (id) => {
    try {
      await FirebaseDB.deleteCurriculumItem(id);
      const newCurriculum = baseCurriculum.filter(item => item.id !== id);
      if (newCurriculum.length > 0) {
        await FirebaseDB.saveCurriculumOrder(newCurriculum);
      }
      setBaseCurriculum(newCurriculum);
      setCurriculum(newCurriculum);
    } catch (error) {
      console.error('カリキュラム削除エラー:', error);
      alert('削除中にエラーが発生しました');
    }
  };

  // カリキュラムの並び替え
  const handleReorderCurriculum = async (newOrder) => {
    try {
      await FirebaseDB.saveCurriculumOrder(newOrder);
      setBaseCurriculum(newOrder);
      setCurriculum(newOrder);
    } catch (error) {
      console.error('カリキュラム並び替えエラー:', error);
      alert('並び替え中にエラーが発生しました');
    }
  };

  // æ–°äººã®ã‚¹ãƒ†ãƒ¼ã‚¿ã‚¹æ›´æ–°ï¼ˆãƒ‡ãƒ“ãƒ¥ãƒ¼ãªã©ï¼‰
  const handleUpdateTrainees = async (newTrainees) => {
    // å¤‰æ›´ãŒã‚ã£ãŸæ–°äººã‚’æ¤œå‡ºã—ã¦æ›´æ–°
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

  // ã‚·ãƒ•ãƒˆæ›´æ–°
  const handleUpdateAllShifts = async (newAllShifts) => {
    // å¤‰æ›´ãŒã‚ã£ãŸã‚·ãƒ•ãƒˆã‚’ä¿å­˜
    for (const traineeId of Object.keys(newAllShifts)) {
      if (JSON.stringify(allShifts[traineeId]) !== JSON.stringify(newAllShifts[traineeId])) {
        await FirebaseDB.saveShifts(traineeId, newAllShifts[traineeId]);
      }
    }
    setAllShifts(newAllShifts);
  };

  // æ–°äººè‡ªèº«ã®ã‚·ãƒ•ãƒˆæ›´æ–°ï¼ˆFirebaseä¿å­˜ä»˜ãï¼‰
  const handleUpdateShifts = async (newShifts) => {
    setShifts(newShifts);
    
    // currentUserãŒã„ã‚‹å ´åˆã€Firebaseã«ä¿å­˜ã—ã¦allShiftsã‚‚æ›´æ–°
    if (currentUser && !currentUser.isAdmin) {
      await FirebaseDB.saveShifts(currentUser.id, newShifts);
      setAllShifts({ ...allShifts, [currentUser.id]: newShifts });
    }
  };

  // ã‚«ãƒªã‚­ãƒ¥ãƒ©ãƒ é€²æ—æ›´æ–°ï¼ˆFirebaseä¿å­˜ä»˜ãï¼‰
  const handleUpdateCurriculum = async (newCurriculum) => {
    setCurriculum(newCurriculum);
    
    // currentUserãŒã„ã‚‹å ´åˆã€å®Œäº†ã—ãŸã‚¢ã‚¤ãƒ†ãƒ ã®IDã‚’ä¿å­˜
    if (currentUser && !currentUser.isAdmin) {
      const completedItems = newCurriculum.filter(c => c.done).map(c => c.id);
      await FirebaseDB.saveProgress(currentUser.id, completedItems);
      setTraineeProgress({ ...traineeProgress, [currentUser.id]: completedItems });
    }
  };

  // ãƒ­ãƒ¼ãƒ‡ã‚£ãƒ³ã‚°ä¸­
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #f0f7ff 0%, #dbeafe 100%)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>ðŸŽ“</div>
          <div style={{ color: '#64748b' }}>èª­ã¿è¾¼ã¿ä¸­...</div>
        </div>
      </div>
    );
  }

  // ãƒ“ãƒ¥ãƒ¼åˆ‡ã‚Šæ›¿ãˆ
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
          handleAddTraineeFromModal={handleAddTraineeFromModal}
          handleAddAdminFromModal={handleAddAdminFromModal}
          handlePermanentDelete={handlePermanentDelete}
          baseCurriculum={baseCurriculum}
          onAddCurriculumItem={handleAddCurriculumItem}
          onUpdateCurriculumItem={handleUpdateCurriculumItem}
          onDeleteCurriculumItem={handleDeleteCurriculumItem}
          onReorderCurriculum={handleReorderCurriculum}
        />
        {showAddTraineeModal && <AddTraineeModal newTraineeName={newTraineeName} setNewTraineeName={setNewTraineeName} newTraineeEmail={newTraineeEmail} setNewTraineeEmail={setNewTraineeEmail} handleAddTrainee={handleAddTrainee} setShowAddTraineeModal={setShowAddTraineeModal} />}
        {showDeleteModal && deleteTarget && <DeleteModal deleteTarget={deleteTarget} setShowDeleteModal={setShowDeleteModal} setDeleteTarget={setDeleteTarget} handleDeleteTrainee={handleDeleteTrainee} />}
        {showResetModal && <ResetModal setShowResetModal={setShowResetModal} handleReset={handleReset} currentUser={currentUser} />}
        {showAddAdminModal && <AddAdminModal newAdminName={newAdminName} setNewAdminName={setNewAdminName} newAdminEmail={newAdminEmail} setNewAdminEmail={setNewAdminEmail} newAdminPassword={newAdminPassword} setNewAdminPassword={setNewAdminPassword} handleAddAdmin={handleAddAdmin} setShowAddAdminModal={setShowAddAdminModal} />}
      </>
    );
  }

  if (view === 'trainee' && currentUser) {
    return <TraineeView currentUser={currentUser} currentTime={currentTime} setView={setView} setCurrentUser={setCurrentUser} curriculum={curriculum} setCurriculum={handleUpdateCurriculum} shifts={shifts} setShifts={handleUpdateShifts} />;
  }

  return <div>Loading...</div>;
};

// ãƒ¬ãƒ³ãƒ€ãƒªãƒ³ã‚°
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
