interface Environment {
  production: boolean;
  development: boolean;
  test: boolean;
  apiUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export const environment: Environment = {
  production: import.meta.env.MODE === 'production',
  development: import.meta.env.MODE === 'development',
  test: import.meta.env.MODE === 'test',
  apiUrl: import.meta.env.VITE_API_URL || '',
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};
