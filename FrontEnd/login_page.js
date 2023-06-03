const submitButton = document.querySelector("form");

// sophie.bluel@test.tld
// S0phie

submitButton.addEventListener("submit", async (e) => {
  const form = e.currentTarget;
  const data = new FormData(form);
  const email = data.get("email");
  const password = data.get("password");

  let user = {
    email: email,
    password: password,
  };
  let response = await fetch("http://localhost:5678/api/users/login", {
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
    alert("Error " + responseHtml + " : Email ou Mot de passe Incorrect");
  } else {
    console.log(responseHtml);
    window.sessionStorage.setItem("token", token);
    window.sessionStorage.setItem("id", id);
    window.location.replace("./homepage_edit.html");
  }
});
