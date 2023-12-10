
function PageHeader(){
    return <div className="header">
            <nav> 
            <a href='../'><img src="https://i.ibb.co/ZBLJYqL/Gophers-1-2.png" alt="umn_prerequisite_logo"/></a>
            <ul>
            <li><Link href={`/${params.subj}`}><button>{subj} Page</button></Link></li>
            <li><Link href="./table"><button>{subj} Table</button></Link></li>
        <li><a href='https://github.com/chaunmt/Interactive-Prerequisite-Flowchart' target="_blank">Contribute to Github</a></li>
    </ul>
    </nav>
</div>
}

export default PageHeader;