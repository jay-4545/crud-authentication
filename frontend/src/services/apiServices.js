const BASE_URL = "http://localhost:5000";

// category

export async function getAllCategories() {
  const response = await fetch(`${BASE_URL}/category`);
  const data = await response.json();
  return data;
}

export async function getCategory(id) {
  const response = await fetch(`${BASE_URL}/category/${id}`);
  const data = await response.json();
  return data;
}

export async function addCategory(body) {
  const response = await fetch(`${BASE_URL}/category`, {
    method: "POST",
    body: body,
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function updateCategory(id, body) {
  const response = await fetch(`${BASE_URL}/category/${id}`, {
    method: "PATCH",
    body: body,
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function deleteCategory(id) {
  const response = await fetch(`${BASE_URL}/category/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
}

// user

export async function signUp(body) {
  const response = await fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    body: body,
  });
  const data = await response.json();
  return data;
}

export async function signIn(body) {
  const response = await fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    body: body,
  });
  const data = response.json();
  return data;
}

export async function verifyEmail(userId, token) {
  const response = await fetch(
    `${BASE_URL}/users/verifyEmail?token=${token}&userId=${userId}`
  );
  const data = await response.json();
  return data;
}

export async function signOut() {
  const response = await fetch(`${BASE_URL}/users/signout`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function checkUser() {
  const response = await fetch(`${BASE_URL}/users/checkUser`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data;
}
