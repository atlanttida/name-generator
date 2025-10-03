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
	var template = hbs.compile("{{>blogLatest}}");
	var data = {};
	buildBlogRoll(data);
	var blogLatest = "";
	if(!this.canonical.endsWith("/blog/")){
		blogLatest = template(data);
	}
    return '<div class="bg-light text-dark no-shadow mt-5 pb-5 text-start justify-content-center row gx-0"><div class="col-10 col-sm-6 pe-sm-5">' + 
    options.fn(this) + 
    blogLatest +
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


hbs.registerHelper('slice', function(context, block) {

var ret = "",
  offset = parseInt(block.hash.offset) || 0,
  limit = parseInt(block.hash.limit) || 5,
  i = (offset < context.length) ? offset : 0,
  j = ((limit + offset) < context.length) ? (limit + offset) : context.length;



for(i,j; i<j; i++) {
  ret += block.fn(context[i]);
}

  return ret;
});



// New pagination helper
hbs.registerHelper('pagination', function(options) {
	  if (!this.pagination || this.pagination.totalPages <= 1) {
        return '';
    }
    
    const p = this.pagination;
    if (options.data.root.currentPage){
    	p.currentPage = options.data.root.currentPage;
    }
    let html = '<nav aria-label="Blog pagination" class="mt-5" id="pagination"><ul class="pagination justify-content-center">';
    
    // Previous button
    if (p.currentPage > 1) {
        const prevUrl = p.currentPage === 2 ? '/blog/' : `${p.currentPage - 1}/`;
        html += `<li class="page-item">
            <a class="page-link" href="${prevUrl}" rel="prev" aria-label="Previous page">
                <span aria-hidden="true">&laquo;</span> Previous
            </a>
        </li>`;
    } else {
        html += `<li class="page-item disabled">
            <span class="page-link"><span aria-hidden="true">&laquo;</span> Previous</span>
        </li>`;
    }
    
    // Page numbers
    const startPage = Math.max(1, p.currentPage - 2);
    const endPage = Math.min(p.totalPages, p.currentPage + 2);
    
    // First page + ellipsis if needed
    if (startPage > 1) {
        html += `<li class="page-item">
            <a class="page-link" href="/blog/">1</a>
        </li>`;
        if (startPage > 2) {
            html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
    }
    
    // Current range of pages
    for (let i = startPage; i <= endPage; i++) {
        const pageUrl = i === 1 ? '/blog/' : `/blog/${i}/`;
        const isActive = i === p.currentPage;
        
        html += `<li class="page-item ${isActive ? 'active' : ''}">
            <a class="page-link" href="${pageUrl}" ${isActive ? 'aria-current="page"' : ''}>${i}</a>
        </li>`;
    }
    
    // Last page + ellipsis if needed
    if (endPage < p.totalPages) {
        if (endPage < p.totalPages - 1) {
            html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
        }
        html += `<li class="page-item">
            <a class="page-link" href="/blog/${p.totalPages}/">${p.totalPages}</a>
        </li>`;
    }
    
    // Next button
    if (p.currentPage < p.totalPages) {
        html += `<li class="page-item">
            <a class="page-link" href="${p.currentPage + 1}/" rel="next" aria-label="Next page">
                Next <span aria-hidden="true">&raquo;</span>
            </a>
        </li>`;
    } else {
        html += `<li class="page-item disabled">
            <span class="page-link">Next <span aria-hidden="true">&raquo;</span></span>
        </li>`;
    }
    
    html += '</ul></nav>';

    html +=`<style>/* Pagination container */
#pagination .pagination {
    padding-left: 0;
    margin: 0;
    list-style: none;
    border-radius: 0.5rem;
    font-family: sans-serif;
}

/* Page items */
#pagination .page-item {
    margin: 0 4px;
}

/* Links */
#pagination .page-link {
    color: #007bff;
    background-color: #fff;
    border: 1px solid #dee2e6;
    padding: 8px 14px;
    font-size: 0.95rem;
    border-radius: 6px;
    transition: background-color 0.2s ease, color 0.2s ease;
    text-decoration: none;
}

/* Hover */
#pagination .page-link:hover {
    background-color: #f1f1f1;
    color: #0056b3;
}

/* Active page */
#pagination .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: #fff;
    cursor: default;
}

/* Disabled state */
#pagination .page-item.disabled .page-link {
    color: #6c757d;
    background-color: #f8f9fa;
    border-color: #dee2e6;
    cursor: not-allowed;
    opacity: 0.6;
}
</style>`

    return html;
});


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
			if (file.replace(/pages[\\|/]docs/g,'') == "\\blog\\index.html" || file.replace(/pages[\\|/]docs/g,'') == "/blog/index.html"){
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

		if (data.posts.length > 10){
			var page = 2, totalPages = Math.ceil(data.posts.length / 10),totalPosts = data.posts.length;
			while (page < totalPages+1){
				var dir = __dirname+'/docs/blog/'+page;

				if (!fs.existsSync(dir)){
				    fs.mkdirSync(dir);
				}

				

				var content = fs.readFileSync(__dirname+"/pages/docs/blog/index.html",'utf8');
				content = content.replace(`{{>blogRoll offset="0" limit="10"}}`,`{{>blogRoll offset="${(page-1)*10}" limit="10"}}`);

				content = content.replace(`{{pagination}}`,`{{pagination page="${page}"}}`);
				var template = hbs.compile(content);

				data.canonical = DOMAIN_FULL_URL + `/blog/${page}/`;
				data.currentPage = page;
				var html = template(data);
				fs.writeFileSync(__dirname+'/docs/blog/'+page+"/index.html",html);
				page++;
			}
		}
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

	var page = data.currentPage || 1, totalPages = Math.ceil(data.posts.length / 10),totalPosts = data.posts.length;
	data.pagination = {
		currentPage: page,
		totalPages: totalPages,
		totalPosts: totalPosts,
		hasNext: page < totalPages,
		hasPrev: page > 1,
		nextPage: page < totalPages ? page + 1 : null,
		prevPage: page > 1 ? page - 1 : null
	};

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