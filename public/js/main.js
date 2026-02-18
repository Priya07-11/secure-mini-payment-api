// REGISTER
async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const response = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  document.getElementById("message").innerText = data.message;
}


// LOGIN
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("message").innerText = data.message;
  }
}


// MAKE PAYMENT
async function makePayment() {
  const amount = Number(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;
  const merchant_id = document.getElementById("merchant").value;

  const token = localStorage.getItem("token");

  const response = await fetch("/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({ amount, currency, merchant_id })
  });

  const data = await response.json();
  alert(data.message);
}


// LOAD TRANSACTIONS
async function loadTransactions() {
  const token = localStorage.getItem("token");

  const response = await fetch("/transactions", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await response.json();

  const list = document.getElementById("transactions");
  list.innerHTML = "";

  data.forEach(tx => {
    const li = document.createElement("li");
    li.innerText = `${tx.amount} ${tx.currency} - ${tx.status}`;
    list.appendChild(li);
  });
}


// LOGOUT
function logout() {
  localStorage.removeItem("token");
  window.location.href = "auth.html";
}
