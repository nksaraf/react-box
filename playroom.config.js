const path = require("path");

module.exports = {
  components: "./playroom/lib.ts",
  outputPath: "./public",

  // Optional:
  title: "React Box",
  themes: "./playroom/theme.ts",
  frameComponent: "./playroom/Frame.tsx",
  widths: [320, 540, 768],
  port: 9000,
  openBrowser: true,
  exampleCode: `
    const [counter, setCounter] = React.useState(0);
    const incrementCounter = () => setCounter(counter => counter + 1);
    
    <Box cursor="pointer" onTap={incrementCounter}>
      Hello World! You are at step {counter}. Tap/Click to move ahead.
    </Box>  
  `,
  webpackConfig: () => ({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                "@babel/preset-react"
              ],
              plugins: [
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-class-properties"
              ]
            }
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"]
    }
  }),
  typeScriptFiles: ["**/*.{ts,tsx}", "!**/node_modules"],
  typeDeclarations: ["playroom/@types/**/*.d.ts"]
};
