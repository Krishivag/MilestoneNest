import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Moon, Sun, Bell, Shield } from 'lucide-react';
import ChangePasswordModal from '../components/ChangePasswordModal';

const Settings = () => {                                                                                                 
    const { user } = useAuth();
    const { isDarkMode, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    const Section = ({ title, icon: Icon, children }) => (
        <div style={{
            backgroundColor: isDarkMode ? '#262626' : 'white',
            borderRadius: '16px',                     
            border: isDarkMode ? '1px solid #404040' : '1px solid #E5E5E5',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
                    padding: '0.5rem',
                    backgroundColor: isDarkMode ? '#404040' : '#F5F5F5',
                    borderRadius: '8px',
                    color: isDarkMode ? '#F5F5F5' : '#171717',
                    transition: 'all 0.3s ease'
                }}>
                    <Icon size={20} />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: isDarkMode ? '#F5F5F5' : '#171717', transition: 'color 0.3s ease' }}>{title}</h2>
            </div>
            {children}
        </div>
    );

    return (
        <div style={{
            backgroundColor: isDarkMode ? '#171717' : '#FAFAFA',
            minHeight: '100vh',
            padding: '2rem 5%',
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            transition: 'background-color 0.3s ease'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: isDarkMode ? '#F5F5F5' : '#171717', transition: 'color 0.3s ease' }}>Settings</h1>

                <Section title="Profile" icon={User}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'User')}&background=random`}
                            alt={user?.name || 'User'}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'User')}&background=random`;
                            }}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: isDarkMode ? '2px solid #404040' : '2px solid #E5E5E5',
                                transition: 'border-color 0.3s ease'
                            }}
                        />
                        <div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.25rem', color: isDarkMode ? '#F5F5F5' : '#171717', transition: 'color 0.3s ease' }}>{user?.name || 'Guest User'}</h3>
                            <p style={{ color: isDarkMode ? '#A3A3A3' : '#737373', marginBottom: '0.5rem', transition: 'color 0.3s ease' }}>{user?.email || 'guest@example.com'}</p>
                            <span style={{
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                backgroundColor: isDarkMode ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7',
                                color: isDarkMode ? '#4ade80' : '#166534',
                                borderRadius: '6px',
                                fontWeight: 600
                            }}>
                                Active Account
                            </span>
                        </div>
                    </div>
                </Section>

                <Section title="Appearance" icon={isDarkMode ? Moon : Sun}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h3 style={{ fontWeight: 600, marginBottom: '0.25rem', color: isDarkMode ? '#F5F5F5' : '#171717', transition: 'color 0.3s ease' }}>Dark Mode</h3>
                            <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#A3A3A3' : '#737373', transition: 'color 0.3s ease' }}>
                                Adjust the appearance of the application
                            </p>
                        </div>
                        <button
                            onClick={toggleTheme}
                            style={{
                                width: '48px',
                                height: '24px',
                                backgroundColor: isDarkMode ? '#6366f1' : '#E5E5E5',
                                borderRadius: '12px',
                                position: 'relative',
                                transition: 'background-color 0.2s',
                                cursor: 'pointer',
                                border: 'none'
                            }}
                        >
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: isDarkMode ? '26px' : '2px',
                                transition: 'left 0.2s',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }} />
                        </button>
                    </div>
                </Section>

                <Section title="Notifications" icon={Bell}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h3 style={{ fontWeight: 600, marginBottom: '0.25rem', color: isDarkMode ? '#F5F5F5' : '#171717', transition: 'color 0.3s ease' }}>Email Notifications</h3>
                            <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#A3A3A3' : '#737373', transition: 'color 0.3s ease' }}>
                                Receive updates about your tasks and milestones
                            </p>
                        </div>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            style={{
                                width: '48px',
                                height: '24px',
                                backgroundColor: notifications ? '#6366f1' : '#E5E5E5',
                                borderRadius: '12px',
                                position: 'relative',
                                transition: 'background-color 0.2s',
                                cursor: 'pointer',
                                border: 'none'
                            }}
                        >
                            <div style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '2px',
                                left: notifications ? '26px' : '2px',
                                transition: 'left 0.2s',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                            }} />
                        </button>
                    </div>
                </Section>

                <Section title="Security" icon={Shield}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontWeight: 600, color: isDarkMode ? '#F5F5F5' : '#171717', transition: 'color 0.3s ease' }}>Password</h3>
                                <p style={{ fontSize: '0.875rem', color: isDarkMode ? '#A3A3A3' : '#737373', transition: 'color 0.3s ease' }}>Last changed 3 months ago</p>
                            </div>
                            <button
                                onClick={() => setIsPasswordModalOpen(true)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: isDarkMode ? '1px solid #404040' : '1px solid #E5E5E5',
                                    borderRadius: '8px',
                                    backgroundColor: isDarkMode ? '#262626' : 'white',
                                    color: isDarkMode ? '#F5F5F5' : '#171717',
                                    cursor: 'pointer',
                                    fontWeight: 500,
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? '#404040' : '#F5F5F5'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = isDarkMode ? '#262626' : 'white'}
                            >
                                Change
                            </button>
                        </div>
                    </div>
                </Section>
            </div>

            {isPasswordModalOpen && (
                <ChangePasswordModal onClose={() => setIsPasswordModalOpen(false)} />
            )}
        </div>
    );
};

export default Settings;
