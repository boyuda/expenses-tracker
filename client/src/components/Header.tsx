import { Button, Navbar } from 'flowbite-react';
import { FaMoon } from 'react-icons/fa';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const path = useLocation().pathname;
  return (
    <div>
      <Navbar className="border-b-2" fluid rounded>
        <Navbar.Brand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
            Expense Tracker
          </span>
        </Navbar.Brand>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
            <FaMoon />
          </Button>
          <Link to="signin">
            <Button gradientDuoTone="purpleToPink">Sign In</Button>
          </Link>
          <Navbar.Toggle />
        </div>
        {/* TODO: ADD CONDITIONAL FOR ACTIVE TEXT COLOR */}
        <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to="/" className="font-semibold ">
              Home
            </Link>
          </Navbar.Link>
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
