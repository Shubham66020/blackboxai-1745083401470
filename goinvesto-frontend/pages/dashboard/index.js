import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // For demo, get role from localStorage or token (simplified)
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get role (simplified, in real app use jwt-decode)
      // Here we just simulate role retrieval
      const role = localStorage.getItem('role') || 'startup';
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, []);

  if (!userRole) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Dashboard - {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</h1>
      {userRole === 'startup' && (
        <div>
          <p>Welcome Startup! Here you can see investors, incubators, news, and apply or notify investors.</p>
          {/* Add more startup dashboard components here */}
        </div>
      )}
      {userRole === 'investor' && (
        <div>
          <p>Welcome Investor! Here you can see startups, incubators, send notifications, and view achievements.</p>
          {/* Add more investor dashboard components here */}
        </div>
      )}
      {userRole === 'incubator' && (
        <div>
          <p>Welcome Incubator! Here you can post events, track achievements, and manage your profile.</p>
          {/* Add more incubator dashboard components here */}
        </div>
      )}
    </div>
  );
}
