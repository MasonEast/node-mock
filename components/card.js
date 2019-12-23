import React, { useRef } from 'react'
import { Card, Icon } from 'antd';
import Link from 'next/link'

const CardItem = (props) => {


    const { id, projectName, desc, url, moveCard, deleteProject, goDetail } = props
    const ref = useRef(null)

    return (
        <div ref={ref} className="cardItem" style={{ width: '30%', marginTop: '20px' }}>
            <Card className="card-box"
                onClick={(e) => {
                    goDetail(e, id, projectName)
                }}
                title={projectName}
                hoverable
                bodyStyle={{ padding: '36px 28px', }}
                actions={[
                    <span key="delete" onClick={(e) => deleteProject(e, id)}><Icon style={{ fontSize: 18 }} title="删除" type="delete" /></span>,
                    // <Link key="edit" href={url}><span ><Icon style={{ fontSize: 18 }} title="编辑" type="edit" /></span></Link>,
                    // <Link key="copy" href={url}><span ><Icon style={{ fontSize: 18 }} title="复制" type="copy" /></span></Link>,
                ]}
            >
                {desc}
            </Card>

        </div>

    )
}
export default CardItem



