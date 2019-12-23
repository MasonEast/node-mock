const db = require('../db')
const Sequelize = require('sequelize')

// 定义模型
var Project = db.define('projects', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.STRING,
        // allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    desc: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

function add ({ name, url, desc, user_id }) {
    Project.create({
        name,
        url,
        desc,
        user_id
    })
}

function selectOne (id) {
    return Project.findOne({
        where: { id: id },
        raw: true
    })
}

function selectAll () {
    return Project.findAll({ raw: true, order: [['createdAt', 'DESC']] })
}

function deleteOne (id) {
    return Project.destroy({
        where: { id: id }
    })
}

// Project.sync({
//     force: true     //可不传， 若为true则会删除之前的同名表，  如果为false 创建表，如果原来存在，则不创建
// }).then(function () {
//     // Table created
//     return Project.create({
//         name: 'mason',
//         url: 'mason',
//         desc: 'something for test',
//         user_id: '123@qq.com'
//     });
// })

module.exports = {
    add,
    selectAll,
    deleteOne,
    selectOne
}
