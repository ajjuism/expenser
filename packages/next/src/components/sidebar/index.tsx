/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import {
  HomeIcon,
  MenuIcon,
  DocumentAddIcon,
  XIcon,
  CogIcon,
  ClipboardListIcon,
  PuzzleIcon
} from '@heroicons/react/outline';
import { useEffect } from 'react';
import GetStorageData from '../../hooks/local-storage';
import NewSideBar from './new';

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

const navigation = [
  { name: 'Home', href: '/home', icon: HomeIcon, current: true },
  {
    name: 'Add Expense',
    href: '/add-expense',
    icon: DocumentAddIcon,
    current: false,
  },
  {
    name: 'View',
    href: '/get-expense',
    icon: ClipboardListIcon,
    current: false,
  },
  {
    name: 'Sheets',
    href: '/change-spread-sheet',
    icon: CogIcon,
    current: false,
  },
  {
    name: 'Integrations',
    href: '/integrations',
    icon: PuzzleIcon,
  }
  // { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
];

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [current, setCurrent] = useState('/home');
  const router = useRouter();
  const [getData] = GetStorageData();
  const data = getData();
  const changeRoute = (link: any) => {
    router.push(link);
  };
  const onLogout = () => {
    window.localStorage.clear();
    router.push('/login');
  };
  useEffect(() => {
    if (router.pathname) {
      setCurrent(router.pathname);
    }
  }, [router.pathname]);
  useEffect(() => {
    setUserData({
      displayName: data.displayName,
      photoUrl: data.photoUrl,
    })
  }, [data])
  const photoUrl = userData && userData.photoUrl
    ? userData.photoUrl
    : 'https://img.icons8.com/external-soft-fill-juicy-fish/60/000000/external-five-cute-monsters-soft-fill-soft-fill-juicy-fish.png'
  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full">
            <div className="relative flex-1 flex flex-col justify-between max-w-xs w-full bg-black">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex flex-col overflow-y-auto">
                <div className="flex items-center p-5 w-full text-black bg-white">
                  <div className="h-10 w-10 relative mr-2">
                    <Image src="/expenser-logo.png" alt="logo" layout="fill" />
                  </div>
                  <p className="text-2xl font-light">Expenser</p>
                </div>
                <div className="flex flex-1 flex-col items-left w-full space-y-2 pt-4 px-4">
                  {navigation.map((item, index) => {
                    return (
                      <button
                        onClick={() => changeRoute(item.href)}
                        key={index}
                        className={classNames(
                          'flex flex-row items-center justify-left rounded py-2 px-3',
                          current === item.href
                            ? 'bg-gray-200'
                            : 'hover:bg-gray-900',
                        )}>
                        <item.icon
                          className="h-6 w-6 mr-2"
                          color={current === item.href ? 'black' : 'white'}
                        />
                        <p
                          className={classNames(
                            current === item.href ? 'text-black' : 'text-white',
                          )}>
                          {item.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-shrink-0 w-full bg-neutral-900 items-center p-4">
                <div className="flex flex-auto items-center">
                  <img
                    className="inline-block h-8 w-8 rounded-full"
                    src={photoUrl}
                    alt="profile"
                  />
                  <p className="text-white font-semibold break-all mx-2">
                    {userData.displayName}
                  </p>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                  }}
                  className="text-sm border border-gray-200 rounded-full hover:bg-gray-200 text-gray-200 hover:text-white px-2 py-1">
                  Logout
                </button>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:top-0 md:bottom-0 md:bg-black md:min-h-0 md:overflow-y-auto">
        <div className="flex flex-col flex-1 items-center flex-shrink-0">
          <div className="flex items-center p-5 w-full text-black bg-white">
            <div className="h-10 w-10 relative mr-2">
              <Image src="/expenser-logo.png" alt="logo" layout="fill" />
            </div>
            <p className="text-2xl font-light">Expenser</p>
          </div>
          <div className="flex flex-1 flex-col items-left space-y-2 pt-4 px-4 w-full">
            {navigation.map((item, index) => {
              return (
                <button
                  onClick={() => changeRoute(item.href)}
                  key={index}
                  className={classNames(
                    'flex flex-row items-center justify-left rounded py-2 px-3',
                    current === item.href ? 'bg-gray-200' : 'hover:bg-gray-900',
                  )}>
                  <item.icon
                    className="h-6 w-6 mr-2"
                    color={current === item.href ? 'black' : 'white'}
                  />
                  <p
                    className={classNames(
                      current === item.href ? 'text-black' : 'text-white',
                    )}>
                    {item.name}
                  </p>
                </button>
              );
            })}
          </div>
          <div className="flex flex-shrink-0 w-full bg-neutral-900 items-center p-4">
            <div className="flex flex-auto items-center">
              <img
                className="inline-block h-8 w-8 rounded-full"
                src={photoUrl}
                alt="profile"
              />
              <p className="text-white font-semibold break-all mx-2">
                {userData.displayName}
              </p>
            </div>
            <button
              onClick={() => {
                onLogout();
              }}
              className="text-sm border border-gray-200 rounded-full hover:bg-gray-200 text-gray-200 hover:text-white px-2 py-1">
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 md:hidden bg-black pl-3 py-3 sm:pl-3 sm:pt-3">
          <button
            className="h-12 w-12"
            onClick={() => {
              setSidebarOpen(true);
            }}>
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" color="white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
};

export { SideBar };
export default NewSideBar;
