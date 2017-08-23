var userSql = {
  insert: 'INSERT INTO users(email,password,nickname,headimg,ctime,utime) VALUES(?,?,?,?,?,?)',
  queryAll: 'SELECT * FROM users',
  getUserByEmail: 'SELECT * FROM users WHERE email = ?',
  update: 'UPDATE users SET password = ?, utime = ? WHERE email = ?'
};
module.exports = userSql;