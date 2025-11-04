import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hdkrfwgcmkxeeazkceiv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhka3Jmd2djbWt4ZWVhemtjZWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODM1MTIsImV4cCI6MjA3NzY1OTUxMn0.dQrxkDN24a0yaRr-1DsssacRK3TuhSytWU93UCEOKXY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: {
      getItem: (key: string) => {
        try {
          return localStorage.getItem(key);
        } catch {
          return null;
        }
      },
      setItem: (key: string, value: string) => {
        try {
          localStorage.setItem(key, value);
        } catch {
          // Handle storage quota exceeded or other errors silently
        }
      },
      removeItem: (key: string) => {
        try {
          localStorage.removeItem(key);
        } catch {
          // Handle removal errors silently
        }
      }
    }
  }
});

// Add session refresh helper
export const refreshSession = async () => {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Session refresh failed:', error);
    throw error;
  }
};

// Add session validation helper
export const validateSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    
    if (!session) {
      return null;
    }

    // Check if session is expired
    const expiresAt = session.expires_at;
    if (expiresAt && expiresAt * 1000 < Date.now()) {
      // Try to refresh
      const refreshed = await refreshSession();
      return refreshed.session;
    }

    return session;
  } catch (error) {
    console.error('Session validation failed:', error);
    return null;
  }
};