const DOMAIN_FULL_URL = "https://www.nickname-generator.net"
var hbs = require('hbs');
const fs = require('fs');
const path = require("path")

hbs.registerHelper('test', function(arg1,arg2,options) {
    return (arg1 == arg2) ? options.fn(this) : "";
});

hbs.registerHelper('article', function(options) {
    return '<article class="d-flex w-100 h-100 mx-auto flex-column pt-5">' 
    + options.fn(this) 
    + "</article>";
});

hbs.registerHelper('absolutePath', function(arg1,options) {
    if (arg1.indexOf("http") == 0){
    	return arg1;
    } else {
    	return "https://www.nickname-generator.net"+arg1;
    }
});

hbs.registerHelper('articleContent', function(options) {
    return '<div class="bg-light text-dark no-shadow mt-5 pb-5 text-start justify-content-center row gx-0"><div class="col-10 col-sm-6 pe-sm-5">' + options.fn(this) + 
    '<div id="disqus_thread"></div>'+
    "</div><div class='sidebar col-md-2 col-sm'>"+
    `<!-- Nickname Generator Vertical Rectangle (300x600) -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-3421619882899259"
     data-ad-slot="7805254435"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`+
    "</div></div>";
});

hbs.registerHelper('image2alt',function(arg1,options){
	var fileName = path.basename(arg1);
	fileName = fileName.substring(0,fileName.lastIndexOf("."));
	return fileName.replace(/-/g," ");
})




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
			if (file.replace(/pages[\\|/]docs/g,'') == "\\blog\\index.html"){
				//blogroll
				buildBlogRoll(data);
			}
			var html = compile(__dirname+'/'+file,data);
			var dir = path.dirname(__dirname+'/'+file.replace(/pages[\\|/]/g,''));

			
			if (!fs.existsSync(dir)){
			    fs.mkdirSync(dir);
			}
			fs.writeFileSync(__dirname+'/'+file.replace(/pages[\\|/]/g,''),html);
		})

		
	}
});

function buildBlogRoll(data){
	var blogPostsDirs = getAllFolders('./pages/docs/blog');
	data.posts = [];
	blogPostsDirs.forEach(postId => {
		var content = fs.readFileSync(__dirname+"/pages/docs/blog/"+postId+"/index.html",'utf8');
		var re = new RegExp("\\{\\{>header.*?title='(.*?)'.*?description='(.*?)'.*?\\}\\}","sm");
		var fi = content.match(new RegExp("\\{\\{>header.*?featured_image='(.*?)'.*?\\}\\}","sm"));
		var date = content.match(new RegExp("\\{\\{>header.*?date='(.*?)'.*?\\}\\}","sm"));
		data.posts.push({
			title:content.match(re)[1],
			url:'/blog/'+postId+'/',
			description:content.match(re)[2],
			featured_image:fi!=null?fi[1]:"",
			date:date && new Date(date[1]).getTime()
		})
	});

	data.posts = data.posts.sort((a,b) => a.date<b.date?1:-1);
}


function compile(file,data){
	var content = fs.readFileSync(file,'utf8');
	var template = hbs.compile(content);
	return template(data);
}

const getAllFolders = function(dirPath) {
	files = fs.readdirSync(dirPath)
	return files.filter(file => fs.statSync(dirPath + "/" + file).isDirectory());
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