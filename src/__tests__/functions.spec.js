import { 
  shiftRight,
  rotationRight,
  xor,
  add,
  choice,
  majority,
} from '../functions';

describe('shiftRight', () => {
  describe('shift 1 by defaut', () => {
    it('should shift bits to the right', () => {
      expect(shiftRight('1110')).toEqual('0111')
      expect(shiftRight('0111')).toEqual('0011')
      expect(shiftRight('0011')).toEqual('0001')
    })
  })
  describe('shift 2', () => {
    it('should shift bits to the right by 2', () => {
      expect(shiftRight('1110', 2)).toEqual('0011')
    })
  })
})

describe('rotationRight', () => {
  describe('shift 1 by defaut', () => {
    it('should rotate bits to the right', () => {
      expect(rotationRight('1110')).toEqual('0111')
      expect(rotationRight('0111')).toEqual('1011')
      expect(rotationRight('1011')).toEqual('1101')
    })
  })
  describe('shift 2', () => {
    it('should shift bits to the right by 2', () => {
      expect(rotationRight('1110', 2)).toEqual('1011')
      expect(rotationRight('1110', 3)).toEqual('1101')
      expect(rotationRight('100000', 3)).toEqual('000100')
    })
  })
})

describe('xor', () => {
  it('should xor', () => {
    expect(xor(
      '1100',
      '1010',
      )).toEqual('0110')
    expect(xor(
      '110011',
      '101011',
      )).toEqual('011000')
    expect(xor(
      '1100',
      '1010',
      '0011',
      )).toEqual('0101')
    expect(xor(
      '11111110000000000000000011000001',
      '01111111100000000000000000110000',
      )).toEqual('10000001100000000000000011110001')
  })
})

describe('add', () => {
  it('should add 2 numbers', () => {
    expect(add(
      '0011',
      '0001',
    )).toEqual('0100');
    expect(add(
      '0011',
      '0011',
    )).toEqual('0110');
    expect(add(
      '0011',
      '0100',
    )).toEqual('0111');
    expect(add(
      '1111',
      '0001',
    )).toEqual('0000');
    expect(add(
      '1111',
      '0010',
    )).toEqual('0001');
  })
  it('should add 3 numbers', () => {
    expect(add(
      '0001',
      '0001',
      '0001'
    )).toEqual('0011');
  })
})

describe('choice', () => {
  it('', () => {
    expect(choice(
      '1100',
      '1001',
      '0110',
    )).toEqual('1010');
  })
})
describe('majority', () => {
  it('should return the majority', () => {
    expect(majority(
      '11000',
      '10000',
      '11101',
    )).toEqual('11000');
  })
})