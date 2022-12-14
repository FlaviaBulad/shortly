import connection from "../database/postgres.js";

async function getRanking() {
  return connection.query(`

  SELECT usr.id, usr.name, COUNT(u.id) as "linksCount", SUM(u."visitCount") as "visitCount"
  FROM urls u
  JOIN users usr ON u."userId" = usr.id
  GROUP BY usr.id
  ORDER BY "visitCount" DESC
  LIMIT 10
  `);
}

const rankingRepository = { getRanking };

export default rankingRepository;
