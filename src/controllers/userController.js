import urlsRepository from "../repositories/urlsRepository.js";

export async function getUserById(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  if (id !== user.id) {
    return res.sendStatus(401);
  }

  try {
    const visitResult = await urlsRepository.getVisitCountByUser(id);
    const [visitCount] = visitResult.rows;

    const urlsResult = await urlsRepository.getURLSbyUser(id);
    const userUrls = urlsResult.rows;

    res.send({
      id: user.id,
      name: user.name,
      visitCount: visitCount.sum || 0,
      shortenedUrls: userUrls,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
