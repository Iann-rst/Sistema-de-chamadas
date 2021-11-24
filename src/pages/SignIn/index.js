import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';

import './styles.css';
import logo from '../../assets/logo.png';

//Página de login
function SignIn() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { signIn, loadingAuth } = useContext(AuthContext);

  //Função para pegar o email/senha e logar o usuário
  function handleSubmit(e) {
    e.preventDefault(); //para não atualizar a página
    if (email !== '' && senha !== '') {
      signIn(email, senha);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="Logo do Sistema" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type="text" placeholder="digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar'}</button>
        </form>
        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
