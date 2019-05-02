/* eslint-disable no-confusing-arrow, max-len, import/prefer-default-export, linebreak-style */

const fetchPipeDependencies = (dependencies) => {
  const dependenciesSeparated = dependencies.map((item) => {
    if (item.includes('|')) {
      return item.split(' | ');
    }

    return item;
  });

  return dependenciesSeparated.flat();
};

const fetchDependencies = dependencies => dependencies ? fetchPipeDependencies(dependencies.split(', ')).map(item => item.split(' (')[0]) : [];
const uniqueDependencies = dependencies => [...new Set(dependencies)];

export const createDependencies = dependencies => uniqueDependencies(fetchDependencies(dependencies));
