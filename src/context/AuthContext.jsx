import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {                                                                                                           
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sync user with backend
    const syncWithBackend = async (firebaseUser) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/auth/sync`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: firebaseUser.email,
                    name: firebaseUser.displayName,
                    googleId: firebaseUser.uid,
                    avatar: firebaseUser.photoURL
                }),
            });

            const data = await response.json();
            if (data.success) {
                // Merge backend user data with firebase user
                setUser({ ...data.data.user, token: data.data.token });
                localStorage.setItem('milestonenest_token', data.data.token);
            } else {
                // Backend sync failed but Firebase auth succeeded - set user anyway
                console.warn('Backend sync failed, using Firebase user data only');
                setUser({
                    id: firebaseUser.uid,
                    name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                    email: firebaseUser.email,
                    avatar: firebaseUser.photoURL
                });
            }
        } catch (error) {
            console.error('Backend sync error:', error);
            // Even if backend fails, set user from Firebase data so auth works
            setUser({
                id: firebaseUser.uid,
                name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
                email: firebaseUser.email,
                avatar: firebaseUser.photoURL
            });
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                await syncWithBackend(currentUser);
            } else {
                setUser(null);
                localStorage.removeItem('milestonenest_token');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, googleSignIn, logout, loading, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
