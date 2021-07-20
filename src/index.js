import { chunk } from 'lodash';

import { 
  repeat,
  add,
  σ0, σ1, Σ0, Σ1,
  choice,
  majority,
 } from './functions'

 import { squareRootOfPrimes, K } from './constants';

export function sha256(message) {
  const encoded = encode(message);
  const withPadding = addPadding(encoded);
  const blocks = sliceIntoblocks(withPadding, 512);
  let H1;
  blocks.forEach((b, index) => {
    const messageSchedules = makeMessageSchedules(b);
    const H0 = index === 0 ? squareRootOfPrimes : H1;
    H1 = compression(messageSchedules, H0);
  })
  return H1
    .map(word => parseInt(word, 2).toString(16))
    .join('')
}

export function encode(message) {
  return Array.from(new TextEncoder().encode(message))
  .map(n => n.toString(2).padStart(8, '0'))
  .join('')
}

export function addPadding(message) {
  const messageLength = message.length;
  const totalLength = multipleOf512Above(messageLength + 1 + 64);
  const zerosLength = totalLength - (messageLength + 1 + 64);
  const messageLengthInBinary = messageLength.toString(2).padStart(64, '0')
  return `${message}1${repeat(zerosLength, '0')}${messageLengthInBinary}`
}

function multipleOf512Above(n) {
  let k = 0;
  while (k * 512 < n) {
    k += 1;
  }
  return k * 512;
}

function sliceIntoblocks(message, size) {
  return chunk(message, size).map(c => c.join(''))
}

function makeMessageSchedules(block) {
  const result = sliceIntoblocks(block, 32)
  for (let i=16; i < 64; i++) {
    result[i] = add(
      σ1(result[i-2]),
      result[i-7],
      σ0(result[i-15]),
      result[i-16],
    );
  }
  return result
}

function compression(messageSchedules, H0 = squareRootOfPrimes) {
  let [a, b, c, d, e, f, g, h] = H0;

  for (let i=0; i<64; i++) {
    const T1 = add(Σ1(e), choice(e, f, g), h, K[i], messageSchedules[i]);
    const T2 = add(Σ0(a), majority(a, b, c));
    [a, b, c, d, e, f, g, h] = [add(T1, T2), a, b, c, add(d, T1), e, f, g];
  }
  [a, b, c, d, e, f, g, h] = [a, b, c, d, e, f, g, h]
    .map((v,index) => add(v, H0[index]))
  return [a, b, c, d, e, f, g, h];
}