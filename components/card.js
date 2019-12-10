import React, { useRef } from 'react'
import { Card, Icon } from 'antd';
import Link from 'next/link'

const CardItem = (props) => {


    const { id, projectName, text, url, moveCard, cancel, goDetail } = props
    const ref = useRef(null)

    return (
        <div ref={ref} className="cardItem" >
            <Card className="card-box"
                onClick={(e) => {
                    goDetail(e, id, projectName)
                }}
                title={projectName}
                hoverable
                bodyStyle={{ padding: '36px 28px', }}
                actions={[
                    <span key="delete" onClick={() => cancel(id)}><Icon style={{ fontSize: 18 }} title="删除" type="delete" /></span>,
                    <Link key="edit" href={url}><span ><Icon style={{ fontSize: 18 }} title="编辑" type="edit" /></span></Link>,
                    <Link key="copy" href={url}><span ><Icon style={{ fontSize: 18 }} title="复制" type="copy" /></span></Link>,
                ]}
            >
                {text}
            </Card>
            <style jsx>
                {`
                    .cardItem{
                        width: 30%;
                        margin-top: 40px;
                    }
                `}
            </style>
        </div>

    )
}
export default CardItem



