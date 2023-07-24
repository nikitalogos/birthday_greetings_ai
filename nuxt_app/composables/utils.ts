export function prevent_short_word_hangs(text) {
  return text
    .split(" ")
    .map((word) => ([1, 2, 3].includes(word.length) ? word + " " : word + " "))
    .join("");
}

export function format_date(timestamp_ms) {
  const date = new Date(timestamp_ms);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function format_datetime(timestamp_ms) {
  const date = new Date(timestamp_ms);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
