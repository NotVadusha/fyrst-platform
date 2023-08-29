import * as React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from 'src/config/site';
import { ReactComponent as ArrowDown } from '../../icons/arrow-down.svg';
import { ReactComponent as ArrowUp } from '../../icons/arrow-up.svg';
import { NavItem as INavItem } from 'types';
import { Toaster } from 'src/components/ui/common/Toast/Toaster';
import { Button } from 'src/ui/common/Button';
import { authApi } from 'src/store/reducers/user/authApi';
import { clearUser } from 'src/store/reducers/user.store';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';

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

  const user = useAppSelector(store => store.user);

  return (
    <div className='flex'>
      <nav className='min-h-screen flex flex-col gap-8 p-8 bg-white w-[280px]'>
        <h2 className='font-bold text-lg'>{siteConfig.name}</h2>
        <div className='flex flex-col gap-4'>
          {siteConfig.mainNav.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
          {!!user?.id ? (
            <Button
              variant='secondary'
              className='w-full'
              type='button'
              onClick={handleButtonClick}
            >
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate('/auth/signin')}>Sign in</Button>
          )}
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

  const isCurrentPath = location.pathname.includes(item.path);

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
          {Icon && <Icon className={`${isCurrentPath && 'text-white'}`} title='asd' />}
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
