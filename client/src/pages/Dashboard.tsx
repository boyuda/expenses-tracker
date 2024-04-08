import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/Sidebar/DashProfile';
import DashMain from '../components/Sidebar/DashMain';

export default function Dashboard() {
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <DashSidebar />

      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* main... */}
      {tab === 'main' && <DashMain />}
    </div>
  );
}
