function auth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({message: "Не авторизован"})
  }
  next()
}
export default auth