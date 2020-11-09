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
  },

  // loader는 module 객체의 rules라는 객체에 추가할 수 있다.
  module: {
    rules: [
      {
        // loader가 처리해야할 파일들의 패턴(정규표현식)
        // .js로 끝나는 모든 파일을 이 loader로 돌리겠다.
        test: /\.js$/,
        // 사용할 loader 경로
        use: [path.resolve("./my-webpack-loader.js")]
      },
      {
        test: /\.css$/, // .css 확장자로 끝나는 모든 파일
        use: ["style-loader", "css-loader"] // css-loader를 적용한다
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // .png 확장자로 마치는 모든 파일
        loader: "file-loader", // 파일 로더를 적용한다
        options: {
          publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
          limit: 20000 // 20kb 미만 파일만 data url로 처리
        }
      }
    ]
  }
};
