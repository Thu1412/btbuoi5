import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Data/firebaseConfig';

export async function addTodo(title) {
  try {
    await addDoc(collection(db, 'todos'), {
      title,
      complete: false,
      createdAt: serverTimestamp(),
    });
    console.log('Todo added!');
  } catch (error) {
    console.error('Error adding todo: ', error);
  }
}
