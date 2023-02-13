const { createProxyMiddleware } = require("http-proxy-middleware");

const context = ["/items"];

module.exports = function (app) {
	const appProxy = createProxyMiddleware(context, {
		target: "https://localhost:7297",
		secure: false,
	});

	app.use(appProxy);
};
