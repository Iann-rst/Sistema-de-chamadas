import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

/*FIREBASE */
import firebase from '../../services/firebaseConnection';

/*Imagem Avatar*/
import avatar from '../../assets/avatar.png';

/* Componente Header */
import Header from '../../components/Header';
/* Componente Title */
import Title from '../../components/Title';

/* React Icons */
import { FiSettings, FiUpload } from 'react-icons/fi';

/* Arquivo CSS */
import './styles.css';

/*Alert personalizado */
import { toast } from 'react-toastify';

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);//Pega os dados do usuário pelo contexto de autenticação

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

  const [imageAvatar, setImageAvatar] = useState(null);

  //Função para pegar a imagem que o usuário selecionou
  //E mostrar, antes de enviar para o banco de dados
  function handleFile(e) {
    //console.log(e.target.files[0]);

    //recebe a imagem através do e.target
    if (e.target.files[0]) {
      const image = e.target.files[0];

      //Verifica se a imagem é jpeg ou png
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image);//Salva a img
        setAvatarUrl(URL.createObjectURL(image));//Cria uma url, para poder mostrar a imagem antes de enviar
      } else {
        alert('Envie uma image do tipo JPEG ou PNG');
        setImageAvatar(null);
        return null;
      }
    }
  }

  //Função para enviar a imagem do usuário para o firebase(banco de dados)
  async function handleUpload() {
    const currentUid = user.uid;

    //Envia a imagem para o storage do firebase
    const uploadTask = await firebase.storage().ref(`images/${currentUid}/${imageAvatar.name}`)
      .put(imageAvatar).then(async () => {
        console.log('FOTO ENVIADA COM SUCESSO');

        //Pega a url da imagem do storage firebase para salvar no banco de dados (firestore)
        await firebase.storage().ref(`images/${currentUid}`)
          .child(imageAvatar.name).getDownloadURL()
          .then(async (url) => {
            let urlFoto = url;

            //atualiza a imagem no firestore database
            await firebase.firestore().collection('users')
              .doc(user.uid)
              .update({
                avatarUrl: urlFoto,
                nome: nome
              })
              .then(() => {
                let data = {
                  ...user,
                  avatarUrl: urlFoto,
                  nome: nome
                };
                //Adiciona imagem do usuário no local storage
                setUser(data);
                storageUser(data);
              })
          })
      })
  }

  //Função para alterar os dados do usuário
  async function handleSave(e) {
    e.preventDefault();//Para a página não atualizar depois do submit
    //alert('Salvou');

    //Usuário quer apenas mudar o nome
    if (imageAvatar === null && nome !== '') {
      await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
          nome: nome
        })
        .then(() => {
          let data = {
            ...user,
            nome: nome
          };
          setUser(data);
          storageUser(data);
        })
      /*Usuário quer mudar o nome e imageAvatar 
      ** (ou apenas mudar a imageAvatar) - já que o nome do usuário ja sempre é diferente de ''
      */
    } else if (nome !== '' && imageAvatar !== null) {
      handleUpload();
    } else if (nome === '') {
      toast.info('Digite seu nome');
    }
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Meu Perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>

              <input type="file" accept="image/*" onChange={handleFile} /><br />
              {avatarUrl === null ?
                <img src={avatar} width="250" height="250" alt="Foto de perfil do usuário" />
                :
                <img src={avatarUrl} width="250" height="250" alt="foto do perfil do usuário" />
              }
            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Email</label>
            <input type="email" value={email} disabled={true} />

            <button type="submit">Salvar</button>

          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={() => signOut()}>Sair</button>
        </div>
      </div>
    </div>
  )
}