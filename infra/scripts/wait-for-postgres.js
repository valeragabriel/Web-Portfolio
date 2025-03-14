// eslint-disable-next-line @typescript-eslint/no-require-imports
const { exec } = require('node:child_process');

function checkPostgres() {
  exec('docker exec postgres-webPortfolio pg_isready --host localhost', handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search('accepting connections') === -1) {
      process.stdout.write('.');
      checkPostgres();
      return;
    }

    console.log('\n🟢 Postgres está pronto e aceitando conexões!\n');
  }
}

process.stdout.write('\n\n🔴 Aguardando Postgres aceitar conexões');
checkPostgres();
