import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import {dts} from "rollup-plugin-dts";

export default [
    {
        input: 'src/index.ts',
        output: {
            file: './dist/index.mjs',
            format: 'esm',
            sourcemap: false
        },
        external: ['axios', 'js-cookie'],
        plugins: [
            typescript(),
            terser({
                format: {
                    comments: false,
                    beautify: true,
                    ecma: '2020',
                },
                compress: {
                    drop_console: true,
                },
                mangle: false,
                module: true,
            })
        ]
    },
    {
        input: "dist/dts/index.d.ts",
        output: [
            {
                file: "dist/index.d.ts",
                format: "es"
            }
        ],
        plugins: [
            dts()
        ],
    }
];