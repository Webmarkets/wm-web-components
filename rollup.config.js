import summary from 'rollup-plugin-summary';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const packageNames = [
  'wm-mobile-menu',
];

const configs = [];

packageNames.forEach((name) => {
  const esm = {
    input: `packages/rollup-packages/${name}/${name}.js`,
    output: {
      file: `packages/rollup-packages/${name}/dist/${name}.bundled.js`,
      format: 'esm',
    },
    onwarn(warning) {
      if (warning.code !== 'THIS_IS_UNDEFINED') {
        console.error(`(!) ${warning.message}`);
      }
    },
    plugins: [
      replace({ 'Reflect.decorate': 'undefined', preventAssignment: true }),
      resolve(),
      terser({
        ecma: 2017,
        module: true,
        warnings: true,
        mangle: {
          properties: {
            regex: /^__/,
          },
        },
      }),
      summary(),
    ],
  }
  configs.push(esm);
});

export default [...configs];