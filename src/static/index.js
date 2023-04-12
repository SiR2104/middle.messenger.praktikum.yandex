'use strict';
//import engine
import '../public/style/document.scss';
import '../utils/Flopa';
import Router from '../utils/Router';

//import pages
import Error from '../pages/Error';
import Index from '../pages/Index';
import Auth from '../pages/Auth';
import Registration from '../pages/Registration';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import ResetPassword from '../pages/ResetPassword';
import SelectChat from '../pages/SelectChat';
import Chat from '../pages/Chat';


//register routes
Router.register( '/error/#code', Error);
Router.register( '/auth', Auth);
Router.register( '/reg', Registration);
Router.register( '/profile', Profile);
Router.register( '/profile-edit', ProfileEdit);
Router.register( '/reset-password', ResetPassword);
Router.register( '/select-chat', SelectChat);
Router.register( '/chat', Chat);
Router.register( '/', Index);

if (!Router.navigate()) Router.navigate('/error/404');

