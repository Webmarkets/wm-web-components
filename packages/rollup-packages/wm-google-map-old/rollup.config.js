import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'build/index.js',
        output: [
            {
                file: 'dist/wm-google-map.bundle.js',
                format: 'iife'
            },
            {
                file: 'dist/wm-google-map.bundle.min.js',
                format: 'iife',
                plugins: [terser()]
            }
        ],
        plugins: [resolve()]
    },
    {
        input: 'build/index.js',
        output: [
            {
                file: 'dist/wm-google-map.esm.js',
                format: 'esm'
            },
            {
                file: 'dist/wm-google-map.esm.min.js',
                format: 'esm',
                plugins: [terser()]
            }
        ]
    }
]