import { useSelector } from 'react-redux';
import { selectAuthState } from '@/store/auth-slice';

import AdminHome from './components/admin-home/admin-home';
import { ACCOUNT_ROLE } from '@/constant/auth';
import StaffHome from './components/staff-home/staff-home';
import CustomerHome from './components/customer-home';

const Home = () => {
  const authState = useSelector(selectAuthState);

  return (
    <div className='page-container-2'>
      <div className='page-content'>
        {authState.accountRole === ACCOUNT_ROLE.ADMIN ? (
          <AdminHome />
        ) : authState.accountRole === ACCOUNT_ROLE.STAFF ? (
          <StaffHome />
        ) : (
          <CustomerHome />
        )}
      </div>
    </div>
  );
};

export default Home;
