/* Contexto de autenticação */
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';

import { Link } from 'react-router-dom';

/* React Icons */
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";

/*Arquivo CSS */
import './styles.css';

/* Avatar Imagem */
import avatar from '../../assets/avatar.png';

export default function Header() {
  const { user } = useContext(AuthContext);
  return (

    <div className="sidebar">
      <div>
        <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto Perfil" />
      </div>

      {/* */}
      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Chamados
      </Link>

      {/*Página Clientes*/}
      <Link to="/customers">
        <FiUsers color="#FFF" size={24} />
        Clientes
      </Link>

      { /*Página perfil */}
      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        Configurações
      </Link>
    </div>
  )
}