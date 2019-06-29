var restify = require('restify');
var dao = require('./dao');

var server = restify.createServer({
    name: "Prova 2"
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
});

// GET Generos
server.get("/musicfy/listarGenero", (req, res, next) => {
  dao.listarGenero()
  .then((result) => {
    if (result.length == 0) {
      res.send(404);
    } else {
      res.json(result);
    }
  })
  .catch(() => res.send(500));
  next();
});

// GET Musicas por genero_id
server.get("/musicfy/buscarMusicaPorGenero", (req, res, next) => {
  var genero = req.query.genero_id;

  dao.listarMusicaPorGenero(genero)
  .then((result) => {
    if (result.length == 0) {
      res.send(404);
    } else {
      res.json(result);
    }
  })
  .catch(() => res.send(500));
  next();
});

const port = 5000;

server.listen(port, function() {
  console.log("%s up", server.name);
});
