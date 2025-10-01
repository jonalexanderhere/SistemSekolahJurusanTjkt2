import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Create client only if configured, otherwise null
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local storage fallback for development
export const localStorageDB = {
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('localStorage error:', e);
      return false;
    }
  },
  
  add(key, item) {
    const items = this.get(key);
    items.push({ ...item, id: Date.now() + Math.random() });
    this.set(key, items);
    return items;
  },
  
  update(key, id, updates) {
    const items = this.get(key);
    const index = items.findIndex(item => item.id === id || item.student_id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      this.set(key, items);
    }
    return items;
  },
  
  delete(key, id) {
    const items = this.get(key);
    const filtered = items.filter(item => item.id !== id && item.student_id !== id);
    this.set(key, filtered);
    return filtered;
  }
};


