import { QueryClientProvider, useQuery, QueryClient } from '@tanstack/react-query';
import { ReactElement } from 'react';

const queryClient = new QueryClient();

async function fetchAPI(key: string) {
  const response = await fetch(key);
  return await response.json();
}

export default function StatusPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </QueryClientProvider>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useQuery({
    queryKey: ['status'],
    queryFn: () => fetchAPI('api/v1/status'),
    refetchInterval: 20000,
  });

  let updatedAtText = 'Carregando...';
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString('pt-BR');
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useQuery({
    queryKey: ['status'],
    queryFn: () => fetchAPI('api/v1/status'),
    staleTime: 20000, // time to stay in cache
  });

  let databaseStatusInformation: ReactElement | string = 'Carregando...';
  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>Conexões abertas: {data.dependencies.database.opened_connections}</div>
        <div>Conexões máximas: {data.dependencies.database.max_connections}</div>
      </>
    );
  }

  return (
    <>
      <h2>Database</h2>
      <div>{databaseStatusInformation}</div>
    </>
  );
}
