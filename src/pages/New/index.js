import { useState, useEffect, useContext } from 'react';

/* FIREBASE - BANCO DE DADOS */
import firebase from '../../services/firebaseConnection';

/* Componentes */
import Header from '../../components/Header';
import Title from '../../components/Title';

/* Contexto de autenticação */
import { AuthContext } from '../../contexts/auth';

/* Ícones */
import { FiPlusCircle } from 'react-icons/fi';

/* Arquivo de Estilização */
import './styles.css';

/*Alerta Personalizado */
import { toast } from 'react-toastify';

export default function New() {

  const [loadCustomers, setLoadCustomers] = useState(true);

  //UseState para salvar os clientes
  const [customers, setCustomers] = useState([]);
  //useState para pegar o cliente selecionado no formulário
  const [customerSelected, setCustomerSelected] = useState(0);

  //Por padrão, ao entrar na página o Assunto é "suporte"
  const [assunto, setAssunto] = useState('Suporte');
  //Por padrão, ao entrar na página o Status é "Em Aberto"
  const [status, setStatus] = useState('Aberto');
  //Usar para set do complemento do formulário
  const [complemento, setComplemento] = useState('');



  const { user } = useContext(AuthContext);

  //Buscar as informações dos clientes assim que a página de novo chamado é renderizada
  useEffect(() => {
    async function loadCustomers() {
      await firebase.firestore().collection('customers')
        .get()
        .then((snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia
            })
          })

          if (lista.length === 0) {
            console.log('NENHUMA EMPRESA ENCONTRADA');
            setCustomers([{ id: '1', nomeFantasia: 'FREELA' }]);
            setLoadCustomers(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomers(false);

        })
        .catch((error) => {
          console.log('DEU ALGUM ERRO!', error);
          setLoadCustomers(false);
          setCustomers([{ id: '1', nomeFantasia: '' }]);
        })
    }

    loadCustomers();
  }, [])


  //Função para registrar o novo chamado no firebase
  async function handleRegister(e) {
    e.preventDefault();

    await firebase.firestore().collection('chamados')
      .add({
        created: new Date(),
        cliente: customers[customerSelected].nomeFantasia,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid
      })
      .then(() => {
        toast.success('Novo Chamado criado com sucesso.');
        setComplemento('');
        setCustomerSelected(0);
      })
      .catch((error) => {
        toast.error('Ops, erro ao registrar. Tente mais tarde.')
        console.log(error);
      })
  }

  //Função para salvar o select no do Assunto do formulário (suporte, financeiro ou Visita)
  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }

  //Função para quando trocar o status no formulário (Em aberto, progresso, Atendido)
  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  //Função para quando trocar de cliente no formulário
  function handleChangeCustomers(e) {
    //console.log('INDEX DO CLIENTE SELECIONADO: ', e.target.value);
    //console.log('Cliente selecionado', customers[e.target.value]);
    setCustomerSelected(e.target.value);
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
            {loadCustomers ? (
              <input type="text" disabled={true} value="Carregando clientes..." />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomers}>
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nomeFantasia}
                    </option>
                  )
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
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
                onChange={handleOptionChange}
                checked={status === 'Aberto'}
              />
              <span>Em aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === 'Progresso'}
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === 'Atendido'}
              />
              <span>Atendido</span>
            </div>

            <label className="complemento">Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
            />


            <button type="submit">Registrar Chamado</button>
          </form>
        </div>
      </div>
    </div>
  )
}