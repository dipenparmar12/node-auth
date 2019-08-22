import { Router } from 'express'
import teacherController from './../controllers/teacherController'

let router = Router()

router
	.get('/', teacherController.getAll)

	.post('/', teacherController.create)
	.get('/:id', teacherController.getOneById)
	.patch('/:id', teacherController.update)
	.delete('/:id', teacherController.destroy)

// router.post('/login', async (req: Request, res: Response) => {
// 	res.send(req.body)
// })

// router.get('/', async (req: Request, res: Response) => {
// 	res.send(await CrudController.get(Teacher))
// })

// router
// 	.get('/', async (req: Request, res: Response) => {
// 		const teacherRepository = getRepository(Teacher)
// 		res.send(await teacherRepository.find())
// 	})
// 	.get('/:id', (req: Request, res: Response) => {
// 		res.send('Teacher ID: ' + req.params.id)
// 	})

export default router

// class TeacherRoutes {
// 	public routes(app): void {
// 		app.route('/').get(async (req: Request, res: Response) => {
// 			const tRepo = getRepository(Teacher);
// 			const teachers = await tRepo.find();
// 			// console.log(teachers);
// 			res.send(teachers);
// 		});
// 	}
// }
// export default new TeacherRoutes();
// exports default teacherRouter

// router
//     .get('/', controller.getAll)

//     .post('/', controller.create)
//     .get('/:id', controller.findByid)
//     .patch('/:id', controller.update)
//     .delete('/:id', controller.destroy)
