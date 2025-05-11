import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { updateNote } from '../Data/firebaseNotesService';

export default function Capnhatghichu({ route, navigation }) {
  const { note } = route.params;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleUpdate = async () => {
    try {
      await updateNote(note.id, { title, content });
      Alert.alert('Thành công', 'Ghi chú đã được cập nhật.');
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi cập nhật ghi chú:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật ghi chú.');
    }////placeholder="Email" placeholderTextColor="#aaa"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CẬP NHẬT GHI CHÚ</Text>
      <Text style={styles.label}>Tiêu đề</Text>
      <TextInput
        style={styles.input}
        placeholder="Tiêu đề"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Nội dung</Text>
      <TextInput
        style={styles.input}
        placeholder="Nội dung"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 , backgroundColor: '#f5f5f5' },
  label: { fontWeight: 'bold', marginBottom: 5, fontSize: 16 ,color: '#333' },
  header: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#FF0000',
  },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, paddingLeft: 10, marginBottom: 20 , color: '#333', fontSize: 16, borderRadius: 5 },
  button: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
