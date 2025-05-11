// firebaseNotesService.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  startAt,
  endAt
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBVZ79ZeZLhzUBP1vOb7ZLwaFcqnnljeTc', 
  authDomain: 'lab2-38458.firebaseapp.com',
  projectId: 'lab2-38458',
  storageBucket: 'lab2-38458.appspot.com',
  messagingSenderId: '134907397406',
  appId: '1:134907397406:web:be39a6a2c15737de28f50f',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);


export const loadNotes = async () => {
  try {
    const q = query(collection(db, 'notes'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Lỗi khi tải ghi chú:', error);
    return [];
  }
};

// ➕ Thêm ghi chú mới
export const addNote = async (title, content) => {
  try {
    await addDoc(collection(db, 'notes'), {
      title,
      content,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    console.log('🟢 Ghi chú đã được thêm.');
  } catch (error) {
    console.error('🔴 Lỗi khi thêm ghi chú:', error);
  }
};

// ✏️ Cập nhật ghi chú
export const updateNote = async (id, updatedNote) => {
  try {
    const noteRef = doc(db, 'notes', id);
    await updateDoc(noteRef, {
      ...updatedNote,
      updated_at: serverTimestamp(),
    });
  } catch (error) {
    console.error('Lỗi khi cập nhật ghi chú:', error);
    throw error;
  }
};

// ❌ Xóa ghi chú
export const deleteNote = async (id) => {
  try {
    await deleteDoc(doc(db, 'notes', id));
  } catch (error) {
    console.error('Lỗi khi xóa ghi chú:', error);
    throw error;
  }
};

// 🔍 Tìm kiếm ghi chú theo tiêu đề
export const searchNotes = async (keyword) => {
  try {
    const q = query(
      collection(db, 'notes'),
      orderBy('title'),
      startAt(keyword),
      endAt(keyword + '\uf8ff')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Lỗi khi tìm kiếm ghi chú:', error);
    return [];
  }
};

// 🚫 Firestore không cần tạo bảng
export const createTables = async () => {
  return true;
};
