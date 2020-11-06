// 노드의 path 모듈
const path = require("path");

module.exports = {
  mode: "development",
  // 시작점
  entry: {
    main: "./src/app.js"
    // main2: "./src/app2/js"P
  },

  output: {
    // 디렉토리 명을 입력한다.(절대경로)
    path: path.resolve("./dist"),
    // 번들링된 파일명
    // main.js로 치환된다.
    // [name]으로 설정한 것은 entry가 여러 개일 경우 동적으로 만들기 위해
    filename: "[name].js"
  }
};
