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
    data: {
        type: Sequelize.JSON,
        defaultValue: '',
        allowNull: true
    },
    state: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
});

function addApi (api) {
    return Api.create({
        name: api.name,
        desc: api.desc,
        content: api.content,
        project_id: api.projectId,
        url: api.url,
        state: 1
    })
}

function selectOneApi (id) {
    return Api.findOne({
        where: {
            id: id,
            state: 1
        },
        raw: true
    })
}

function findOneApiByUrl (name) {
    return Api.findOne({
        where: {
            url: name,
            state: 1
        },
        raw: true
    })
}

function selectAllApi (id) {
    return Api.findAll({
        where: {
            project_id: id,
            state: 1
        },
        raw: true
    })
}

function selectApiByCondiction (condiction) {
    return Api.findAll({
        where: condiction,
        raw: true
    })
}

function deleteApi (id) {
    return Api.update({
        state: 0
    }, {
            where: { id: id }
        })
    // return Api.destroy({
    //   where: { id: id }
    // })
}

function deleteProjectApi (projectId) {
    return Api.update({
        state: 0
    }, {
            where: { project_id: projectId }
        })
    // return Api.destroy({
    //   where: { project_id: projectId }
    // })
}

function updateApi (content, condition) {
    return Api.update(content, condition)
}

module.exports = {
    addApi,
    selectAllApi,
    selectOneApi,
    deleteApi,
    updateApi,
    deleteProjectApi,
    selectApiByCondiction,
    findOneApiByUrl
}