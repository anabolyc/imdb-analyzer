# imdb-analyzer

##About
Basic filtering of some specific Movie Production Company movies. Dockerized.

![alt tag](https://raw.githubusercontent.com/anabolyc/imdb-analyzer/master/img/screenshot.png)

##How to start
Standalone:
```    
node server.js
```
In docker:
```
docker run -d -p 8080:5000 andreymalyshenko/imdb-analyzer:armhf
```
Find some movie company at imdb.com (like GAUMONT, [http://www.imdb.com/company/co0178269/](http://www.imdb.com/company/co0178269/)), navigate to [http://localhost:5000/index.html?http://www.imdb.com/company/co0178269/](http://localhost:5000/index.html?http://www.imdb.com/company/co0178269/) and press 'Load 50 rows button'. By default filtering disabled, turn it on by pressing 'Turn filters ON' button.

##Behind proxy

Edit server.js file, find line with proxy and edit appropriately.
