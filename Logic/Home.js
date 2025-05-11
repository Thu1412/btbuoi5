import React, { useState, useCallback, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import {
  loadNotes, searchNotes, deleteNote, createTables,
} from '../Data/firebaseNotesService'; // Đường dẫn tới dịch vụ Firebase
import { useFocusEffect } from '@react-navigation/native';

export default function Home({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Hàm để tải ghi chú
  const fetchNotes = useCallback(async () => {
    const data = await loadNotes();
    setNotes(Array.isArray(data) ? data : []);
  }, []);

  // Mỗi lần màn hình được focus, sẽ khởi tạo bảng và tải lại ghi chú
  useFocusEffect(
    useCallback(() => {
      const initialize = async () => {
        await createTables();
        await fetchNotes();
      };
      initialize();
    }, [fetchNotes])
  );

  // Tìm kiếm ghi chú
  const handleSearch = async () => {
    if (searchKeyword.trim()) {
      const data = await searchNotes(searchKeyword.trim());
      if (data.length === 0) {
        Alert.alert('Không có kết quả', 'Không tìm thấy ghi chú nào khớp với từ khóa.');
      }
      setNotes(data);
    } else {
      fetchNotes();
    }
  };

  // Xử lý xóa ghi chú
  const handleDelete = (id) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa ghi chú này không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteNote(id);
              await fetchNotes();
              Alert.alert('Thành công', 'Ghi chú đã được xóa.');
            } catch (error) {
              console.error('Lỗi khi xóa ghi chú:', error);
              Alert.alert('Lỗi', 'Không thể xóa ghi chú.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Định dạng ngày tháng
  const formatDate = (timestamp) => {
    const date = timestamp ? timestamp.toDate() : new Date();  // Chuyển đổi Firestore timestamp thành Date object
    return date.toLocaleString();
  };

  // Render từng item trong danh sách ghi chú
  const renderItem = ({ item }) => (
    <View style={styles.note}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.dateText}>Ngày tạo: {formatDate(item.created_at)}</Text>
      <Text style={styles.dateText}>Ngày cập nhật: {formatDate(item.updated_at)}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('Capnhatghichu', { note: item })}
        >
          <Text style={styles.buttonText}>✏️ Sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>❌ Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DANH SÁCH GHI CHÚ</Text>

      <Text style={styles.header1}>Tìm kiếm</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm theo tiêu đề"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          !searchKeyword ? (
            <Text style={styles.noNotesText}>Không có ghi chú nào trong danh sách.</Text>
          ) : null
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Thêm ghi chú')}
      >
        <Text style={styles.addButtonText}>➕thêm ghi chú</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16  },
  header: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#FF0000',
  },
  header1: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#CC33CC' },
  searchInput: {
    height: 40, borderColor: '#ccc', borderWidth: 1, paddingLeft: 10,
    marginBottom: 20, borderRadius: 5, backgroundColor: '#fff', color: '#333',
  },
  note: {
    backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 5 ,marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#33CC00' },
  content: { fontSize: 16, color: '#333' },
  dateText: { fontSize: 14, color: '#888', marginTop: 5 },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,
  },
  editButton: {
    backgroundColor: '#2196F3', padding: 10, borderRadius: 5, flex: 1, marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6347', padding: 10, borderRadius: 5, flex: 1, marginLeft: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  noNotesText: {
    textAlign: 'center', fontSize: 16, color: '#888', marginTop: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
