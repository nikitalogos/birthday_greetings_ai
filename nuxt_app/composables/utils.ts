export function prevent_short_word_hangs(text) {
  return text
    .split(' ')
    .map((word) => [1,2,3].includes(word.length) ? word + ' ' : word + ' ')
    .join('')
}