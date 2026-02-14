import { useAuthStore } from "../store/auth-store";

export function Dashboard() {
  const { full_name, email, role, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">LifeHub</h2>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your dashboard</p>
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Name:</span>
              <p className="text-gray-900">{full_name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Email:</span>
              <p className="text-gray-900">{email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Role:</span>
              <p className="text-gray-900">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
