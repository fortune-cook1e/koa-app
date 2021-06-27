import mysqlConfig from '../config/mysql'
import * as mysql from 'mysql'

const pool = mysql.createPool({
  host: mysqlConfig.host,
  user: mysqlConfig.username,
  password: mysqlConfig.password,
  database: mysqlConfig.database
})

export default pool
