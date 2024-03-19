module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json', // original path, try swap this & another path in case ESLint Parsing error: Cannot read file tsconfig.json
    // project: '**/tsconfig.json', // another fix ESLint Parsing error: Cannot read file tsconfig.json - without tsconfigRootDir: __dirname
    tsconfigRootDir: __dirname, // working with original path above or other - and also by itself without them
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
