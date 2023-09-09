import React, { useEffect, useRef, useState } from 'react';
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
import { ReactComponent as BurgerIcon } from 'src/assets/icons/burger.svg';
import { ScrollArea } from '../../../common/components/ui/common/ScrollArea/ScrollArea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'src/common/components/ui/common/Sheet/Sheet';

const apiUrl = process.env.REACT_APP_API_URL;

const Layout = () => {
  const [open, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const user = useAppSelector(selectUser);

  useEffect(() => {
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
    <div className='flex flex-col lg:flex-row relative'>
      <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <button className='fixed lg:hidden top-4 left-4 lg:left-auto z-50 p-4 h-[55px] w-[70px] flex justify-center items-center'>
            <BurgerIcon className='w-[20px] h-[20px]' />
          </button>
        </SheetTrigger>
        <SheetContent side={'left'}>
          <SheetHeader>
            <SheetTitle>Fyrst</SheetTitle>
            <MainNav onSelect={() => setIsOpen(false)} />
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <nav
        ref={navRef}
        className={cn(
          'w-[300px] top-0 left-0 flex flex-col gap-8 p-8 pb-0  h-screen bg-white fixed lg:block z-20 mt-[8px]',
          { 'fixed top-20 block': isNavOpen, hidden: !isNavOpen },
        )}
      >
        <h2 className='font-bold  hidden lg:block text-lg mb-[30px]'>{routerConfig.name}</h2>
        <MainNav />
      </nav>
      <main className='w-full lg:w-[calc(100%-300px)] lg:ml-[300px]  bg-background'>
        <Outlet />
      </main>
    </div>
  );
};

function MainNav({ onSelect }: { onSelect?: () => void }) {
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

  return (
    <ScrollArea className='h-[calc(100vh-88px-4rem)] h-[calc(100vh-88px-2rem)]'>
      <div className='flex flex-col gap-4 pr-4'>
        {routerConfig.mainNav.map((item, index) => (
          <NavItem key={index} item={item} onSelect={onSelect} />
        ))}
        <Button variant='secondary' className='w-full' type='button' onClick={handleButtonClick}>
          Logout
        </Button>
      </div>
    </ScrollArea>
  );
}

function NavItem({ item, onSelect }: { item: INavItem; onSelect?: () => void }) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const location = useLocation();

  const user = useAppSelector(selectUser);

  const canAccess =
    !item.isPrivate ||
    (item.neededPermission && user.permissions?.[item.neededPermission]) ||
    (item.neededRoles && item.neededRoles.includes(user.role?.label ?? ''));

  const canAccessSomeChildren = item.items?.some(
    item =>
      !item.isPrivate ||
      (item.neededPermission && user.permissions?.[item.neededPermission]) ||
      (item.neededRoles && item.neededRoles.includes(user.role?.label ?? '')),
  );

  const isCurrentPath = location.pathname.startsWith(item.mainPath);

  const Icon = item.icon;

  return (
    <>
      <Link
        to={item.path}
        onClick={() => onSelect?.()}
        className={cn('p-2 rounded-md flex  w-full justify-between', {
          'bg-blue': isCurrentPath,
          hidden: !canAccess,
        })}
      >
        <div className='flex gap-2 items-center'>
          {Icon && (
            <Icon className={cn('text-dark-grey', { 'text-white': isCurrentPath })} title='asd' />
          )}
          <span className={`${isCurrentPath && 'text-white'}`}>{item.title}</span>
        </div>
        {item.items?.length && canAccessSomeChildren ? (
          <button
            className='flex items-center p-0 h-auto'
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
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
          const canAccess =
            !child.isPrivate ||
            (child.neededPermission && user.permissions?.[child.neededPermission]);

          return (
            <Link
              to={child.path}
              key={indx}
              onClick={() => onSelect?.()}
              className={cn('ml-6', { 'text-blue': isCurrentPath, hidden: !canAccess })}
            >
              <span className='ml-6'>{child.title}</span>
            </Link>
          );
        })}
    </>
  );
}

export default Layout;
