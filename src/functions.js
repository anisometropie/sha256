export function repeat(length, char) {
  return Array.from({ length }).map(() => char).join('')
}

function parseBin(word) {
  return parseInt(word, 2);
}

export function shiftRight(word, step = 1) {
  return `${repeat(step, '0')}${word.slice(0, word.length - step)}`
}

export function rotationRight(word, step = 1) {
  return `${word.slice(word.length - step, word.length)}${word.slice(0, word.length - step)}`
}

export function xor(...words) {
  return words.reduce((acc, word) => {
    return Array.from(acc).map((c, index) => c ^ word[index]).join('')
  })
}

export function add(...words) {
  return words.reduce((acc, n) => {
    return ((parseBin(acc) + parseBin(n)) % (2 ** acc.length))
      .toString(2)
      .padStart(acc.length, '0')
  })
}

export function σ0(word) {
  return xor(
    rotationRight(word, 7),
    rotationRight(word, 18),
    shiftRight(word, 3),
  );
}

export function σ1(word) {
  return xor(
    rotationRight(word, 17),
    rotationRight(word, 19),
    shiftRight(word, 10),
  );
}

export function Σ0(word) {
  return xor(
    rotationRight(word, 2),
    rotationRight(word, 13),
    rotationRight(word, 22),
  );
}

export function Σ1(word) {
  return xor(
    rotationRight(word, 6),
    rotationRight(word, 11),
    rotationRight(word, 25),
  );
}

export function choice(word1, word2, word3) {
  return Array.from(word1).map((c, index) => {
    if (c === '1') {
      return word2[index]
    } else {
      return word3[index]
    }
  }).join('')
}

export function majority(word1, word2, word3) {
  const result = [];
  for (let i=0; i<word1.length; i++) {
    const values = [word1[i], word2[i], word3[i]];
    const ones = values.filter(v => v === '1');
    const zeros = values.filter(v => v === '0');
    result.push(ones.length > zeros.length ? '1' : '0');
  }
  return result.join('');
}