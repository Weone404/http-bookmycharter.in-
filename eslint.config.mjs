import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'scripts/**',
      // Framework-generated or framework-mandated files we do not author.
      'next-env.d.ts',
      'postcss.config.mjs',
      // Build output of scripts/build-*.mjs, regenerated on every build.
      'src/data/airports.generated.ts',
      'src/data/aircraft.generated.ts',
    ],
  },
];

export default config;
