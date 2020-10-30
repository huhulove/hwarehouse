module.exports = {
	bracketSpacing: true, // 是否在对象属性添加空格，这里选择是 { foo: bar }
	printWidth: 160, // 指定代码换行的行长度。单行代码宽度超过指定的最大宽度，将会换行，如果都不想换，可以添加 "proseWrap": "never"
	semi: true, // 是否在语句末尾打印分号，这里选择加
	singleQuote: true, // 是否使用单引号，这里选择使用
	tabWidth: 4, // 缩进字节数, 这里是 4
	useTabs: true, // 缩进是否使用tab，true 则用tab false 则用空格，这里选择使用tab
	proseWrap: 'preserve', // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
	arrowParens: 'avoid', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
	eslintIntegration: false, // 不让prettier使用eslint的代码格式进行校验
	htmlWhitespaceSensitivity: 'ignore', //  "css" - 遵守CSS显示属性的默认值  "strict" - 空格被认为是敏感的  "ignore" - 空格被认为是不敏感的
	ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
	trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号 es5 -（在ES5中加尾逗号） none - 不加

	disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
	endOfLine: 'auto' // 结尾是 \n \r \n\r auto
};
