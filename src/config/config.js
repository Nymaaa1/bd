const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVars = process.env;

module.exports = {
  env: "production",
  port: envVars.PORT,
  mysql: {
    port: envVars.MYSQL_PORT,
    name: envVars.MYSQL_NAME,
    password: envVars.MYSQL_PASSWORD,
    database: envVars.MYSQL_DATABASE
  }
};
