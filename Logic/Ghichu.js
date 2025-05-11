import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

// Firebase cấu hình của bạn
const firebaseConfig = {
  apiKey: '1:134907397406:android:cd33bef70508010928f50f',
  authDomain: 'lab2-38458.firebaseapp.com',
  projectId: 'lab2-38458',
  storageBucket: 'lab2-38458.firebasestorage.app',
  messagingSenderId: '134907397406',
  appId: '1:134907397406:web:be39a6a2c15737de28f50f',
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Ghichu({ route, navigation }) {
  const { note } = route.params || {};
  const [isNoteValid, setIsNoteValid] = useState(true);

  useEffect(() => {
    if (!note || !note.id) {
      setIsNoteValid(false);
    }
  }, [note]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'notes', note.id));
      Alert.alert('✅ Đã xóa', 'Ghi chú đã bị xóa.');
      navigation.navigate('Trang chủ');
    } catch (error) {
      console.error('❌ Lỗi xóa:', error);
      Alert.alert('Lỗi', 'Không thể xóa ghi chú.');
    }
  };

  const handleEdit = () => {
    navigation.navigate('Capnhatghichu', { note });
  };

  if (!isNoteValid) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ghi chú không hợp lệ hoặc không tồn tại.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <Text style={styles.date}>🕒 Ngày tạo: {note.created_at}</Text>
      <Text style={styles.date}>✏️ Cập nhật: {note.updated_at}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>✏️ Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDelete}>
          <Text style={styles.buttonText}>❌ Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  content: { fontSize: 16, marginVertical: 10 },
  date: { fontSize: 12, color: '#555' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8, width: '48%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 20 },
});
