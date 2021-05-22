export function setLocalStorage(key, val) {
  window.localStorage.setItem(key, JSON.stringify(val));
}

export function getFromLocalStorage(key, defaultValue) {
  let value;
  try {
    value = JSON.parse(
      window.localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
  } catch (e) {
    console.error(e);
    value = defaultValue;
  }
  return value;
}
