const config = require('./config');
const conteudoArquivo = require('./conteudoArquivo');
const parse = require('url').parse;
const http = require('http');

const types = config.types;
const pastaRaiz = config.rootFolder;
const indexPadrao = config.defaultIndex;
const server = http.createServer();

server.on('request',onRequest);

function onData(data){
    console.log(`Dados enviados ${data}`);
}

function onRequest(req , res){
    req.on('data', onData);
    let arquivo = parse(req.url).pathname;
    let arquivoASerLido;
    let tipoConteudo;
    
    if(arquivo === '/'){
        arquivo = indexPadrao;
    }
    
    arquivoASerLido = pastaRaiz + arquivo;
    tipoConteudo = arquivo.substr(arquivo.lastIndexOf('.')+1);

    conteudoArquivo(arquivoASerLido, function(data){
        res.writeHead(200,{
            "Content-type": types[tipoConteudo] || types['plain'],
            "Content-Length": data.length
        });
        res.end(data);
    },function(err){
        res.writeHead(404);
        res.end(`Arquivo não encontrado : ${err.message}`,'utf-8');
    });
}

module.exports = server;