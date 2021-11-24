import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';


export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { signed, loading } = useContext(AuthContext);


  //Está logando
  if (loading) {
    return (
      <div></div>
    )
  }

  //Não está logado e é uma rota privada, volto para a pagina home
  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }

  //Está logado e não é uma rota privada, entro na rota dashboard
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />
  }
  return (
    <Route
      {...rest}
      render={props => (
        <Component {...props} />
      )}
    />
  )
}