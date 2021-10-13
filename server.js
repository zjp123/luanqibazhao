var http = require("http");

var server = http.createServer(function(req,res){
	//得到url
	var userurl = req.url;
  console.log(userurl);
	res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"})
	res.end('lallalal');
});

server.listen(8080,"127.0.0.1", function(){
  console.log('启动成功...');
});