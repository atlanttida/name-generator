const DOMAIN_FULL_URL = "https://www.nickname-generator.net"
var hbs = require('hbs');
const fs = require('fs');
const path = require("path")

var x = hbs.registerPartials(__dirname + '/pages/partials', function (err) {
	if (!err){
		var files = getAllFiles('./pages/docs',[]);//.map(file=>file.replace(/pages[\\|/]/g,''));
		var data={};
		data.pages = files.map(file =>{
			return {
				url:file.replace(/pages[\\|/]docs/g,'').replace("index.html","").replace(/\\/g,'/')
			}
		});
		data.generators = [
			{
				name:'Gamer Girl Names',
				url:'/gamer-girl-name/',
			},
			{
				name:'Gamer Boy Names',
				url:'/gamer-name/',
			},
			{
				name:'Nicknames For Boys',
				url:'/nicknames-for-boys/',
			},
			{
				name:'Nicknames For Girls',
				url:'/nicknames-for-girls/',
			},
		]
		files.map(file =>{
			data.canonical = DOMAIN_FULL_URL + file.replace(/pages[\\|/]docs/g,'').replace("index.html","").replace(/\\/g,'/');
			var html = compile(__dirname+'/'+file,data);
			fs.writeFileSync(__dirname+'/'+file.replace(/pages[\\|/]/g,''),html);
		})
	}
});




function compile(file,data){
	var content = fs.readFileSync(file,'utf8');
	console.log(data);
	var template = hbs.compile(content);
	return template(data);
}

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join( dirPath, "/", file))
    }
  })

  return arrayOfFiles
}