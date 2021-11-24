/* Componente Header */
import Header from '../../components/Header';
/* Componente Title */
import Title from '../../components/Title';

/* React Icons */
import { FiSettings } from 'react-icons/fi';

/* Arquivo CSS */
import './styles.css';

export default function Profile() {
  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Meu Perfil">
          <FiSettings size={25} />
        </Title>
      </div>
    </div>
  )
}