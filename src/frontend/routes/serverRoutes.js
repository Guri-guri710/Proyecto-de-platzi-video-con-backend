import Home from '../Containers/Home';
import Login from '../Containers/Login';
import Register from '../Containers/Register';
import  NotFound from '../Containers/NotFound';
import Player from '../Containers/Player';

const routes = [
    {
        exact: true,
        path: '/',
        component: Home
    },
    {
        exact: true,
        path: '/login',
        component: Login
    },
    {
        exact: true,
        path: '/register',
        component: Register
    },
    {
        exact: true,
        path: '/player/:id',
        component: Player
    },
    {
        name: 'NotFound',
        component: NotFound
    },
];

export default routes;