import { useState } from 'react';
import { FiUsers } from 'react-icons/fi';

/*Firebase */
import firebase from '../../services/firebaseConnection';

/*Estilo CSS */
import './styles.css';
/*Componente Header */
import Header from '../../components/Header';
/*Componente Title */
import Title from '../../components/Title';

/*Alert personalizado */
import { toast } from 'react-toastify';



/* Página de clientes */
export default function Customers() {
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');

  //Função para cadastrar o cliente no banco de dados
  async function handleAdd(e) {
    e.preventDefault();//Para não atualizar a página após o submit do formulário

    //Cadastrar o cliente no banco de dados
    if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
      await firebase.firestore().collection('customers')
        .add({
          nomeFantasia: nomeFantasia,
          cnpj: cnpj,
          endereco: endereco
        })
        .then(() => {
          setNomeFantasia('');
          setCnpj('');
          setEndereco('');
          toast.info('Empresa cadastrada com sucesso!');
        })
        .catch(err => {
          console.log(err);
          toast.error('Erro ao cadastrar essa empresa.');
        })
    } else {
      toast.error('Preencha todos os campos!');
      setNomeFantasia('');
      setCnpj('');
      setEndereco('');
    }
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Clientes">
          <FiUsers color="#000" size={25} />
        </Title>

        <div className="container">

          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>Nome Fantasia</label>
            <input type="text" placeholder="Nome da sua empresa" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />

            <label>CNPJ</label>
            <input type="text" placeholder="CNPJ da empresa" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

            <label>Endereço</label>
            <input type="text" placeholder="Endereço da empresa" value={endereco} onChange={(e) => setEndereco(e.target.value)} />

            <button type="submit">Cadastrar</button>

          </form>

        </div>
      </div>
    </div>
  )
}