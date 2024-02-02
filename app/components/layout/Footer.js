import Link from 'next/link'

function Footer(){
    return <div className="layout-footer">
        <div className="title">© 2023 Social Coding</div>
                <div className="hyperlink">
                    <button><Link href='https://github.com/chaunmt/Interactive-Prerequisite-Flowchart' target="_blank" style={{ textDecoration: 'none' }}>
                        Contribute to Github
                    </Link></button>
                </div>
            </div>
            
}

export default Footer