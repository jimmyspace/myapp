 console.log(process.env.NODE_ENV);
 module.exports = {
   mysql: {
     host: '127.0.0.1',
     user: 'root',
     password: 'root',
     database: 'test',
     port: 3306,
     multipleStatements: true //可以执行多条语句
   }
 };