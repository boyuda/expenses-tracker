import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiOutlineLogout, HiUser } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div>
      <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            <Link to="/dashboard?tab=main">
              <Sidebar.Item
                active={tab === 'dashboard'}
                icon={HiChartPie}
                title="Dashboard"
              >
                Dashboard
              </Sidebar.Item>
            </Link>

            <Link to="/dashboard?tab=profile">
              <Sidebar.Item
                active={tab === 'profile'}
                icon={HiUser}
                title="Profile"
              >
                Profile
              </Sidebar.Item>
            </Link>

            <Sidebar.Item icon={HiOutlineLogout} title="Sign Out">
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
