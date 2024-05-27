import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  redirectPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({
  isAuthenticated,
  // isUserAdmin,
  authenticationPath,
  redirectPath,
  outlet,
}: ProtectedRouteProps) {
  const currentLocation = useLocation();
  useEffect(() => {
    if (!isAuthenticated) {
      // console.log('jinkeee...jinke....');
    }
  }, [isAuthenticated, currentLocation]);

  if (isAuthenticated && currentLocation.pathname.includes(redirectPath)) {
    // console.log('ProtectedRoute isAuthenticated', currentLocation.pathname);
    return outlet;
  } else {
    // console.log('is A false ProtectedRoute', redirectPath);
    return (
      <Navigate
        to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }}
      />
    );
  }
}
