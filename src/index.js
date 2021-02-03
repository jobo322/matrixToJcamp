import { writeFileSync } from 'fs';
import { join, resolve } from 'path';

import { NMR2D } from 'spectra-data';

/**
 * Generate a jcamp from a matrix
 * @param {array<array>} data - 2d array of data.
 * @param {object} [options={}]
 * @param {boolean} [options.writeFile=false] - if true the string will be write in a file.writeFile
 * @param {string} [options.path='./'] - path where the jcamp file will be created.
 * @param {string} [options.name='jcamp.jdx'] - name of the jcamp file.
 * @param {number} [options.firstX=0] - first value of x axis.
 * @param {number} [options.lastX=0] - last value of x axis.
 * @param {number} [options.firstY=0] - first value of y axis.
 * @param {number} [options.lastY=0] - last value of y axis.
 */
export function matrixToJcamp(data, options = {}) {
  let { writeFile } = options;
  let spectrum = NMR2D.fromMatrix(data, options);
  spectrum.ntuples = {
    units: { x: 'PPM', y: 'PPM', z: 'intensity' },
  };

  let jcamp = spectrum.toJcamp({ type: 'NTUPLES' });

  if (writeFile) {
    let { path = './', filename = 'jcamp.jdx' } = options;
    writeFileSync(resolve(join(path, filename)), jcamp);
  }

  return jcamp;
}
