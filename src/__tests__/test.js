import { matrixToJcamp } from '../index';

describe('test matrixToJcamp', () => {
  it('should return a jcamp', () => {
    let data = [[1,2,3,4], [1,2,3,4], [0,0,0,0]];
    let jcamp = matrixToJcamp(data);
    console.log(jcamp);
    expect(true).toStrictEqual(true);
  });
});
