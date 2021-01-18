var fs = require('fs');

module.exports = function(filename, funcaoSucesso, funcaoErro) {
    fs.readFile(filename, function(err, data) {
        if(err) {
            funcaoErro(err);
        }else{
            funcaoSucesso(data);
        }
    });
};