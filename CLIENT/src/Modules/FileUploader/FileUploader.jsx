import React, { useState } from 'react';
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
//import { flexbox } from '@mui/system';
import Toast from '../UiModules/Core/Toast/Toast';

const Uploader = (props) => {
    const defaultLimit = 4;
    const { files, setFiles, label, limit, minHeight, maxWidth, accept } = props;
    const [imgSource, setImgSource] = useState('');

    console.log('files',files)

    const updateFiles = (incommingFiles) => {

        if (limit) {
            if (incommingFiles.length > limit) {
                Toast('limit exceeding', 'error')

            }
        } else if (incommingFiles.length > defaultLimit) {
            Toast('limit exceeding default', 'error')
        }

        let newFiles = incommingFiles;

        if (incommingFiles.length > 1 && limit === 1) {
            newFiles = incommingFiles.filter((x) => x.id !== incommingFiles[0].id);
            console.log('New files',newFiles[0]);
            newFiles[0].valid = true;
        }
        newFiles = newFiles.filter((x) => x.valid !== false);
        console.log("New File/s", newFiles);
        setFiles(newFiles);

    };

    const onDelete = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };

    const handleSee = (imageSource) => {
        console.log(imageSource);
        setImgSource(imageSource);
    };

    const handleClean = (files) => {
        console.log("list cleaned", files);
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <Dropzone
                    style={{ minWidth: "100px", maxWidth: maxWidth || "800px" }}
                    //view={"list"}
                    onChange={updateFiles}
                    minHeight={minHeight || "97px"}
                    onClean={handleClean}
                    value={files}
                    maxFiles={limit || defaultLimit}
                    // behaviour='replace'
                    //header={false}
                    // footer={false}
                    maxFileSize={5242880}
                    label={label || "Add Files Here"}
                    //label="Suleta tus archivos aquí"
                    accept={accept || ".png,image/*"}
                    // uploadingMessage={"Uploading..."}
                    // url="http://ec2-99-99-9-9.compute-1.amazonaws.com:2800/upload-my-file"
                    //of course this url doens´t work, is only to make upload button visible
                    //uploadOnDrop
                    //clickable={false}
                //localization={"FR-fr"}
                //disableScroll
                >
                    {files.map((file) => (
                        <FileItem
                            {...file}
                            key={file.id}
                            onDelete={onDelete}
                            onSee={handleSee}
                            //localization={"ES-es"}
                            //resultOnTooltip
                            preview
                            info
                            hd
                        />
                    ))}
                    <FullScreenPreview
                        imgSource={imgSource}
                        openImage={imgSource}
                        onClose={(e) => handleSee(undefined)}
                    />
                </Dropzone>
            </div>
        </>
    );
}

export default Uploader;
