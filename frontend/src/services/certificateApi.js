import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "http://localhost:5001/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5001/api";

export function uploadCertificate(formData) {
  return api.post(
    "/certificate/upload-certificate",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export function verifyCertificate(formData) {
  return api.post(
    "/certificate/verify-certificate",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export function getCertificate(certificateId) {
  return api.get(
    `/certificate/${certificateId}`
  );
}

export function login(credentials) {
  return api.post(
    "/auth/login",
    credentials
  );
}

export function signup(payload) {
  return api.post(
    "/auth/signup",
    payload
  );
}

export function getEventHistory() {
  return api.get("/events/history");
}
