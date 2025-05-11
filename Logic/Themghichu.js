import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addNote } from '../Data/firebaseNotesService';

export default function Themghichu({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ tiêu đề và nội dung.');
      return;
    }

    try {
      await addNote(title.trim(), content.trim());
      Alert.alert('Thành công', 'Ghi chú đã được thêm.');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi thêm ghi chú:', error);
      Alert.alert('Lỗi', 'Không thể thêm ghi chú.');
    }//placeholder="Email" placeholderTextColor="#aaa"
  };

  return (//
    <View style={styles.container}>
      <Text style={styles.header}>THÊM GHI CHÚ MỚI</Text>
      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Nội dung</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>💾 Lưu ghi chú</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: 'bold', marginBottom: 1, fontSize: 16 ,color: '#333' , textAlign: 'left'},
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    marginBottom: 15, padding: 10, backgroundColor: '#fff',
    color: '#333', fontSize: 16,
  },
  header: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#FF0000',
  },
  button: {
    backgroundColor: '#4CAF50', padding: 15, borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
