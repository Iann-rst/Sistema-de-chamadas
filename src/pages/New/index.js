import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiPlusCircle } from 'react-icons/fi';

/* Arquivo de Estilização */
import './styles.css';

export default function New() {

  function handleRegister(e) {
    e.preventDefault();

    alert("Teste");
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">

          {/*Formulário para cadastrar um novo chamado*/}
          <form className="form-profile" onSubmit={handleRegister}>

            <label>Cliente</label>
            <select>
              <option key={1} value={1}>
                Sujeito Programador
              </option>
            </select>

            <label>Assunto</label>
            <select>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
              />
              <span>Em aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)"
            />


            <button type="submit">Registrar Chamado</button>
          </form>
        </div>
      </div>
    </div>
  )
}