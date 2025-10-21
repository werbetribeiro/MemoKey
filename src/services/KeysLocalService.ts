import { Keys } from '@/models/Keys';
import * as SQLite from 'expo-sqlite';

// Inicializar o banco de dados
let db: SQLite.SQLiteDatabase | null = null;

/**
 * Inicializa o banco de dados e cria a tabela se não existir
 */
async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabaseAsync('memoKeys.db');

  // Habilita WAL mode para melhor performance
  await db.execAsync('PRAGMA journal_mode = WAL;');

  // Cria a tabela se não existir
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS keys (
      id TEXT PRIMARY KEY NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      secret INTEGER DEFAULT 0
    );
  `);

  return db;
}

/**
 * Obtém todas as chaves do banco de dados
 */
async function getKeys(): Promise<Keys[]> {
  try {
    const database = await initDatabase();
    const rows = await database.getAllAsync<{
      id: string;
      key: string;
      value: string;
      secret: number;
    }>('SELECT * FROM keys ORDER BY id DESC');

    // Converte os dados do SQLite para o formato do modelo Keys
    return rows.map((row) => ({
      id: row.id,
      key: JSON.parse(row.key) as string[], // key é armazenado como JSON string
      value: row.value,
      secret: row.secret === 1, // Converte INTEGER para boolean
    }));
  } catch (error) {
    throw new Error(`Error retrieving keys from database: ${error}`);
  }
}

/**
 * Obtém uma chave específica pelo ID
 */
async function getKeyById(id: string): Promise<Keys | null> {
  try {
    const database = await initDatabase();
    const row = await database.getFirstAsync<{
      id: string;
      key: string;
      value: string;
      secret: number;
    }>('SELECT * FROM keys WHERE id = ?', id);

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      key: JSON.parse(row.key) as string[],
      value: row.value,
      secret: row.secret === 1,
    };
  } catch (error) {
    throw new Error(`Error retrieving key by id from database: ${error}`);
  }
}

/**
 * Salva uma nova chave no banco de dados
 */
async function saveKeys(newKeys: Keys): Promise<void> {
  try {
    const database = await initDatabase();

    // Converte o array key para JSON string
    const keyJson = JSON.stringify(newKeys.key);
    const secretInt = newKeys.secret ? 1 : 0;

    await database.runAsync(
      'INSERT INTO keys (id, key, value, secret) VALUES (?, ?, ?, ?)',
      newKeys.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      keyJson,
      newKeys.value,
      secretInt
    );
  } catch (error) {
    throw new Error(`Error saving keys to database: ${error}`);
  }
}

/**
 * Atualiza uma chave existente no banco de dados
 */
async function updateKeys(id: string, updatedKeys: Partial<Keys>): Promise<void> {
  try {
    const database = await initDatabase();

    // Monta a query dinamicamente baseado nos campos fornecidos
    const updates: string[] = [];
    const values: (string | number)[] = [];

    if (updatedKeys.key !== undefined) {
      updates.push('key = ?');
      values.push(JSON.stringify(updatedKeys.key));
    }

    if (updatedKeys.value !== undefined) {
      updates.push('value = ?');
      values.push(updatedKeys.value);
    }

    if (updatedKeys.secret !== undefined) {
      updates.push('secret = ?');
      values.push(updatedKeys.secret ? 1 : 0);
    }

    if (updates.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id); // Adiciona o ID no final para o WHERE

    const query = `UPDATE keys SET ${updates.join(', ')} WHERE id = ?`;
    const result = await database.runAsync(query, ...values);

    if (result.changes === 0) {
      throw new Error(`Key with id ${id} not found`);
    }
  } catch (error) {
    throw new Error(`Error updating keys in database: ${error}`);
  }
}

/**
 * Remove uma chave específica pelo ID
 */
async function removeKeys(id: string): Promise<void> {
  try {
    const database = await initDatabase();
    const result = await database.runAsync('DELETE FROM keys WHERE id = ?', id);

    if (result.changes === 0) {
      throw new Error(`Key with id ${id} not found`);
    }
  } catch (error) {
    throw new Error(`Error removing keys from database: ${error}`);
  }
}

/**
 * Remove todas as chaves do banco de dados
 */
async function clearAllKeys(): Promise<void> {
  try {
    const database = await initDatabase();
    await database.runAsync('DELETE FROM keys');
  } catch (error) {
    throw new Error(`Error clearing all keys from database: ${error}`);
  }
}

/**
 * Pesquisa chaves por termo de busca
 */
async function searchKeys(searchTerm: string): Promise<Keys[]> {
  try {
    const database = await initDatabase();
    const rows = await database.getAllAsync<{
      id: string;
      key: string;
      value: string;
      secret: number;
    }>(
      "SELECT * FROM keys WHERE key LIKE ? OR value LIKE ? ORDER BY id DESC",
      `%${searchTerm}%`,
      `%${searchTerm}%`
    );

    return rows.map((row) => ({
      id: row.id,
      key: JSON.parse(row.key) as string[],
      value: row.value,
      secret: row.secret === 1,
    }));
  } catch (error) {
    throw new Error(`Error searching keys in database: ${error}`);
  }
}

/**
 * Obtém chaves filtradas por tipo (secreto ou não)
 */
async function getKeysByType(isSecret: boolean): Promise<Keys[]> {
  try {
    const database = await initDatabase();
    const secretInt = isSecret ? 1 : 0;

    const rows = await database.getAllAsync<{
      id: string;
      key: string;
      value: string;
      secret: number;
    }>('SELECT * FROM keys WHERE secret = ? ORDER BY id DESC', secretInt);

    return rows.map((row) => ({
      id: row.id,
      key: JSON.parse(row.key) as string[],
      value: row.value,
      secret: row.secret === 1,
    }));
  } catch (error) {
    throw new Error(`Error retrieving keys by type from database: ${error}`);
  }
}

/**
 * Conta o total de chaves no banco de dados
 */
async function countKeys(): Promise<number> {
  try {
    const database = await initDatabase();
    const result = await database.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM keys'
    );
    return result?.count || 0;
  } catch (error) {
    throw new Error(`Error counting keys in database: ${error}`);
  }
}

export const KeysLocalService = {
  initDatabase,
  getKeys,
  getKeyById,
  saveKeys,
  updateKeys,
  removeKeys,
  clearAllKeys,
  searchKeys,
  getKeysByType,
  countKeys,
};

