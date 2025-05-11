import React from 'react';
import { List } from 'react-native-paper';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Data/firebaseConfig';

export default function Todo({ id, title, complete }) {
  const toggleComplete = async () => {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, { complete: !complete });
  };

  return (
    <List.Item
      title={title}
      onPress={toggleComplete}
      left={props => (
        <List.Icon {...props} icon={complete ? 'check' : 'cancel'} />
      )}
    />
  );
}
