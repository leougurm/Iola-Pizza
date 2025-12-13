// A simple mock authentication service

const TOKEN_KEY = 'auth_token';

export const login = (password: string): boolean => {
  // In a real app, you'd have a more secure check
  if (password === 'password') {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, 'dummy_token');
    }
    return true;
  }
  return false;
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY) !== null;
  }
  return false;
};
