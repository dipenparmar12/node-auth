import { Router, Request, Response } from 'express'

let route = Router()

route.get('/registration', (req: Request, res: Response) => {
	res.render('teacher_registration')
})

route.get('/index', (req: Request, res: Response) => {
	res.render('index')
})

export default route
