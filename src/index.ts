import ChatPage from "./pages/chat-page";
import LoginPage from "./pages/login-page";
import ProfilePage from "./pages/profile-page";
import ChangeDataPage from "./pages/profile-page/chande-data-page";
import ChangePasswordPage from "./pages/profile-page/password-page";
import RegisterPage from "./pages/register-page";
import ErrorPage from "./pages/error-404";
import ErrorPage500 from "./pages/error-500";
import Router from "./tools/Router";

export const appRouter = new Router("app");

document.addEventListener("DOMContentLoaded", () => {
  appRouter
    .use('/', LoginPage)
    // .use('/login', LoginPage)
    .use('/sign-up', RegisterPage)
    .use('/change-password', ChangePasswordPage)
    .use('/messenger', ChatPage)
    .use('/profile', ProfilePage)
    .use("/settings", ChangeDataPage)
    .use("/error404", ErrorPage)
    .use("/error500", ErrorPage500)
    .start();
});
