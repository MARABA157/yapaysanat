import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/models';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signOut: () => void;
  profile: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Burada gerçek bir auth servisi kullanılabilir
    // Örneğin: localStorage'dan kullanıcı bilgilerini çekme
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Burada gerçek bir login işlemi yapılabilir
      // Örnek mock kullanıcı:
      const mockUser: User = {
        id: '1',
        email,
        username: email.split('@')[0],
        full_name: 'Test User',
        avatar_url: 'https://i.pravatar.cc/150?u=' + email,
        role: 'user',
        preferences: {},
        created_at: new Date().toISOString()
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // signOut, logout ile aynı işlevi görüyor
  const signOut = logout;

  const value = {
    user,
    loading,
    login,
    logout,
    signOut,
    profile: user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
