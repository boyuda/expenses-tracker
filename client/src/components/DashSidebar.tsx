import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiOutlineLogout, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1 ">
            <Sidebar.Item
              as={Link}
              to="/dashboard?tab=main"
              active={tab === 'dashboard'}
              icon={HiChartPie}
              title="Dashboard"
            >
              Dashboard
            </Sidebar.Item>

            <Sidebar.Item
              as={Link}
              to="/dashboard?tab=income"
              active={tab === 'income'}
              icon={HiUser}
              title="Income"
            >
              Income
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/dashboard?tab=expenses"
              active={tab === 'Expense'}
              icon={HiUser}
              title="Expenses"
            >
              Expenses
            </Sidebar.Item>

            <Sidebar.Item
              as={Link}
              to="/dashboard?tab=profile"
              active={tab === 'profile'}
              icon={HiUser}
              title="Profile"
            >
              Profile
            </Sidebar.Item>
            <Sidebar.Item
              onClick={handleSignout}
              icon={HiOutlineLogout}
              title="Sign Out"
              className="cursor-pointer"
            >
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
