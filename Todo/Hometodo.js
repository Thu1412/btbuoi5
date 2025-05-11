import React, { useState, useEffect } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Appbar, TextInput, Button, Text } from 'react-native-paper';
import { addTodo } from '../Todo/addTodo';
import { db } from '../Data/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import Todo from './Todo'; // bạn cần tạo component Todo.js để hiển thị từng mục

function Hometodo() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = collection(db, 'todos');

  const handleAdd = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data();
        list.push({ id: doc.id, title, complete });
      });
      setTodos(list);
      if (loading) setLoading(false);
    });

    return () => unsubscribe(); // dọn dẹp listener
  }, []);

  if (loading) return null;

  return (
    <View style={{ flex: 1 }}>
      <Appbar>
        <Appbar.Content title={'TODOS List'} />
      </Appbar>

      <FlatList
        style={{ flex: 1 }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />

      <TextInput
        label={'New Todo'}
        value={newTodo}
        onChangeText={text => setNewTodo(text)}
        style={{ margin: 10 }}
      />

      <Button mode="contained" onPress={handleAdd} style={{ margin: 10 }}>
        Add TODO
      </Button>
    </View>
  );
}

export default Hometodo;
