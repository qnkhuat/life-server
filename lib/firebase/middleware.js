import { auth } from "./server";

// Run at server side
export default async function isAuthenticated(req , res , next ) {
  const { authorization } = req.headers

  if (!authorization)
    return res.status(401).send({ message: 'Unauthorized' });

  if (!authorization.startsWith('Bearer'))
    return res.status(401).send({ message: 'Unauthorized' });

  const split = authorization.split('Bearer ')
  if (split.length !== 2)
    return res.status(401).send({ message: 'Unauthorized' });

  const token = split[1]

  try {
    const decodedToken = await auth.verifyIdToken(token);
    res.locals = { ...res.locals, uid: decodedToken.uid, role: decodedToken.role, email: decodedToken.email }
    return next();
  }
  catch (err) {
    console.error(`${err.code} -  ${err.message}`)
    return res.status(401).send({ message: 'Unauthorized' });
  }
}


