// Component used to make dashboard private
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRouth() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  // If logged in display children, otherwise navigate to sign in
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
