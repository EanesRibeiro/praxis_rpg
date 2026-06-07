import type { StoredSession } from '../types';

const STORAGE_KEY = 'askesis_history';
const MAX_SESSIONS = 10;

export function saveSession(session: StoredSession): void {
  try {
    const existing = loadHistory();
    const updated = [session, ...existing].slice(0, MAX_SESSIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Falha ao salvar sessão no localStorage:', e);
  }
}

export function loadHistory(): StoredSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silencia erros se o localStorage estiver indisponível
  }
}
