class MyWebpackPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("My Plugin", () => {
      console.log("MyPlugin: done");
    });
  }
}

module.exports = MyWebpackPlugin;
