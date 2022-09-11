import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../../Components/topbar/Topbar";
import "./uploadDocument.css";
function UploadDocument() {
    let [file, setFile] = useState(null);
    let navigate = useNavigate();
    async function handleSubmit(event) {
        event.preventDefault();
        // let documentData = {
        //     userId: "631ca720f87ba3151aa44297",

        // }

        let documentData = {
            userId: "631ca720f87ba3151aa44297",
            // fileName: `${randomUUID()}.${ext}`,
            // originalName: file.name,
            // ext,
        };
        // console.log(file)
        // if (file.size > 5000) {
        //     alert("File too big!");
        //     setFile(null);
        //     return;
        // }
        if (file) {
            let fileName = new Date();
            fileName = fileName.getSeconds() + file.name;
            let ext = file.name.split(".");
            ext = ext[ext.length - 1];
            documentData.fileName = fileName;
            documentData.originalName = file.name;
            documentData.ext = ext;
            documentData.size = file.size;
            let formData = new FormData();
            formData.append("file", file);
            // formData.append("name", fileName);
            try {
                await axios.post("http://localhost:3200/upload", formData)

            } catch (error) {
                console.log(error)
            }
        }
        // console.log(documentData);
        await axios.post("http://localhost:3200/documents", documentData)
            .then((res) => {
                navigate("/");
            }).catch(error => console.log(error))
    }
    return (
        <>
            <Topbar />
            <div className="uploads">
                <form onSubmit={handleSubmit} className="uploadForm">
                    <h2 style={{ textAlign: "center" }}>Upload Document</h2>
                    <div className="uploadFile">
                        <input type="file" id="myfile" name="file" accept=".pdf,.csv,.xlsx" onChange={(e) => setFile(e.target.files[0])} /><br /><br />
                        {/* <label for="files" class="btn">Browse File</label> */}
                    </div>
                    <input className="uploadBtn" type="submit" value={"Upload File"} />
                </form>
            </div>
        </>
    )
}

export default UploadDocument;