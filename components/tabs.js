import { Tabs } from 'antd';
import HeadersTable from './headers-table'
const { TabPane } = Tabs;

function callback (key) {
    console.log(key);
}
const InterfaceTabs = () => {
    return (
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Headers" key="1">
                <HeadersTable />
            </TabPane>
            <TabPane tab="Body" key="2">
                Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Data" key="3">
                Content of Tab Pane 3
            </TabPane>
        </Tabs>
    )
}


export default InterfaceTabs