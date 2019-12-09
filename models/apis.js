const db = require('../db')
const Sequelize = require('sequelize')

// 定义模型
var Api = db.define('apis', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING
    },
    project_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    method: {
        type: Sequelize.STRING,
        defaultValue: 'get',
        allowNull: true
    },
    body: {
        type: Sequelize.JSON,
        defaultValue: 'get',
        allowNull: true
    },
    headers: {
        type: Sequelize.JSON,
        defaultValue: 'get',
        allowNull: true
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

function add ({ name, url }) {
    Api.create({
        name,
        url,
    })
}

Api.sync({ force: true }).then(() => Api.create({
    name: 'mason',
    project_id: 'example',
    url: 'www.xxx.com'
}))

module.exports = {
    add
}

// 如果在TeacherEssay.sync()中写入force：true，
// 那么将在重新创建数据库之前删除原来的数据库
