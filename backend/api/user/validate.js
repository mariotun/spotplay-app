export const checkUser = (req, res, next) => {
  console.log('soy un middleware')
  next()
}