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
  async function signUp(email, password, nome) {
    setLoadingAuth(true);
    //Cria usuário (email) e senha no firebase
    await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.uid;;

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
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;