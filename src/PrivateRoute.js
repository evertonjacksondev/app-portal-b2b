import { Navigate, Outlet } from 'react-router-dom'
import Template from './components/Template'
import jwtDecode from 'jwt-decode';
import { useSnackbar } from 'notistack';


export const ProtectedRoutes = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  let isAuthenticated
  const token = localStorage.getItem('authToken');
  if (!token || token == null) {
    isAuthenticated = false
  } else {
    const user = JSON.parse(token)
    const decodedToken = jwtDecode(user.authToken);

    if (token && decodedToken.isActive) {
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        // Token expirado
        isAuthenticated = false;
        // setIsAuthenticated(false)
        enqueueSnackbar('Sessão expirada !', { variant: 'info' })
      } else {
        // Token válido
        isAuthenticated = true;
        // setIsAuthenticated(true)
      }
    } else {
      // // Token não existe
      isAuthenticated = false
      // setIsAuthenticated(false)
    }
  }

  return isAuthenticated ?
    <Template>
      <Outlet />
    </Template> :
    <Navigate to='/login' />
}

export const getToken = async () => {
  try {
    const Authorization = `Bearer ${JSON.parse(localStorage.getItem('authToken')).authToken}`

    return Authorization
  }
  catch (error) {
    console.log(error)
  }
}