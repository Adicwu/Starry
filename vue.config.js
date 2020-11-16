const CompressionPlugin = require('compression-webpack-plugin'),
	productionGzipExtensions = [
		"js",
		"css",
		"svg",
		"woff",
		"ttf",
		"json",
		"html"
	],
	path = require('path');

const resolve = dir => path.join(__dirname, dir);
const devConfig = {
	// 跨域
	devServer: {
		proxy: {
			'/api': {
				target: "https://musicapi.adicw.cn/",
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
}
const commonConfig = {
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				// 全局变量路径，不能使用路径别名
				path.resolve(__dirname, 'src/assets/css/common/util.less')
			]
		}
	},
	//别名配置
	//图片转base64
	chainWebpack: config => {
		config.resolve.alias
			.set('styles', resolve('./src/assets/css'))
			.set('apis', resolve('./src/api'))
			.set('static', resolve('./src/assets'))
			.set('comps', resolve('./src/components'));
		config.module
			.rule('images')
			.use('url-loader')
			.loader('url-loader')
			.tap(options => Object.assign(options, {
				limit: 20000
			}))
	},
}
const defaultConfig = {
	configureWebpack: {
		plugins: [
			// Gzip
			new CompressionPlugin({
				filename: "[path].gz[query]",
				test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
				threshold: 1024,
				minRatio: 0.8, //压缩率大于0.8的才压缩
				deleteOriginalAssets: false //是否删除原文件
			})
		],
	},
	productionSourceMap: false, //不输出map文件
	// devServer: {},


	// 跨域
	// devServer: {
	// proxy: {
	// 	'/api': {
	// 		target: "https://s1.hdslb.com/",
	// 		changeOrigin: true,
	// 		ws: true,
	// 		pathRewrite:{
	// 			'^/api': ''
	// 		}
	// 	}
	// }
	// },

	// 部署应用时的基本 URL
	// publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
}
const appConfig = {
	runtimeCompiler: true,
	publicPath: './',
}
module.exports = {
	...devConfig,
	...commonConfig,
	...defaultConfig
}
