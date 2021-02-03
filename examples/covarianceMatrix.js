import { Matrix } from 'ml-matrix';
import { SpectraProcessor } from 'spectra-processor';
import { readdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { matrixToJcamp } from '../src/index';

const pathToJcamps = 'C:\\Users\\alejo\\Documents\\doctorado\\Airwave\\data';

const normalizationOptions = {
  from: 0,
  to: 11,
  nbPoints: 4096,
  exclusions: [{ from: 4.7, to: 4.9 }],
};

const listFiles = readdirSync(resolve(pathToJcamps));

let spectraProcessor = new SpectraProcessor(normalizationOptions);

for (let filename of listFiles) {
  let jcamp = readFileSync(resolve(join(pathToJcamps, filename)), 'utf-8');
  spectraProcessor.addFromJcamp(jcamp);
}

let normalizedData = spectraProcessor.getNormalizedData();

let covarianceMatrix = covariance(normalizedData.matrix);

matrixToJcamp(covarianceMatrix.to2DArray(), {
    writeFile: false,
    path: './',
    filename: 'covariance.jdx',
})

function covariance(xMatrix, yMatrix = xMatrix, options = {}) {
  xMatrix = new Matrix(xMatrix);
  let yIsSame = false;
  if (
    typeof yMatrix === 'object' &&
    !Matrix.isMatrix(yMatrix) &&
    !Array.isArray(yMatrix)
  ) {
    options = yMatrix;
    yMatrix = xMatrix;
    yIsSame = true;
  } else {
    yMatrix = new Matrix(yMatrix);
  }
  if (xMatrix.rows !== yMatrix.rows) {
    throw new TypeError('Both matrices must have the same number of rows');
  }
  const { center = true } = options;
  if (center) {
    xMatrix = xMatrix.center('column');
    if (!yIsSame) {
      yMatrix = yMatrix.center('column');
    }
  }
  const cov = xMatrix.transpose().mmul(yMatrix);
  for (let i = 0; i < cov.rows; i++) {
    for (let j = 0; j < cov.columns; j++) {
      cov.set(i, j, cov.get(i, j) * (1 / (xMatrix.rows - 1)));
    }
  }
  return cov;
}
