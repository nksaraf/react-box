const path = require('path');

module.exports = {
  components: './src/index.tsx',
  outputPath: './public',

  // Optional:
  title: 'Qwerty',
  themes: './src/theme.ts',
  frameComponent: './playroom/Frame.tsx',
  widths: [1024, 768, 320],
  port: 9000,
  openBrowser: true,
  exampleCode: `
    <Box>
      Hello World!
    </Box>
  `,
  typeDeclarations: [],
  typeScriptFiles: [
    '**/*.{ts,tsx}',
    '!**/node_modules'
  ],
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
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // alias: {
      //   '@primitives' : path.resolve(__dirname, 'src/primitives'),
      //   '@hooks' : path.resolve(__dirname, 'src/hooks'),
      //   '@components' : path.resolve(__dirname, 'src/components'),
      //   '@pages' : path.resolve(__dirname, 'src/pages'),
      //   '@state' : path.resolve(__dirname, 'src/state'),
      //   '@icons' : path.resolve(__dirname, 'src/streamline')
      // }
    }
  }),
};