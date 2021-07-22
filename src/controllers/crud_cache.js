const {
    clientMongo
} = require('../config/mongo_config');

const createPost = async (req, res) => {
    const postObj = {
        title: req.body.title,
        text: req.body.text,
        email: req.body.email
    }
    console.log(postObj);
    try {
        const blog = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('blog');
        await blog.insertOne(postObj).then(() => {
            res.send('Success');
        }).catch((err) => {
            res.send(err);
        });
    } catch (err) {
        res.send(err)
    }
}

const getPost = async (req, res) => {
    try {
        const blog = clientMongo.db(`${process.env.MONGO_DATABASE}`).collection('blog');
        const filter = {
            email: req.params.email
        };
        console.log("filter");
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
}

module.exports = {
    createPost,
    getPost
}