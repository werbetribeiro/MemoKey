import * as SQLite from 'expo-sqlite';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface DatabaseContextType {
  db: SQLite.SQLiteDatabase | null;
  isLoading: boolean;
  error: Error | null;
}

const DatabaseContext = createContext<DatabaseContextType>({
  db: null,
  isLoading: true,
  error: null,
});

export const useDatabaseContext = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabaseContext must be used within a DatabaseProvider');
  }
  return context;
};

interface DatabaseProviderProps {
  children: React.ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initDatabase();
  }, []);

  const initDatabase = async () => {
    try {
      setIsLoading(true);
      const database = await SQLite.openDatabaseAsync('memoKeys.db');

      // Habilita WAL mode para melhor performance
      await database.execAsync('PRAGMA journal_mode = WAL;');

      // Cria a tabela se não existir
      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS keys (
          id TEXT PRIMARY KEY NOT NULL,
          key TEXT NOT NULL,
          value TEXT NOT NULL,
          secret INTEGER DEFAULT 0
        );
      `);

      setDb(database);
      setError(null);
      console.log('✅ Database initialized successfully');
    } catch (err) {
      console.error('❌ Error initializing database:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DatabaseContext.Provider value={{ db, isLoading, error }}>
      {children}
    </DatabaseContext.Provider>
  );
};
