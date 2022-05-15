import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import StudentsRoute from '@/routes/students.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new StudentsRoute(), new AuthRoute()]);

app.listen();
