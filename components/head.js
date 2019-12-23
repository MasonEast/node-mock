import Head from 'next/head';
import 'antd/dist/antd.css'

export default ({ children }) => (
    <div>
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta charSet='utf-8' />
            <title>Node-Mock</title>
        </Head>
        <style jsx global>{`
      .editable-cell {
        position: relative;
      }
      
      .editable-cell-value-wrap {
        padding: 10px 12px;
        cursor: pointer;
      }
      
      .editable-row:hover .editable-cell-value-wrap {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 9px 11px;
      }
    `}</style>
        {children}
    </div>
);