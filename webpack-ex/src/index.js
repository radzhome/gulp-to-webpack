console.log(`I've been required by Webpack`);
import style from "./_scss/main.scss";

// Babel test
const arr = [1, 2, 3];
const iAmJavascriptES6 = () => console.log(...arr);
window.iAmJavascriptES6 = iAmJavascriptES6;
