process.title='ServidorNodeJsPuro';
const webServer = require('./server');
const args = process.argv;
const porta = args[2] || 8080;

webServer.listen(porta, function(){
    console.log(`Servidor executando na porta ${porta}`);
});