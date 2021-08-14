const {
    session
} = require('../config/neo4j_config');

const createUser = async (req, res) => {

    const obj = {
        nameUser: req.body.nameUser,
        email: req.body.email
    };
    await session.run('CREATE (p:user{name:$nameUser, email:$email}) RETURN p', {
            nameUser: obj.nameUser,
            email: obj.email
        }).then(console.log(res.send('User created to success')))
        .catch(error => console.log(error))
        .then(() => {
            session.close
        });
}

const addFollower = async (req, res) => {
    const obj = {
        nameUser1: req.body.nameUser1,
        nameUser2: req.body.nameUser2
    };
    await session.run('MATCH (p1:user{name:$nameUser1}) MATCH (p2:user{name:$nameUser2}) CREATE (p1)-[:FOLLOW]->(p2)', {
            nameUser1: obj.nameUser1,
            nameUser2: obj.nameUser2
        }).then(result => {
            if (result.summary.counters._stats.relationshipsCreated > 0) {
                console.log(res.send("user followed to success"))
            } else {
                console.log(res.send("user not exist"))
            }
        })
        .catch(error => console.log(error))
        .then(() => {
            session.close
        });
}

const fetchFollowed = async (req, res) => {
    const obj = {
        nameUser: req.params.nameUser
    }
    await session.run('MATCH (p:user{name:$nameUser})-[:FOLLOW]->(p2) RETURN p2', {
        nameUser: obj.nameUser,
    }).then(result => {
        var userArr = [];

        result.records.forEach((record) => {
            userArr.push({
                name: record._fields[0].properties.name
            })
        });
        if (userArr.length > 0) {
            console.log(res.send(userArr));
        } else {
            console.log(res.send("User has no followers"));
        }
    })

}

const suggestUsers = async (req, res) => {
    const obj = {
        nameUser: req.params.nameUser
    }
    await session.run('MATCH (p1:user{name:$nameUser})-[:FOLLOW]->(p2)-[:FOLLOW]->(p3) where p1 <> p3 RETURN p3', {
        nameUser: obj.nameUser,
    }).then(result => {
        var userArr = [];
        result.records.forEach((record) => {
            userArr.push({
                name: record._fields[0].properties.name
            });
        });
        if (userArr.length > 0) {
            console.log(res.send(userArr));
        } else {
            console.log(res.send("search error"));
        }
    })

}



module.exports = {
    createUser,
    addFollower,
    fetchFollowed,
    suggestUsers
}