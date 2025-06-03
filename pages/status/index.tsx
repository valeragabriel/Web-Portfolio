import { useQuery } from '@tanstack/react-query';
import { ReactElement } from 'react';

async function fetchAPI({ queryKey }) {
  const [key] = queryKey;
  const response = await fetch(key);
  return await response.json();
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useQuery({
    queryKey: ['/api/v1/status'],
    queryFn: fetchAPI,
    refetchInterval: 2000, 
  });

  let updatedAtText = 'Carregando...';
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString('pt-BR');
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useQuery({
    queryKey: ['/api/v1/status'],
    queryFn: fetchAPI,
    refetchInterval: 2000,
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
