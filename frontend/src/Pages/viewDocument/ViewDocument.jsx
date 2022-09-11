import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import DocViewer from "react-doc-viewer";
function ViewDocument() {
    let { fileName } = useParams();
    let Static_Folder = process.env.STATIC_FILES;

    const docs = [
        { uri: `${Static_Folder}${fileName}` },
    ];
    // const docs = [
    //     { uri: "https://url-to-my-pdf.pdf" },
    //     { uri: require("./example-files/pdf.pdf") }, // Local File
    //   ];
    // useEffect(() => {
    //     axios.get("")
    // }, [fileName])
    // <DocViewer documents={{ uri: `${Static_Folder}${fileName}` }} />
    // return <DocViewer documents={docs} />
    return (
        <div>
            <h2>helloe</h2>
            <DocViewer documents={docs} />
        </div>
    )
}

export default ViewDocument;