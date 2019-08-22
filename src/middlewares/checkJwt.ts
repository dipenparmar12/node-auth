import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

/////  if 3rd param is next() & jwt cookie token is NOT valid then just redirected to LoginPage
export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
	_checkJwt(req, res, next)
}

/////  if 3rd param is 'redirect' & if jwt cookie token is valid then just redirected to home page
export const isLogged = async (req: Request, res: Response, next: NextFunction) => {
	// const redirectMethod =
	_checkJwt(req, res, 'redirect')
}

//////// Method  created Code Reusablity of ChecKJWT & isLogged both method using 95% same Code
const _checkJwt = async (req: Request, res: Response, next: any) => {
	//Get the jwt token from the head
	// const token = <string>req.headers['auth']
	let jwtCookieToken = req.cookies.jwt
	let jwtPayload
	// console.log(jwtCookieToken)

	//Try to validate the token and get data
	try {
		jwtPayload = await (<any>jwt.verify(jwtCookieToken, process.env.JWT_TOKEN))
		res.locals.jwtPayload = jwtPayload
	} catch (err) {
		// If token is not valid, respond with 401 (unauthorized)
		// Throw an error just in case anything goes wrong with verification
		res.status(401).render('teacher_login', { error: '401 (unauthorized), Please login first' })
		throw new Error(err)
		return
	}

	// The token is valid for 1 hour
	// We want to send a new token on every request
	const { id, username, roll } = jwtPayload
	//Sing JWT, valid for 1 hour
	const jwtToken = jwt.sign({ id, username, roll }, process.env.JWT_TOKEN, {
		expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR,
	})

	// // res.setHeader('jwt', jwtToken)

	/// creating Cookie in Client machine for Auth
	res.cookie('jwt', jwtToken, {
		expires: new Date(Date.now() + process.env.JWT_TOKEN),
		// secure:true,
		httpOnly: true,
	})
	/// creating Cookie of Logged user Details in claint machine
	res.cookie('user', jwtPayload, {
		expires: new Date(Date.now() + process.env.JWT_TOKEN),
	})

	//Call the next middleware or controller
	if (next == 'redirect') {
		res.redirect('index')
	} else {
		next()
	}
}
