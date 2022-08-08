import rankingRepository from "../repositories/rankingRepository.js";

export async function getRanking(req, res) {
  try {
    const result = await rankingRepository.getRanking();
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
