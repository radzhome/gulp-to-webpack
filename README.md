# gulp 2 webpack

Based on this tutorial - https://www.valentinog.com/blog/from-gulp-to-webpack-4-tutorial/

To convert gulp to webpack, as a FE task runner.


Babel tutorial - https://www.valentinog.com/blog/webpack-tutorial/#webpack_4_transpiling_Javascript_ES6_with_Babel


Intro to webpack - https://www.sitepoint.com/beginners-guide-webpack-module-bundling/

HTML webpack plugin (multiple html files) - https://dev.to/rodeghiero_/multiple-html-files-with-htmlwebpackplugin-19bf

## Steps

1. `npm init -y`
1. Setup scripts in package.json
1. `npm i webpack webpack-cli --save-dev`
1. `npm i html-webpack-plugin html-loader --save-dev`
1. define `webpack.config.js`
1. define sample `/src`
1. Images: `npm i img-loader url-loader file-loader --save-dev`
1. SASS: `npm i css-loader sass-loader postcss-loader node-sass mini-css-extract-plugin autoprefixer --save-dev`
1. JS: `npm i @babel/core babel-loader @babel/preset-env --save-dev`
1. Watch using dev server: `npm i webpack-dev-server --save-dev`
1. `npm run build`

## Most important things to know about the Webpack configuration file are

entry: (optional) it’s our main Javascript file where all of the application’s code gets imported
output: (optional) it’s the resulting Javascript file, bundled by Webpack
module and rules: it’s the place where you configure the loaders
plugins: it’s the place where you configure which plugins Webpack will use


## References 

* https://github.com/marceloglacial/snowfall-boilerplate
* https://github.com/marceloglacial/snowflake-boilerplate

