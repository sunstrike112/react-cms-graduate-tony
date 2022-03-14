import { useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// configs
import { PATH_NAME } from "configs";

// heplers
import { authStorage } from "helpers";
import { useEffect } from "react";

// services
import { authenticateUser } from "services/userServices";

// actions
import { setUser } from "state/app/appSlice";

const AuthGuard = ({ children }) => {
  const isAuth = authStorage.isAuthenticated();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAuthenticate = useCallback(async () => {
    try {
      const res = await authenticateUser();
      const user = res.data.user;
      const role = user.user.role;
      authStorage.setStorage(role, "role");
      dispatch(setUser(user));
    } catch (err) {
      authStorage.logOut();
      navigate(PATH_NAME.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    checkAuthenticate();
  }, [checkAuthenticate]);

  if (!isAuth) return <Navigate to={PATH_NAME.LOGIN} />;

  return <>{children}</>;
};

export default AuthGuard;
