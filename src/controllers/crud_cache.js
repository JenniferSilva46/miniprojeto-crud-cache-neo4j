const {
    clientMongo
} = require('../config/mongo_config');

const createPost = async (req, res) => {
    const postObj = {
        title: req.body.title,
        text: req.body.text,
        email: req.body.email
    }
    try {
        const blog = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('blog');
        await blog.insertOne(postObj).then(() => {
            res.send('Success');
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err);
    }
};

const getPost = async (req, res) => {
    try {
        const blog = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('blog');
        const filter = {
            email: req.params.email
        };
        const post = []
        await blog.find(filter).forEach(obj => post.push(obj));

        if (post.length > 0) {
            res.send(post);
        } else {
            res.send('Postagem inexistente');
        }

    } catch (err) {
        res.send(err)
    }
};

const updatePost = async (req, res) => {
    const filter = {
        title: req.body.title
    };
    try {
        const blog = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('blog');
        const newObj = {
            $set: {
                title: req.body.title,
                text: req.body.text
            }

        };
        await blog.updateOne(filter, newObj, (err, obj) => {
            if (obj.modifiedCount > 0) {
                res.send('posts atualizada com sucesso');
            } else {
                res.send('posts não encontrado');
            }
        })

    } catch (err) {
        res.send("err");
    };
};

const delPost = async (req, res) => {
    try {
        const blog = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('blog');
        const filter = {
            title: req.params.title
        };
        await blog.deleteOne(filter, (err, obj) => {
            if (obj.deletedCount) {
                res.send('posts apagada com sucesso');
            } else {
                res.send('posts não encontrado');
            }
        });
    } catch (err) {
        res.send("err")
    };
};

module.exports = {
    createPost,
    getPost,
    updatePost,
    delPost
};