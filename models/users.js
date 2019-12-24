const db = require('../db')
const Sequelize = require('sequelize')

// 定义模型
var User = db.define('users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

function add ({ email, password }) {
    return User.create({
        email,
        password
    })
}

function selectOne ({ email, password }) {
    return User.findOne({
        where: { email, password },
        raw: true
    })
}

function validate ({ email }) {
    return User.findOne({
        where: { email },
        raw: true
    })
}

function selectAll () {
    return User.findAll({ raw: true, order: [['createdAt', 'DESC']] })
}

function deleteOne (email) {
    return User.destroy({
        where: { email: email }
    })
}

User.sync({
    force: true     //可不传， 若为true则会删除之前的同名表，  如果为false 创建表，如果原来存在，则不创建
}).then(function () {
    // Table created
    return User.create({
        email: '123@qq.com',
        password: '123456'
    });
})

module.exports = {
    add,
    selectAll,
    deleteOne,
    selectOne,
    validate
}
