import userRepository from "../repositories/userRepository.js";
import sessionRepository from "../repositories/sessionRepository.js";

export async function validateToken(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Token não encontrado");
  }

  try {
    const { rows: sessions } = await sessionRepository.getToken(token);
    const [session] = sessions;
    if (!session) {
      return res.status(401).send("Sessão não encontrada");
    }

    const { rows: users } = await userRepository.getUserId(session.userId);

    const [user] = users;
    if (!user) {
      return res.status(401).send("Usuário não encontrado");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
