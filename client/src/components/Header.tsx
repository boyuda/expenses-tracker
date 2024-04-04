import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
} from 'flowbite-react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTheme } from '../redux/theme/themeSlice';

export default function Header() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  // Get current theme
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();
  console.log(theme);

  const path = useLocation().pathname;
  return (
    <div>
      <Navbar className="border-b-2">
        <Navbar.Brand as={Link} to="/">
          <img
            src="../../public/images/logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            Expense Tracker
          </span>
        </Navbar.Brand>
        <div className="flex gap-2 md:order-2">
          {/* Hidden? */}
          <Button
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {/* Toggle theme icon */}
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={true}
              inline
              // TODO:Maybe add image?
              label={<Avatar alt="user" rounded />}
            >
              <DropdownHeader>
                <span className="block text-sm">@{currentUser.username}</span>
                <span className="block text-sm font-semibold truncate">
                  {currentUser.email}
                </span>
              </DropdownHeader>

              <DropdownItem>
                <Link to="/dashboard?tab=profile">Profile</Link>
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <Link to="sign-in">
              <Button gradientDuoTone="purpleToBlue" outline>
                Sign In
              </Button>
            </Link>
          )}

          <Navbar.Toggle />
        </div>
        {/* TODO: ADD CONDITIONAL FOR ACTIVE TEXT COLOR */}
        <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to="/" className="font-semibold ">
              Home
            </Link>
          </Navbar.Link>
          {/* If user signed in display dashboard type */}
          {currentUser ? (
            <Navbar.Link active={path === '/dashboard'} as={'div'}>
              <Link to="/" className="font-semibold ">
                Dashboard
              </Link>
            </Navbar.Link>
          ) : null}
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to="/about" className="font-semibold">
              About
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
