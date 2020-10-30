module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/airbnb'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-tabs': 'off', // 文件任何位置查找制表符：代码，注释或其他任何内容。  off - 不检查
		indent: ['error', 'tab'], // 2 - 使用两个空格缩进   tab - 使用tab 缩进
		'no-multiple-empty-lines': ['error'], // 代码空行 数量
		'linebreak-style': [0, 'error', 'windows'], // 使用windows的换行
		'comma-dangle': [2, 'never'], //  对象数组最后一个不带逗号
		'no-trailing-spaces': 0, // 禁用 校验代码末尾带空格
		'import/no-dynamic-require': 0, // 禁用 动态require
		'import/no-unresolved': 0,
		'no-param-reassign': 0, // 声明为函数参数的变量可能会引起误解
		'max-len': ['error', 160], // 单行代码最大长度
		'guard-for-in': 0, // 禁用 禁用for in 循环
		'no-shadow': 0, // 禁用  禁止页面内相容参数名
		'object-shorthand': 0, // 禁用 禁止对象内使用带引号字符串
		'no-restricted-syntax': 0,
		'no-plusplus': 0, // 禁用 ++
		'consistent-return': 0, // 关闭箭头函数必须要return
		'no-return-assign': 0, // return 语句中不能有赋值表达式
		'global-require': 0, // 关闭禁止使用requrie
		'prefer-promise-reject-errors': 0, // 这条规则旨在确保承诺只被Error对象拒绝。
		'import/extensions': 'off', // 禁用文件名详细文件类型后缀
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'arrow-parens': ['error', 'as-needed'], // 箭头函数参数括号，可选 always：（默认）在所有情况下都需要参数；as-needed：当只有一个参数时允许省略参数
		'arrow-body-style': ['error', 'always'], // 箭头函数体的周围使用大括号, always: 在函数体周围强制使用大括号; as-needed: 在没有大括号的地方可以省略（默认）; never: 在函数体周围不加任何大括号（限制箭头函数返回表达式的角色）
		'no-undef': 0, // 关闭显式声明全局变量的要求
		'class-methods-use-this': 0,
		'no-underscore-dangle': ['error', { allow: ['_id'] }], // 允许指定的标识符具有悬挂下划线
		camelcase: 0, // 关闭使用骆驼拼写法
		'no-global-assign': 0, // 允许修改只读全局变量,
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always'
			}
		],
		// 对象解构不需要换行
		'object-curly-newline': [
			'error',
			{
				ObjectPattern: {
					multiline: true
				}
			}
		],
		'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }] // 允许在表达式中使用三元运算符，类似于短路评估
	}
};
