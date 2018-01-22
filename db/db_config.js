 console.log(process.env.NODE_ENV);
 const develop_config = {
   host: '127.0.0.1',
   user: 'root',
   password: 'root',
   database: 'test',
   port: 3306,
   multipleStatements: true //可以执行多条语句
 }
 const product_config = {
   host: '98.142.142.208',
   user: 'root',
   password: 'root',
   database: 'test',
   port: 3306,
   multipleStatements: true //可以执行多条语句
 }
 module.exports = {
   mysql: process.env.NODE_ENV === 'develop' ? develop_config : product_config
 };