import { Tabs, Input } from 'antd';
import HeadersTable from './headers-table'
import BodyTable from './body-table'
import { Context } from '../pages/project'
import { useContext } from 'react'

const { TabPane } = Tabs;

function callback (key) {
}
const InterfaceTabs = () => {

    const AppContext = useContext(Context)

    const handleText = (e) => {
        e.persist()
        AppContext.dispatch({ type: 'ADD_DATA', data: e.target.value })
    }

    return (
        <Tabs defaultActiveKey="1" onChange={callback} style={{ minHeight: '30vh' }}>
            <TabPane tab="Headers" key="1">
                <HeadersTable />
            </TabPane>
            <TabPane tab="Body" key="2">
                <BodyTable />
            </TabPane>
            <TabPane tab="Data" key="3">

                <Input.TextArea placeholder="接口的返回值" onBlur={(e) => handleText(e)} style={{ widt: '80vw', height: '20vh' }} />
            </TabPane>
        </Tabs>
    )
}


export default InterfaceTabs