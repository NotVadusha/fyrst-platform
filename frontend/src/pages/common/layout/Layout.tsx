import * as React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routerConfig } from 'src/common/router/common/config/router-config.config';
import { ReactComponent as ArrowDown } from 'src/assets/icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from 'src/assets/icons/arrow-up.svg';
import { NavItem as INavItem } from 'src/common/router/common/types/NavItem';
import { Button } from 'src/common/components/ui/common/Button';
import { authApi } from 'src/common/store/api/packages/authentication/authApi';
import { clearUser, setUser } from 'src/common/store/slices/packages/user/userSlice';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import { DecodedUser } from 'src/common/packages/user/types/models/User.model';
import jwtDecode from 'jwt-decode';
import { cn } from 'src/common/helpers/helpers';
import { selectUser } from '../../../common/store/slices/packages/user/userSelectors';

const apiUrl = process.env.REACT_APP_API_URL;

const Layout = () => {
  const [logout] = authApi.useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(clearUser());
      navigate('/auth/signin');
    } catch (error) {
      console.log(error);
    }
  };

  const user = useAppSelector(selectUser);

  React.useEffect(() => {
    if (user?.id) return;

    const getUser = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) return;
      const decode: DecodedUser = jwtDecode(token);

      const data = await (await fetch(`${apiUrl}/user/${decode.id}`)).json();

      dispatch(setUser(data));
    };

    getUser();
  }, []);

  return (
    <div className='flex'>
      <nav className='min-h-screen flex flex-col gap-8 p-8 bg-white w-[280px]'>
        <h2 className='font-bold text-lg'>{routerConfig.name}</h2>
        <div className='flex flex-col gap-4'>
          {routerConfig.mainNav.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
          <Button variant='secondary' className='w-full' type='button' onClick={handleButtonClick}>
            Logout
          </Button>
        </div>
      </nav>
      <main className='w-full bg-background'>
        <Outlet />
      </main>
    </div>
  );
};

function NavItem({ item }: { item: INavItem }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const location = useLocation();

  const isCurrentPath = location.pathname.startsWith(item.mainPath);

  React.useEffect(() => {
    if (isCurrentPath && isOpen) return;
    setIsOpen(false);
  }, [isCurrentPath]);

  const Icon = item.icon;

  return (
    <>
      <Link
        to={item.path}
        className={'p-2 rounded-md flex  w-full justify-between ' + `${isCurrentPath && 'bg-blue'}`}
      >
        <div className='flex gap-2 items-center'>
          {Icon && (
            <Icon className={cn('text-dark-grey', { 'text-white': isCurrentPath })} title='asd' />
          )}
          <span className={`${isCurrentPath && 'text-white'}`}>{item.title}</span>
        </div>
        {item.items?.length ? (
          <button
            className='flex items-center p-0 h-auto'
            onClick={e => {
              if (!isCurrentPath) {
                return setIsOpen(true);
              }
              setIsOpen(prev => !prev);
            }}
          >
            {isOpen ? (
              <ArrowDown className={`${isCurrentPath && 'text-white'}`} />
            ) : (
              <ArrowUp className={`${isCurrentPath && 'text-white'}`} />
            )}
          </button>
        ) : null}
      </Link>
      {isOpen &&
        item.items?.map((child, indx) => {
          const isCurrentPath = location.pathname.includes(child.path);
          return (
            <Link to={child.path} key={indx} className={`ml-6 ${isCurrentPath && 'text-blue'}`}>
              <span className='ml-6'>{child.title}</span>
            </Link>
          );
        })}
    </>
  );
}

export default Layout;
