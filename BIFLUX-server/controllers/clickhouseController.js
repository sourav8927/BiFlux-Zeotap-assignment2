const getClickhouseClient = require('../utils/clickhouseClient');

exports.testConnection = async (req, res) => {
  try {
    const { hostUrl, port, database, username, jwt } = req.body;

    console.log('Connecting to ClickHouse with:', { hostUrl, port, database, username });

    const client = getClickhouseClient({ hostUrl, port, database, username, jwt });

    const result = await client.query({
      query: 'SELECT 1',
      format: 'JSONEachRow',
    });
    console.log({ username, jwt })
    const rows = await result.json(); // this can throw if the response is not JSON!

    res.status(200).json({
      success: true,
      message: 'Connected successfully using JWT',
      data: rows,
    });
  } catch (error) {
    console.error('ClickHouse connection failed:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to connect to ClickHouse',
      error: error.message,
      full: error.response?.data || error.stack || error,
    });
  }
};
