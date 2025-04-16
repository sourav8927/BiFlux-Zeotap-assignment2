const { createClient } = require('@clickhouse/client');

const getClickhouseClient = ({ hostUrl, port, database, username, jwt }) => {
  const client = createClient({
    hostUrl: `${hostUrl}:${port}`,
    database,
    // Don't pass username/password fields here; set them in headers
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'X-ClickHouse-User': username, // <- required when using JWT
    },
  });

  return client;
};

module.exports = getClickhouseClient;
