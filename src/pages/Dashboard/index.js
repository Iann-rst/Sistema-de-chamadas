/* Contexto de autenticação */
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

/* Componente Header */
import Header from '../../components/Header';

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  return (
    <div>
      <Header />
      <h1>Dashboard</h1>
      <button onClick={() => signOut()}>Fazer Logout</button>
    </div>
  )
}