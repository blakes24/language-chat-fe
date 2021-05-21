export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_BASE_URL
    : "http://localhost:3001";

export const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
export const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
