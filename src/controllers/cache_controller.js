const {
    clientRedis
} = require('../config/database');

const text = {
    citacao: "Todos nós começamos como um feixe de ossos perdido em algum ponto num deserto, um esqueleto desmantelado que jaz debaixo da areia. É nossa responsabilidade recuperar suas partes. Trata-se de um processo laborioso que é mais bem executado quando as sombras estão exatamente numa certa posição, porque exige muita atenção."
};

const setText = (req, res) => {
    const id = parseInt(req.params.id);
    clientRedis.setex(id, 7200, JSON.stringify(text), (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
    });
}

const getText = (req, res) => {
    const id = parseInt(req.params.id);
    clientRedis.get(id, (err, reply) => {
        if (reply != null) {
            const teste = JSON.parse(reply.toString());
            res.status(200).json(teste.citacao)
        } else {
            res.json(err);
        }
    });
}

module.exports = {
    setText,
    getText
}