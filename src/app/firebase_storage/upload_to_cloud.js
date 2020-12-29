import React, { useEffect, useState } from "react";

import { storage } from "../config/firebase";

export default function uploadImage(file, setFile, setURL) {

    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
        storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
                setFile(null);
                setURL(url);
            });
    });
}