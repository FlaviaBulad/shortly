import urlsRepository from "../../repositories/urlsRepository.js";

import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;

  const shortUrlSize = 8;

  const shortUrl = nanoid(shortUrlSize);

  try {
    await urlsRepository.createShortUrl(url, shortUrl, id);
    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserUrl(req, res) {
  const { id } = req.params;

  try {
    const result = await urlsRepository.getUserUrl(id);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [url] = result.rows;

    res.status(200).send(url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const result = await urlsRepository.getUrlId(id);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [url] = result.rows;

    if (url.userId !== user.id) {
      return res.sendStatus(401);
    }

    await urlsRepository.deleteUrl(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function openUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const result = await urlsRepository.getShortUrl(shortUrl);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [url] = result.rows;

    await urlsRepository.setVisitors(url.id);

    res.redirect(url.url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
