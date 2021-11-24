/*Contexto de autenticação */

import { useState, createContext, useEffect } from 'react';
import firebase from '../services/firebaseConnection';

/*Criação do contexto */
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  //
  useEffect(() => {

    function loadStorage() {
      const storageUser = localStorage.getItem('SistemaUser');
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, [])

  //Função para cadastrar usuário no banco de dados
  async function signUp(email, senha, nome) {
    setLoadingAuth(true);
    //Cria usuário (email) e senha no firebase
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then(async (value) => {
        let uid = value.user.uid;
        console.log(uid);

        //Adiciono o usuário ao banco de dados firestore na tabela (users)
        await firebase.firestore().collection('users')
          .doc(uid).set({
            nome: nome,
            avatarUrl: null,
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: nome,
              email: value.user.email,
              avatarUrl: null
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
          })
      })
      .catch((error) => {
        console.log(error);
        setLoadingAuth(false);
      })
  }

  //Salvar os dados do usuário no local storage
  function storageUser(data) {
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }

  //Função para fazer o login do usuário
  async function signIn(email, senha) {
    setLoadingAuth(true);

    //Loga o usuário no firebase
    await firebase.auth().signInWithEmailAndPassword(email, senha)
      .then(async (value) => {
        let uid = value.user.uid; //pega o uid do usuário que está logado no firebase
        console.log(uid);
        //Pega as informações do usuário dentro do banco de dados firestore
        const userProfile = await firebase.firestore().collection('users')
          .doc(uid).get();

        let data = {
          uid: uid,
          nome: userProfile.data().nome,
          avatarUrl: userProfile.data().avatarUrl,
          email: value.user.email
        };

        setUser(data); //Salva os dados do usuário
        storageUser(data);//Salva os dados do usuário no localStorage
        setLoadingAuth(false);

      }).catch((error) => {
        console.log("Lascou" + error);
        setLoadingAuth(false);
      })
  }

  //signOut (Deslogar o usuário)
  async function signOut() {
    await firebase.auth().signOut();
    localStorage.removeItem('SistemaUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut,
        signIn,
        loadingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;