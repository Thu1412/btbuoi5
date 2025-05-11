import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBVZ79ZeZLhzUBP1vOb7ZLwaFcqnnljeTc', 
  authDomain: 'lab2-38458.firebaseapp.com',
  projectId: 'lab2-38458',
  storageBucket: 'lab2-38458.appspot.com',
  messagingSenderId: '134907397406',
  appId: '1:134907397406:web:be39a6a2c15737de28f50f',
};

// Khởi tạo ứng dụng Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Auth với persistence sử dụng AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default function DangNhap({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ email và mật khẩu.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Đăng nhập thành công', 'Chào mừng bạn đến với hệ thống.');
      navigation.replace('Home',{ email }); 
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      Alert.alert('Lỗi', 'Đăng nhập không thành công. Vui lòng kiểm tra lại email hoặc mật khẩu.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../images/logofirebase.jpg')}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.title}>Welcome back!</Text>

          <TextInput
            placeholder="📩 Enter email"
            style={styles.input}
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {email === '' && <Text style={styles.error}>Vui lòng nhập Email</Text>}

          <TextInput
            placeholder="🔒 Enter password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          {password === '' && <Text style={styles.error}>Vui lòng nhập mật khẩu</Text>}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Taotaikhoan')}
            style={styles.linkButton}
          >
            <Text style={styles.link}>Create a new account?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Laylaimatkhau')}
            style={styles.linkButton}
          >
            <Text style={styles.link}>Forgot Password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: { 
    flexGrow: 1,
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: 'white',
  },
  title: { 
    fontSize: 24, 
    textAlign: 'center', 
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  input: { 
    borderWidth: 1, 
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: '#333',
  },
  error: { 
    color: 'red', 
    marginBottom: 5,
  },
  button: { 
    backgroundColor: 'orange', 
    padding: 15, 
    borderRadius: 8, 
    marginTop: 10,
  },
  buttonText: { 
    textAlign: 'center', 
    color: 'white', 
    fontWeight: 'bold',
  },
  link: { 
    color: 'blue', 
    marginTop: 10, 
    textAlign: 'center',
  },
  linkButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  image: { 
    width: 150,  
    height: 150, 
    alignSelf: 'center',  
    marginBottom: 20,
  },
});
