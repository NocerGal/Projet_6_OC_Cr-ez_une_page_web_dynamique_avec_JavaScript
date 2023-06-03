const emailToLogin = document.querySelector('form input[type="email"]').value;
const passwordToLogin = document.querySelector(
  'form input[type="password'
).value;
const submitButton = document.querySelector('form input[type="submit"]');

// sophie.bluel@test.tld
// S0phie

  let user = {
    email: "sophie.bluel@test.tld",
    password: "S0phie",
  };

  let response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });
  let result = await response.json();
  let token = result.token;
  console.log(token);
  console.log(result.id)

submitButton.addEventListener("click", handleClick);
