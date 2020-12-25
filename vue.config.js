const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@f', resolve('src/factory'))
			.set('@c', resolve('src/components'))
			.set('@s', resolve('src/service'))
			.set('@m', resolve('src/mixins'))
			.set('@u', resolve('src/util'));
	},
	css: {
		extract: false
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://192.168.1.222/api',
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
};
