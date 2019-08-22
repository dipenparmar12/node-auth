import 'reflect-metadata'
import * as path from 'path'

import * as dotenv from 'dotenv'
import * as helmet from 'helmet'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

import { createConnection, Connection } from 'typeorm'
import Teacher from './entity/Teacher'

import appRoutes from './routes/indexRoutes'
import teacherRoutes from './routes/teacherRoutes'
import authController from './controllers/authController'
import { checkJwt, isLogged } from './middlewares/checkJwt'

dotenv.config()

class MyApplication {
	public _express: express.Application = express()
	public port: number = parseInt(process.env.PORT)
	db: Connection

	constructor() {
		this.appMiddlewares()
		this.appRoutes()
		this.conn()
		this._express.listen(this.port, () => {
			console.log(process.env.APP_NAME + ', Started At:' + this.port)
		})
	}

	/**
	 * Express Midallwares & other configration ( Cookies, static path ..etc )
	 */
	private appMiddlewares(): void {
		this._express.use(helmet())
		this._express.use(bodyParser.json())
		this._express.use(bodyParser.urlencoded({ extended: false }))
		this._express.use(cookieParser())
		this._express.use('/', express.static(path.join(__dirname, '../public')))
		this._express.set('views', path.join(__dirname, 'views'))
		this._express.set('view engine', 'pug')
	}

	/**
	 * Set All Application Routes from External Class's
	 */
	private appRoutes(): void {
		this._express.post('/login', authController.loginAuth)
		this._express.get('/logout', authController.logout)
		this._express.get('/login', isLogged, authController.loginView)
		this._express.use('/api/teachers', checkJwt, teacherRoutes)
		this._express.use(checkJwt, appRoutes)
		this.errorRoutes()
	}

	private errorRoutes() {
		////.... IF Request Route not Found.. THRO ERROR
		this._express.use((req, res, next) => {
			res.status(404).render('errors/404.pug', { url: req.url })
		})
		this._express.use((err, req, res, next) => {
			res.status(500).send(err.stack)
		})
	}

	public test(): string {
		return ' testString(): '
	}

	/**
	 * Database Connection and Configration
	 */
	public async conn() {
		this.db = await createConnection({
			type: 'mysql',
			host: process.env.DB_HOST,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			entities: [Teacher, Student, Attendance],
			synchronize: true,
		})

		// const tRepo = getRepository(Teacher);
		// const teachers = await tRepo.find();
		// console.log(teachers);
	}
}

export default new MyApplication()
