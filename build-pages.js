var hbs = require('hbs');
const fs = require('fs');

var x = hbs.registerPartials(__dirname + '/pages/partials', function (err) {
	if (!err){
		console.log(compile(__dirname+'/pages/docs/girl-name/index.html',{}));
	}
});




function compile(file,data){
	var content = fs.readFileSync(file,'utf8');
	console.log(data);
	var template = hbs.compile(content);
	return template(data);
}
