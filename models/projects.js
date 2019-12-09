const db = require('../db')
const Sequelize = require('sequelize')

// 定义模型
var Project = db.define('projects', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
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
        allowNull: false
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

function add ({ name, url }) {
    Project.create({
        name,
        url,
    })
}

function selectOne (id) {
    return Project.findOne({
        where: { id: id },
        raw: true
    })
}

function selectAll () {
    return Project.findAll({ raw: true })
}

function deleteOne (id) {
    return Project.destroy({
        where: { id: id }
    })
}

module.exports = {
    add,
    selectAll,
    deleteOne,
    selectOne
}
