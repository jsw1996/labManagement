import React, { useState } from "react";
import firebase from "../../config/firebase";
import ImageUploader from 'react-images-upload';
import { Fragment } from "react";

export default function MyImageInput(props) {
    const [file, setFile] = useState(null);
    // const [url, setURL] = useState("");

    function handleChange(e) {
        setFile(e.target.files[0]);
        props.callback(e.target.files[0]);
    }

    // function handleUpload(e) {
    //     e.preventDefault();
    //     const uploadTask = firebase.storage.ref(`/images/${file.name}`).put(file);
    //     uploadTask.on("state_changed", console.log, console.error, () => {
    //         firebase.storage
    //             .ref("images")
    //             .child(file.name)
    //             .getDownloadURL()
    //             .then((url) => {
    //                 setFile(null);
    //                 setURL(url);
    //             });
    //     });
    // }

    // return (
    //     <div>
    //         <form onSubmit={handleUpload}>
    //             <input type="file" onChange={handleChange} />
    //             <button disabled={!file}>upload to firebase</button>
    //         </form>
    //         <img src={url} alt="" />
    //     </div>
    // );

    return (
        // <ImageUploader
        //     id='photo'
        //     style={{ border: '1px solid Gainsboro', borderRadius: '4px', marginBottom: '0' }}
        //     withIcon={true}
        //     buttonText='upload profile iamge'
        //     onChange={handleChange}
        //     imgExtension={['.jpg', '.gif', '.png', '.gif']}
        //     maxFileSize={5242880}
        // />
        <div>
            <input type='file' onChange={handleChange}></input>
            {/* <img src={file}> </img> */}
        </div>
    );
}