import { errorConnexion } from "./functions/errorConnexion.js";
const formLogin = document.querySelector("form");

// sophie.bluel@test.tld
// S0phie

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const data = new FormData(form);
  const email = data.get("email");
  const password = data.get("password");

  let user = {
    email: email,
    password: password,
  };
  let response = await fetch("./api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });

  const responseBody = await response.json();
  const token = responseBody.token;
  const id = responseBody.userId;
  const responseHtml = response.status;

  if (responseHtml != 200) {
    e.preventDefault();
  } else {
    window.sessionStorage.setItem("token", token);
    window.sessionStorage.setItem("id", id);
    window.location.replace("./homepage_edit.html");
  }

  errorConnexion(responseHtml, email, password);
});
