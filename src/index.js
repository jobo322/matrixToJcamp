import { NMR2D } from 'spectra-data';
import { writeFileSync } from 'fs';
import { join, resolve } from 'path';

/**
 * Returns a very important number
 * @return {number}
 */
export function matrixToJcamp(data, options = {}) {
  let { writeFile } = options;
  let spectrum = NMR2D.fromMatrix(data, options);
  let jcamp = spectrum.toJcamp({ type: 'NTUPLES' });

  if (writeFile) {
    let { path = './', name = 'covarianceJcamp.jdx' } = options;
    writeFileSync(resolve(join(path, name)), jcamp);
  }

  return jcamp;
}

