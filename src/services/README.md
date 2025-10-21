# KeysLocalService - CRUD SQLite

Serviço completo para gerenciar chaves usando SQLite com `expo-sqlite`.

## 📋 Funcionalidades

### CRUD Completo
- ✅ **Create** - Criar novas chaves
- ✅ **Read** - Ler chaves (todas, por ID, por tipo)
- ✅ **Update** - Atualizar chaves existentes
- ✅ **Delete** - Remover chaves (individual ou todas)

### Funcionalidades Extras
- 🔍 Pesquisa por termo
- 🔐 Filtro por tipo (secreto/não secreto)
- 📊 Contagem de registros

## 🚀 Uso

### 1. Inicializar o Banco de Dados

O banco de dados é inicializado automaticamente pelo `DatabaseProvider` no `_layout.tsx`. Não é necessário chamar manualmente.

```typescript
import { DatabaseProvider } from '@/providers/DatabaseProvider';

// No _layout.tsx
<DatabaseProvider>
  {/* Seu app */}
</DatabaseProvider>
```

### 2. Operações CRUD

#### **CREATE - Salvar uma nova chave**

```typescript
import { KeysLocalService } from '@/services/KeysLocalService';

const newKey = {
  id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  key: ['github', 'token'],
  value: 'ghp_xxxxxxxxxxxx',
  secret: true
};

await KeysLocalService.saveKeys(newKey);
```

#### **READ - Obter todas as chaves**

```typescript
const allKeys = await KeysLocalService.getKeys();
console.log(allKeys);
// [{ id: '...', key: ['github', 'token'], value: '...', secret: true }, ...]
```

#### **READ - Obter uma chave por ID**

```typescript
const key = await KeysLocalService.getKeyById('1234567890-abc');
console.log(key);
// { id: '1234567890-abc', key: ['github'], value: '...', secret: false }
```

#### **READ - Obter chaves por tipo**

```typescript
// Obter apenas chaves secretas
const secretKeys = await KeysLocalService.getKeysByType(true);

// Obter apenas chaves não secretas
const publicKeys = await KeysLocalService.getKeysByType(false);
```

#### **UPDATE - Atualizar uma chave existente**

```typescript
// Atualizar todos os campos
await KeysLocalService.updateKeys('1234567890-abc', {
  key: ['github', 'personal', 'token'],
  value: 'ghp_new_token_xxxx',
  secret: false
});

// Atualizar apenas alguns campos
await KeysLocalService.updateKeys('1234567890-abc', {
  value: 'novo_valor'
});
```

#### **DELETE - Remover uma chave**

```typescript
await KeysLocalService.removeKeys('1234567890-abc');
```

#### **DELETE - Remover todas as chaves**

```typescript
await KeysLocalService.clearAllKeys();
```

### 3. Funcionalidades Extras

#### **Pesquisar chaves**

```typescript
// Busca em key e value
const results = await KeysLocalService.searchKeys('github');
console.log(results);
// Retorna todas as chaves que contenham "github" no array key ou no value
```

#### **Contar total de chaves**

```typescript
const total = await KeysLocalService.countKeys();
console.log(`Total de chaves: ${total}`);
```

## 🏗️ Estrutura do Banco de Dados

### Tabela: `keys`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | TEXT | Chave primária (UUID) |
| `key` | TEXT | Array de strings armazenado como JSON |
| `value` | TEXT | Valor da chave |
| `secret` | INTEGER | 0 = não secreto, 1 = secreto |

### Índices e Otimizações

- **WAL Mode**: Habilitado para melhor performance em operações concorrentes
- **PRIMARY KEY**: Índice automático na coluna `id`

## 📝 Modelo de Dados

```typescript
interface Keys {
  id?: string;
  key: string[];
  value: string;
  secret?: boolean;
}
```

## ⚠️ Tratamento de Erros

Todas as funções lançam erros em caso de falha. É recomendado usar try-catch:

```typescript
try {
  await KeysLocalService.saveKeys(newKey);
  console.log('Chave salva com sucesso!');
} catch (error) {
  console.error('Erro ao salvar chave:', error);
  // Tratar erro apropriadamente
}
```

## 🔐 Segurança

- ✅ Prepared statements para prevenir SQL injection
- ✅ Validação de tipos
- ✅ Tratamento de erros robusto

## 📊 Performance

### Dicas de Performance:

1. **Use prepared statements** para operações repetitivas
2. **Batch operations** quando possível
3. **WAL mode** já está habilitado automaticamente
4. **Índices** são criados automaticamente na chave primária

### Exemplo de operação em lote:

```typescript
const keys = [key1, key2, key3];

for (const key of keys) {
  await KeysLocalService.saveKeys(key);
}
```

## 🧪 Exemplo Completo

```typescript
import { KeysLocalService } from '@/services/KeysLocalService';

async function example() {
  try {
    // 1. Criar uma chave
    const newKey = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      key: ['api', 'openai'],
      value: 'sk-xxxxxxxxxx',
      secret: true
    };
    await KeysLocalService.saveKeys(newKey);

    // 2. Listar todas as chaves
    const allKeys = await KeysLocalService.getKeys();
    console.log('Todas as chaves:', allKeys);

    // 3. Buscar uma chave específica
    const foundKey = await KeysLocalService.getKeyById(newKey.id!);
    console.log('Chave encontrada:', foundKey);

    // 4. Atualizar a chave
    await KeysLocalService.updateKeys(newKey.id!, {
      value: 'sk-novo-token-xxxxxxxxxx'
    });

    // 5. Pesquisar
    const searchResults = await KeysLocalService.searchKeys('openai');
    console.log('Resultados da busca:', searchResults);

    // 6. Contar
    const total = await KeysLocalService.countKeys();
    console.log('Total de chaves:', total);

    // 7. Remover
    await KeysLocalService.removeKeys(newKey.id!);
    console.log('Chave removida!');

  } catch (error) {
    console.error('Erro:', error);
  }
}
```

## 📚 Referências

- [Expo SQLite Documentation](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [React Native Best Practices](https://reactnative.dev/docs/performance)
