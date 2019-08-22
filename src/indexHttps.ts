import { default as expressApp } from './index';
import * as https from 'https';
import * as fs from 'fs';

const httpsOptions = {
	key: fs.readFileSync('./config/key.pem'),
	cert: fs.readFileSync('./config/cert.pem'),
};

https.createServer(httpsOptions, expressApp).listen(process.env.PORT, () => {
	console.log('Express server listening on port ' + process.env.PORT);
});
