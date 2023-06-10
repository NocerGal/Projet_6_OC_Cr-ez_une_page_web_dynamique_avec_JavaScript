export function errorConnexion(responseHtml, email, password) {
  const spanErrorEmailElement = document.createElement("span");
  const spanErrorPasswordElement = document.createElement("span");
  const spanErrorHtmlResponse = document.createElement("span");

  if (document.querySelectorAll("#login-form span").length > null) {
    document.querySelectorAll("form span").forEach((span) => span.remove());
  }

  if (email === "" && password === "") {
    spanErrorEmailElement.innerText = "Entrez votre adresse email";
    spanErrorPasswordElement.innerText = "Entrez votre mot de passe";
    document.querySelector("#login-form #email").after(spanErrorEmailElement);
    document.querySelector("#login-form #pass").after(spanErrorPasswordElement);
  } else {
    if (email === "") {
      spanErrorEmailElement.innerText = "Entrez votre adresse email";
      document.querySelector("#login-form #email").after(spanErrorEmailElement);
    }
    if (password === "") {
      spanErrorPasswordElement.innerText = "Entrez votre mot de passe";
      document
        .querySelector("#login-form #pass")
        .after(spanErrorPasswordElement);
    }
    if (email != "" && password != "" && responseHtml != 200) {
      spanErrorHtmlResponse.innerText =
        "Adresse email ou mot de passe incorrecte";
      spanErrorHtmlResponse.classList = "html-error";
      document.querySelector("#login-form #pass").after(spanErrorHtmlResponse);
    }
  }
}
