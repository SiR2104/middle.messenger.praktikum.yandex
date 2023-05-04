// import engine
import '../public/style/document.scss';
import '../utils/Flopa';
import Router from '../utils/Router';

// import pages
import ErrorPage from '../pages/Error';
import IndexPage from '../pages/Index';
import AuthPage from '../pages/Auth';
import RegistrationPage from "../pages/Registration";
import ProfilePage from "../pages/Profile";
import ProfileEditPage from "../pages/ProfileEdit";
import ResetPassword from "../pages/ResetPassword";
import SelectChat from "../pages/SelectChat";
import Chat from "../pages/Chat";


// register routes
Router.register('/auth', AuthPage);
Router.register('/error/#code', ErrorPage);
Router.register('/reg', RegistrationPage);
Router.register('/profile', ProfilePage);
Router.register('/profile-edit', ProfileEditPage);
Router.register('/reset-password', ResetPassword);
Router.register('/select-chat', SelectChat);
Router.register('/chat', Chat);
Router.register('/', IndexPage);

if (!Router.navigate()) Router.navigate('/error/404');
