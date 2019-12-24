
const host = `http://localhost:5001`

export const port = parseInt(process.env.PORT, 10) || 5001

export default {
    getProjectURL: `${host}/api/project`,
    addProjectURL: `${host}/api/addProject`,
    deleteProjectURL: `${host}/api/project`,
    getInterfaceURL: `${host}/api/getInterface`,
    addInterfaceURL: `${host}/api/addInterface`,
    deleteInterfaceURL: `${host}/api/interface`,
    loginURL: `${host}/api/login`,
    registerURL: `${host}/api/register`,
}