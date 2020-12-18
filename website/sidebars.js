/* eslint-env node */

module.exports = {
	docs: [
		{
			type: `category`,
			label: `Getting Started`,
			items: [
				`introduction`,
				`concepts`,
				`packages`,
				`faq`,
			],
		},
		{
			type: `doc`,
			id: `operations/overview`,
		},
		{
			type: `category`,
			label: `CLI`,
			items: [
				`cli/overview`,
				`cli/examples`,
			],
		},
		{
			type: `category`,
			label: `Pull`,
			items: [
				`pull/overview`,
				`pull/core-functions`,
				`pull/sources`,
				`pull/targets`,
				`pull/tutorials`,
			],
		},
		{
			type: `category`,
			label: `Push`,
			items: [
				`push/overview`,
				`push/core-functions`,
				`push/sources`,
				`push/targets`,
				`push/tutorials`,
			],
		},
		{
			type: `category`,
			label: `Utils`,
			items: [
				{
					type: `doc`,
					id: `utils/overview`,
				},
				{
					type: `category`,
					label: `Categories`,
					collapsed: false,
					items: [
						`utils/compare`,
						`utils/coroutine`,
						`utils/function`,
						`utils/iterable`,
						`utils/language`,
						`utils/object`,
						`utils/ordering`,
						`utils/promise`,
						`utils/random`,
					],
				},
			],
		},
	],
};
