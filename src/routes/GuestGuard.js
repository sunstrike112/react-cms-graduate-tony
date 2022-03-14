import { Navigate } from 'react-router-dom';

// configs
import { PATH_NAME } from 'configs';

// heplers
import { authStorage } from 'helpers';

const GuestGuard = ({ children }) => {
  const isAuth = authStorage.isAuthenticated();

  if (isAuth) return <Navigate to={PATH_NAME.ROOT} />;

  return <>{children}</>;
};

export default GuestGuard;
