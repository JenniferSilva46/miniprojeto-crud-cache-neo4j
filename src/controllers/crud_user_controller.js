const {
    client
} = require('../config/database');

const getUsers = (req, res) => {
    client.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(400).send(error);
            return;
        }
        res.status(200).json(results.rows);
    });
}

const createUser = (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    client.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
        [name, email, password], (error, results) => {
            if (error) {
                res.status(400).send(error);
                return;
            }
            res.status(200).send('Usuário adicionado com sucesso!');
        });
};

const updateUser = (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    client.query(
        'UPDATE users SET name = $1, password = $3 WHERE email = $2 ',
        [name, email, password],
        (error, results) => {
            if (error) {
                throw error
            }
            if (results.rowCount) {
                res.status(200).send('Usuário atualizado com sucesso!');
            } else {
                res.status(200).json("Usuário não encontrado");
            }
        });
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    client.query('DELETE FROM users WHERE id = $1', [id], (error, result) => {
        if (error) {
            throw error
        }
        if (result.rowCount) {
            res.status(200).send("Usuário deletado com sucesso!");
        } else {
            res.status(200).json("Usuário não encontrado");
        }
    })
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};