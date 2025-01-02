import './styles/dashboard.css';

export const metadata = {
  title: 'Dashboard | Todoish',
  description: 'Manage your tasks efficiently with Todoish',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      {children}
    </div>
  );
} 