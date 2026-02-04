import { Link, useLocation } from 'react-router-dom';

const Layout = ({ user, onLogout, children }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/bookings', label: 'Bookings', icon: '📅' },
    { path: '/cms/pages', label: 'Pages', icon: '📄' },
    { path: '/cms/gallery', label: 'Gallery', icon: '🖼️' },
    { path: '/cms/packages', label: 'Packages', icon: '💰' },
    { path: '/cms/services', label: 'Services', icon: '🛠️' },
    { path: '/cms/testimonials', label: 'Testimonials', icon: '💬' },
    { path: '/cms/faqs', label: 'FAQs', icon: '❓' }
  ];

  if (user.role === 'super_admin') {
    menuItems.push({ path: '/users', label: 'Users', icon: '👥' });
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen border-r border-gray-800">
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white">
              Admin Panel
            </h2>
            <p className="text-xs text-gray-400 mt-1">Management Dashboard</p>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <span className="mr-3 text-base">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
          <div className="mb-4 p-3 bg-gray-800 rounded-md">
            <p className="text-xs text-gray-400 mb-1">Logged in as</p>
            <p className="font-semibold text-white text-sm">{user.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user.role.replace('_', ' ')}</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full btn-danger"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
