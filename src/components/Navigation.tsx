import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import sihLogo from '@/assets/sih-logo.png';
import { useApi } from '@/lib/api';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isRegistrationEnabled, setIsRegistrationEnabled] = useState(true);
  const [registrationDeadline, setRegistrationDeadline] = useState<Date | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const api = useApi();

  useEffect(() => {
    const checkRegistrationStatus = async () => {
      try {
        const settings = await api.getRegistrationSettings();
        const deadline = new Date(settings.registrationDeadline);
        setRegistrationDeadline(deadline);
        setIsRegistrationEnabled(settings.isRegistrationEnabled && new Date() < deadline);
      } catch (error) {
        console.error('Failed to fetch registration settings:', error);
      }
    };
    checkRegistrationStatus();
  }, []);

  const navItems = [
    { path: '/', label: 'Home', alwaysEnabled: true },
    { path: '/team-registration', label: 'Team Registration', requiresRegistration: true },
    { path: '/individual-registration', label: 'Individual Registration', requiresRegistration: true },
    { path: '/registered', label: 'Registered', alwaysEnabled: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: any) => {
    if (item.requiresRegistration && !isRegistrationEnabled) {
      e.preventDefault();
      const deadlineDate = registrationDeadline ? new Date(registrationDeadline).toLocaleDateString() : 'the deadline';
      alert(`Registration is currently closed. The deadline was ${deadlineDate}.`);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === 'sih2025admin') {
      window.location.href = '/admin';
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={sihLogo} 
              alt="SIH Logo" 
              className="h-10 w-10 rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                SIH 2025
              </h1>
              <p className="text-xs text-muted-foreground">LNCTU Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`nav-link ${
                  location.pathname === item.path ? 'text-primary' : ''
                } ${
                  item.requiresRegistration && !isRegistrationEnabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {item.label}
                {item.requiresRegistration && !isRegistrationEnabled && (
                  <span className="ml-1 text-xs text-destructive">(Closed)</span>
                )}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdminLogin(true)}
              className="ml-2"
            >
              <Shield className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                } ${
                  item.requiresRegistration && !isRegistrationEnabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={(e) => {
                  handleNavClick(e, item);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
                {item.requiresRegistration && !isRegistrationEnabled && (
                  <span className="ml-1 text-xs text-destructive">(Closed)</span>
                )}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAdminLogin(true);
                setIsMenuOpen(false);
              }}
              className="mt-2 w-full justify-start"
            >
              <Shield className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </div>
        )}
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card p-6 rounded-xl border border-border w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Admin Access</h3>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-3 bg-input border border-border rounded-lg mb-4"
              onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <div className="flex gap-2">
              <Button onClick={handleAdminLogin} className="flex-1">
                Login
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAdminLogin(false);
                  setAdminPassword('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;