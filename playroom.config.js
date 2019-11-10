const path = require('path');

module.exports = {
  components: './dist/index.js',
  outputPath: './public',

  // Optional:
  title: 'Qwerty',
  themes: './playroom/theme.ts',
  frameComponent: './playroom/Frame.tsx',
  widths: [320, 540, 768],
  port: 9000,
  openBrowser: true,
  exampleCode: `
    <Box>
      Hello World!
    </Box>
  `,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript',
                '@babel/preset-react'
              ],
              plugins: [
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-transform-runtime',  
                '@babel/plugin-proposal-class-properties'
              ]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    }
  }),
  typeScriptFiles: [
    '**/*.{ts,tsx}',
    '!**/node_modules'
  ],
  typeDeclarations: [
    'dist/**/*.d.ts'
  ]
};