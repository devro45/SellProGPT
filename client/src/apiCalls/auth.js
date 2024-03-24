import API from "./index";

export const signup = ({ name, email, password }) => {
  console.log(user);
  return fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: `${name}`,
      email: `${email}`,
      password: `${password}`,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = ({ email, password }) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: `${email}`, password: `${password}` }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
