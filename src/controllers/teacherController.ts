import { Request, Response } from 'express'
import Teacher from '../entity/Teacher'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

class TeacherController {
	getAll = async (req: Request, res: Response) => {
		//Get data from database
		const databaseRepository = getRepository(Teacher)
		const selectAttributes: any = { select: ['id', 'name', 'username', 'roll'] }
		const data = await databaseRepository.find(selectAttributes)

		//Send the data object
		res.status(200).json({ status: 'success', message: 'Data Found', error: false, data: data })
	}

	getOneById = async (req: Request, res: Response) => {
		//Get the ID from the url
		const uuid: string = req.params.id

		//Get the data from database
		const databaseRepository = getRepository(Teacher)

		try {
			const data = await databaseRepository.findOneOrFail(uuid)
			res.status(200).json({ status: 'success', message: 'data found (findById)', error: false, data: data })
		} catch (error) {
			res.status(404).send(error)
		}
	}

	create = async (req: Request, res: Response) => {
		//Get parameters from the body
		let { username, password, name, email, subject, roll } = req.body

		let data = new Teacher()
		data.username = username
		data.password = password
		data.name = name
		data.email = email
		data.subject = subject
		data.roll = roll

		//Validade if the parameters are ok
		const errors = await validate(data)
		if (errors.length > 0) {
			res.status(400).send(errors)
			return
		}

		//Hash the password, to securely store on DB
		data.hashPassword()

		//Try to save. If fails, the teachername is already in use
		const databaseRepository = getRepository(Teacher)
		try {
			await databaseRepository.save(data)
		} catch (e) {
			res.status(200).json({ status: 'fail', message: e.message, error: e, data: false })
			return
		}

		//If all ok, send 201 response
		res.status(201).send('Teacher created')
	}

	update = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id
		let data = new Teacher()

		//Try to find data on database
		const databaseRepository = getRepository(Teacher)
		try {
			data = await databaseRepository.findOneOrFail(id)
		} catch (error) {
			//If not found, send a 404 response
			res.status(404).send('Teacher not found')
			return
		}

		//Validate the new values on model
		let { username, password, name, email, subject, roll } = req.body

		data.username = username
		data.password = password
		data.name = name
		data.email = email
		data.subject = subject
		data.roll = roll

		const errors = await validate(data)
		if (errors.length > 0) {
			res.status(400).send(errors)
			return
		}

		//Try to safe, if fails, that means teachername already in use
		try {
			await databaseRepository.save(data)
		} catch (e) {
			res.status(409).send('teachername already in use')
			return
		}
		//After all send a 204 (no content, but accepted) response
		res.status(204).send()
	}

	destroy = async (req: Request, res: Response) => {
		//Get the ID from the url
		const id = req.params.id

		const databaseRepository = getRepository(Teacher)
		let data: Teacher
		try {
			data = await databaseRepository.findOneOrFail(id)
		} catch (error) {
			res.status(404).send('Teacher not found')
			return
		}
		databaseRepository.delete(id)

		//After all send a 204 (no content, but accepted) response
		res.status(204).send()
	}
}

export default new TeacherController()
