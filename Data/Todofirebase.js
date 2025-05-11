import React from 'react';
import { List } from 'react-native-paper';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../Data/firebaseConfig'; // Adjust the import path as necessary

function Todofirebase({ id, title, complete }) {
  const toggleComplete = async () => {
    await updateDoc(doc(db, 'todos', id), {
      complete: !complete
    });
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

export default Todofirebase;
