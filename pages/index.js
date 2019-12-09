
import Link from 'next/link'
import { Button } from 'antd'
// import Layout from '../components/layout';
import 'antd/dist/antd.css'
import axios from 'axios'
import Qs from 'qs'

const Home = ({ }) => {
    const handleAdd = async () => {
        // const res = await axios({
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //     },
        //     url: 'http://127.0.0.1:3000/api/add',
        //     body: Qs.stringify({
        //         name: 'mason',
        //         url: '111'
        //     })
        // })
        const res = await axios({
            method: 'get',
            url: 'http://127.0.0.1:3000/api/project',
        })
        console.log(res)
    }
    return (

        <div>
            <Link href="/about">
                <Button onClick={handleAdd}>添加项目</Button>
            </Link>
            <content>
                111
            </content>
        </div>
    )
}

// Home.getInitialProps = async ({ req }) => {
//     const res = await axios({
//         method: 'post',
//         url: 'localhost:3000/api/add',
//         body: {
//             name: 'mason',
//             url: '111'
//         }
//     })
//     console.log(res)
//     // const json = res
//     // return { stars: json.stargazers_count }
// }

export default Home