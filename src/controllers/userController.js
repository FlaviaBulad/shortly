import urlsRepository from "../repositories/urlsRepository.js";

export async function getUserById(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  if (id !== user.id) {
    return res.sendStatus(401);
  }

  try {
    const visitResult = await urlsRepository.getVisitByUser(id);
    const [visitors] = visitResult.rows;

    const urlsResult = await urlsRepository.getUserUrl(id);
    const userUrls = urlsResult.rows;

    res.send({
      id: user.id,
      name: user.name,
      visitors: visitors.sum || 0,
      shortUrl: userUrls,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
