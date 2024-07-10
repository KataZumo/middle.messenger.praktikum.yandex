import ChatPage from "./pages/chat-page";
import LoginPage from "./pages/login-page";
import ProfilePage from "./pages/profile-page";
import ChangeDataPage from "./pages/profile-page/chande-data-page";
import ChangePasswordPage from "./pages/profile-page/password-page";
import RegisterPage from "./pages/register-page";
import ErrorPage from "./pages/error-404";
import ErrorPage500 from "./pages/error-500";

type PageConstructor = new (props: any) => any;

const pages: Record<string, PageConstructor> = {
  login: LoginPage,
  register: RegisterPage,
  chat: ChatPage,
  profile: ProfilePage,
  "change-data": ChangeDataPage,
  "change-password": ChangePasswordPage,
  error404: ErrorPage,
  error500: ErrorPage500,
};

function navigate(page: string) {
  const PageClass = pages[page];
  if (!PageClass) {
    console.error(`Страница ${page} не найдена`);
    return;
  }

  const pageInstance = new PageClass({});
  const container = document.getElementById("app")!;
  container.innerHTML = "";
  const content = pageInstance.getContent();

  if (content) {
    container.appendChild(content);
  } else {
    console.error("Rendered content is null or undefined");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.substring(1) || "login";
  navigate(path);
});

document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute("page");
  if (page) {
    history.pushState({}, "", `/${page}`);
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

window.addEventListener("popstate", () => {
  const path = window.location.pathname.substring(1) || "login";
  navigate(path);
});
