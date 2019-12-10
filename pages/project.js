import Link from 'next/link'
import { Button, Input, Select } from 'antd'

const Project = () => {
    return (
        <div>
            <ul className="project-header">
                <li>项目名称：<Input /></li>
                <li>项目id：<Input /></li>
                <li>项目url：<Input /></li>
                <li>项目描述：<Input /></li>
            </ul>
            <content>
                <h3>接口列表</h3>
                <Button>新增接口</Button>
                <ul className="project-newInterface">
                    <li>接口名称：<Input /></li>
                    <li>请求url：<Input /></li>
                    <li>请求头：
                        <Select>

                        </Select></li>
                    <li>请求方法：</li>
                    <li>请求体：</li>
                </ul>
            </content>
        </div>
    )
}

export default Project