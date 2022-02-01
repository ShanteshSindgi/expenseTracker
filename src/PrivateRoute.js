import {Navigate} from 'react-router-dom'
import {GetToken} from './GetToken'
export function PrivateRoute({ children }) {
    const auth = GetToken();
    return auth ? children : <Navigate to="/" />;
  }