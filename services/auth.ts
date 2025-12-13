const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Login failed' };
    }

    const { token, user } = data as LoginResponse;

    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY) !== null;
  }
  return false;
};
