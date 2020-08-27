const object = {
	password: /(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/])[a-z\d~!@#$%^&*()_+`\-={}:";'<>?,.\/]{8,16}/i,
	phone: /^1[3456789]\d{9}$/,
	email:/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
	card: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
	credit: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
}
export default object