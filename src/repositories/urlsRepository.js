import connection from "../database/postgres.js";

async function createShortUrl(url, shortUrl, id) {
  return connection.query(
    `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
    [url, shortUrl, id]
  );
}

async function getShortUrl(shortUrl) {
  return connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [
    shortUrl,
  ]);
}

async function getUrlId(id) {
  return connection.query(`SELECT * FROM urls WHERE id = $1`, [id]);
}

async function setVisitors(urlId) {
  return connection.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1`,

    [urlId]
  );
}

async function deleteUrl(id) {
  return connection.query(`DELETE FROM urls WHERE id = $1`, [id]);
}

async function getUserUrl(userId) {
  return connection.query(`SELECT * FROM urls WHERE urls."userId" = $1`, [
    userId,
  ]);
}

async function getVisitByUser(userId) {
  return connection.query(
    `SELECT SUM(u."visitCount") FROM urls WHERE u."userId" = $1`,

    [userId]
  );
}

const urlsRepository = {
  createShortUrl,
  getShortUrl,
  getUrlId,
  setVisitors,
  deleteUrl,
  getUserUrl,
  getVisitByUser,
};

export default urlsRepository;
