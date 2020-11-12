// 노드의 path 모듈
const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("connect-api-mocker");
// eslint-disable-next-line no-undef
const mode = process.env.NODE_ENV || "development"; // 기본값을 development로 설정
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode,
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
  devServer: {
    overlay: true,
    stats: "errors-only",
    // eslint-disable-next-line no-unused-vars
    before: (app, _server) => {
      app.use(apiMocker("/api", "mocks/api"));
    },
    hot: true
  },
  optimization: {
    minimizer:
      mode === "production"
        ? [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true // 콘솔 로그를 제거한다
                }
              }
            })
          ]
        : []
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
        use: [
          // eslint-disable-next-line no-undef
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader // 프로덕션 환경
            : "style-loader", // 개발 환경
          // "style-loader",
          "css-loader"
        ] // css-loader를 적용한다
      },
      {
        test: /\.(png|jpg|gif|svg)$/, // .png 확장자로 마치는 모든 파일
        loader: "file-loader", // 파일 로더를 적용한다
        options: {
          publicPath: "./", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
          limit: 20000 // 20kb 미만 파일만 data url로 처리
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // node_modules 예외처리
        loader: "babel-loader" // 바벨 로더를 추가한다
      }
    ]
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: `
      빌드 날짜: ${new Date().toLocaleString()}
      유저 : ${childProcess.execSync("git config user.name")}
      커밋:${childProcess.execSync("git rev-parse --short HEAD")}`
    }),
    new webpack.DefinePlugin({
      TWO: "1+1",
      VERSION: JSON.stringify("v.1.2.3")
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 템플릿 경로를 지정
      templateParameters: {
        // 템플릿에 주입할 파라매터 변수 지정
        // eslint-disable-next-line no-undef
        env: process.env.NODE_ENV === "development" ? "(개발용)" : ""
      },
      minify:
        // eslint-disable-next-line no-undef
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true // 주석 제거
            }
          : false
    }),
    new CleanWebpackPlugin(),
    // eslint-disable-next-line no-undef
    ...(process.env.NODE_ENV === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: `[name].css`,
            ignoreOrder: true
          })
        ]
      : [])
  ]
};