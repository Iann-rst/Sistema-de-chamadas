import firebase from 'firebase/app';
import 'firebase/auth';//autenticação
import 'firebase/firestore';//banco de dados
import 'firebase/storage';//storage do firebase (salvar imagens)

/**
 * Configuração e inicialização do firebase
 */

let firebaseConfig = {
  apiKey: "AIzaSyB4GwmIKfPjNGPDHSAuNJixIn8_xHc14Rg",
  authDomain: "sistema-a7e1c.firebaseapp.com",
  projectId: "sistema-a7e1c",
  storageBucket: "sistema-a7e1c.appspot.com",
  messagingSenderId: "667587973043",
  appId: "1:667587973043:web:614deba0d1f3a3867ec5c6",
  measurementId: "G-D08V49DB4X"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;