import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

//Página de cadastro
function SignUp() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('')

  function handleSubmit(e) {
    e.preventDefault(); //para não atualizar a página
    alert('Clicou');
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="logo-area">
          <img src={logo} alt="Logo do Sistema" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastrar uma conta</h1>
          <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="text" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <button type="submit">Acessar</button>
        </form>
        <Link to="/">Já tem uma conta?</Link>
      </div>
    </div>
  );
}

export default SignUp;
