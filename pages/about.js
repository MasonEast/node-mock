// This is the Link API
import Link from 'next/link'
import { Button } from 'antd'
import Layout from '../components/layout';

const Index = () => (
    <Layout>
        <Link href="/about">
            <a>dddg</a>
        </Link>
        <Button>Hello Next.js</Button>
    </Layout>
)

export default Index