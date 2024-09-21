export function submitForm(event: Event) {
  event.preventDefault();
  console.log("Form submitted");
  history.pushState({}, "", "/messenger");
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function validateLogin(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.value === "") {
    console.error("Login is required");
  }
}

export function validatePassword(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.value === "") {
    console.error("Password is required");
  }
}
