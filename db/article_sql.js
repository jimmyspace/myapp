var articleSql = {
  insert: 'INSERT INTO articles(title,user_id,content,type,ctime,utime,content_img,favourite) VALUES(?,?,?,?,?,?,?,?)',
  queryArticle: 'SELECT * FROM articles limit ?, ?',
  queryArticleByType: 'SELECT * FROM articles WHERE type = ? limit ?, ?',
  updateFavorite: 'UPDATE articles SET favourite = favourite + 1 WHERE id = ?',
  queryArticleById: 'SELECT * FROM articles WHERE id = ?',
  queryArticleByUserId: 'SELECT * FROM articles WHERE user_id = ?'
};
module.exports = articleSql;