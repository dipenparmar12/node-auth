import { getRepository } from 'typeorm'
import { Request, Response } from 'express-serve-static-core'
import * as jwt from 'jsonwebtoken'
import Teacher from '../entity/Teacher'

class AuthController {
	constructor() {}

	loginView = (req: Request, res: Response) => {
		res.render('teacher_login')
	}

	loginAuth = async (req: Request, res: Response) => {
		//Check if username and password are set
		let { username, password } = req.body
		if (!(username && password)) {
			res.status(400).send()
			return
		}

		const teacherRepository = getRepository(Teacher)
		let teacher: Teacher

		//Get teacher from database
		try {
			teacher = await teacherRepository.findOneOrFail({ where: { username } })
		} catch (error) {
			res.status(401).send()
		}

		//Check if encrypted password match
		if (!teacher.unencrypted_password_is_valid(password)) {
			res.status(401).send()
			return
		}

		//Sing JWT, valid for 1 hour
		const jwtToken = jwt.sign(
			{ id: teacher.id, username: teacher.username, roll: teacher.roll },
			process.env.JWT_TOKEN,
			{ expiresIn: process.env.JWT_TOKEN_EXPIRES_IN_HOUR }
		)

		///// Saving JwtToken in DB
		// teacher.is_logged = jwtToken
		// await teacherRepository.save(teacher)

		// res.setHeader('jwt', jwtToken)

		/// Creating Cookie for Auth
		res.cookie('jwt', jwtToken, {
			expires: new Date(Date.now() + process.env.JWT_TOKEN),
			// secure:true,
			httpOnly: true,
		})

		//Send the jwt in the response
		// res.send(teacher)
		res.redirect('/index')
	}

	logout = (req: Request, res: Response) => {
		res.clearCookie('jwt')
		res.clearCookie('user')
		res.render('teacher_login')
	}
}

export default new AuthController()
