// Browser Sync
export const config = {
    proxy: "http://localhost:6900",
    files: ["public/**/*.{css,js}", "src/views/**/*.ejs"],
    ui: {
        port: 7000
      },
    // server: {
    //   baseDir: "public",
    //   views: "src/views"
    // },
    port: 6900,
    open: false
  };