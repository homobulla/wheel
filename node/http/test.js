const WebServer = require("./1.6http");
const app = new WebServer();
const PORT = 3000;
app.use(ctx => {
    ctx.res.write("<p>line 1</p>");
});

app.use(ctx => {
    ctx.res.write("<p>line 2</p>");
});

app.use(ctx => {
    ctx.res.write("<p>line 3</p>");
});
app.listen(PORT, () => {
    console.log("chenggong");
});
