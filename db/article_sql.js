var articleSql = {
  insert: 'INSERT INFO articles(title,user_id,content,type,ctime,utime,content_img,favourite) VALUES(?,?,?,?,?,?,?,?)',
};
module.exports = articleSql;