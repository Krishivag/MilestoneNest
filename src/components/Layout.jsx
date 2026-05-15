import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Flag, Settings, Menu, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { isDarkMode } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile && !isSidebarOpen) setIsSidebarOpen(true);
            if (mobile && isSidebarOpen) setIsSidebarOpen(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/tasks', label: 'Tasks', icon: CheckSquare },
        { path: '/milestones', label: 'Milestones', icon: Flag },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            backgroundColor: isDarkMode ? '#171717' : '#FAFAFA',
            color: isDarkMode ? '#F5F5F5' : '#171717',
            overflow: 'hidden',
            transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
            {/* Mobile Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 40
                    }}
                />
            )}

            {/* Sidebar */}
            <aside style={{
                width: isSidebarOpen ? '260px' : (isMobile ? '0px' : '80px'),
                backgroundColor: isDarkMode ? '#262626' : 'white',
                borderRight: isDarkMode ? '1px solid #404040' : '1px solid #E5E5E5',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem 1rem',
                position: isMobile ? 'fixed' : 'relative',
                height: '100%',
                zIndex: 50,
                left: isMobile && !isSidebarOpen ? '-260px' : '0',
                overflow: 'hidden',
                boxShadow: isSidebarOpen ? '4px 0 24px rgba(0,0,0,0.02)' : 'none'
            }}>
                <div style={{
                    padding: '0 0.5rem',
                    marginBottom: '2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isSidebarOpen ? 'space-between' : 'center',
                    minHeight: '40px'
                }}>
                    {isSidebarOpen && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: isDarkMode ? '#404040' : '#171717',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>
                                <LayoutDashboard size={18} />
                            </div>
                            <h1 style={{ fontSize: '1.125rem', fontWeight: '700', color: isDarkMode ? '#F5F5F5' : '#171717', letterSpacing: '-0.02em' }}>
                                Milestonenest
                            </h1>
                        </div>
                    )}
                    {!isMobile && (
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            style={{
                                color: isDarkMode ? '#A3A3A3' : '#A3A3A3',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                transition: 'all 0.2s',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = isDarkMode ? '#F5F5F5' : '#171717';
                                e.currentTarget.style.backgroundColor = isDarkMode ? '#404040' : '#F5F5F5';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#A3A3A3';
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <Menu size={20} />
                        </button>
                    )}
                    {isMobile && isSidebarOpen && (
                        <button onClick={() => setIsSidebarOpen(false)} style={{ color: '#737373', background: 'none', border: 'none' }}>
                            <Menu size={20} />
                        </button>
                    )}
                </div>

                {/* User Profile */}
                {user && (
                    <div style={{
                        padding: isSidebarOpen ? '1rem' : '0.5rem',
                        marginBottom: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                        backgroundColor: isSidebarOpen ? (isDarkMode ? '#171717' : '#FAFAFA') : 'transparent',
                        borderRadius: '12px',
                        border: isSidebarOpen ? (isDarkMode ? '1px solid #404040' : '1px solid #F5F5F5') : 'none'
                    }}>
                        <img
                            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || 'User')}&background=random`}
                            alt={user.name || 'User'}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || 'User')}&background=random`;
                            }}
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                objectFit: 'cover',
                                border: isDarkMode ? '1px solid #404040' : '1px solid #E5E5E5'
                            }}
                        />
                        {isSidebarOpen && (
                            <div style={{ overflow: 'hidden' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: isDarkMode ? '#F5F5F5' : '#171717', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {user.name || 'Guest User'}
                                </p>
                                <p style={{ fontSize: '0.75rem', color: isDarkMode ? '#A3A3A3' : '#737373', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {user.email || 'guest@example.com'}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <nav style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => isMobile && setIsSidebarOpen(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0.875rem 1rem',
                                    color: isActive ? (isDarkMode ? '#F5F5F5' : '#171717') : (isDarkMode ? '#A3A3A3' : '#737373'),
                                    backgroundColor: isActive ? (isDarkMode ? '#404040' : '#F5F5F5') : 'transparent',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                                    transition: 'all 0.2s ease',
                                    whiteSpace: 'nowrap',
                                    fontWeight: isActive ? 600 : 500,
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = isDarkMode ? '#262626' : '#FAFAFA';
                                        e.currentTarget.style.color = isDarkMode ? '#F5F5F5' : '#171717';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = isDarkMode ? '#A3A3A3' : '#737373';
                                    }
                                }}
                            >
                                <item.icon size={20} style={{ minWidth: '20px', strokeWidth: isActive ? 2.5 : 2 }} />
                                {isSidebarOpen && <span style={{ marginLeft: '1rem' }}>{item.label}</span>}
                                {isActive && isSidebarOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        right: '1rem',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        backgroundColor: isDarkMode ? '#F5F5F5' : '#171717'
                                    }} />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div style={{ padding: '1rem 0', borderTop: isDarkMode ? '1px solid #404040' : '1px solid #F5F5F5', marginTop: 'auto' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.875rem 1rem',
                            color: '#ef4444',
                            backgroundColor: 'transparent',
                            width: '100%',
                            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: 500
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <LogOut size={20} style={{ minWidth: '20px' }} />
                        {isSidebarOpen && <span style={{ marginLeft: '1rem' }}>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, overflow: 'auto', padding: isMobile ? '1rem' : '2rem', position: 'relative' }}>
                {isMobile && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                            zIndex: 30,
                            padding: '0.5rem',
                            backgroundColor: isDarkMode ? '#262626' : 'white',
                            borderRadius: '8px',
                            border: isDarkMode ? '1px solid #404040' : '1px solid #E5E5E5',
                            color: isDarkMode ? '#A3A3A3' : '#737373'
                        }}
                    >
                        <Menu size={20} />
                    </button>
                )}
                <div style={{ marginTop: isMobile ? '3rem' : '0' }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
