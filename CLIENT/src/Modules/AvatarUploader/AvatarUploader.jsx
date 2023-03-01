import { makeStyles } from "@mui/styles";
import MuiButton from '@mui/material/Button'
import MuiAvatar from '@mui/material/Avatar';
import { grey } from "@mui/material/colors";
import { Delete as MuiDelete } from "@mui/icons-material";
import MuiCloudUpload from '@mui/icons-material/AddAPhoto';
import { spacing } from "@mui/system";
import React, { createRef } from "react";
import styled from "styled-components";
import { createTheme } from '@mui/material/styles';

const Button = styled(MuiButton)(spacing);
const UploadIcon = styled(MuiCloudUpload)(spacing);
const DeleteIcon = styled(MuiDelete)(spacing);

const CenteredContent = styled.div`
    text-align: center;
    flex: 1;
  display: flex;
  flex-direction: column;
  
  `;
const theme = createTheme();

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        "& > *": {
            margin: theme.spacing(1)
        }
    },
    large: {
        width: theme.spacing(24),
        height: theme.spacing(24),
        cursor: 'pointer'
    }
}));

const BigAvatar = styled(MuiAvatar)`
    width: 150px;
    height: 150px;
    margin: 0 auto 14px;
    border: 1px solid ${grey[500]};
    box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};
  `;

const AvatarContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;


const AvatarUpload = (props) => {

    const classes = useStyles(theme);
    let buttonColor = "primary";

    const { image, updateImage, imagetaker, setTaker } = props;
    const inputFileRef = createRef(null);
    const inputEditRef = createRef(null);
    const cleanup = () => {
        updateImage(null);
        URL.revokeObjectURL(image);
        inputFileRef.current.value = null;
        inputEditRef.current.value = null;
    };

    const setImage = (newImage) => {
        if (image) {
            cleanup();
        }
        updateImage(newImage);
    };

    const handleOnChange = (event) => {
        const newImage = event.target?.files?.[0];

        if (newImage) {
            setTaker(newImage);
            setImage(URL.createObjectURL(newImage));
        }
    };

    /**
     *
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
     */
    const handleClick = (event) => {
        if (image) {
            event.preventDefault();
            setImage(null);
            setTaker(null);
        }
    };

    if (image)
        buttonColor = "error";

    return (
        <AvatarContent>
            <CenteredContent>
                <input
                    ref={inputEditRef}
                    accept="image/*"
                    hidden
                    id="avatar-image-edit"
                    type="file"
                    onChange={handleOnChange}
                />
                <label htmlFor="avatar-image-edit">
                    <BigAvatar
                        className={classes.large}
                        $withBorder
                        alt="Avatar"
                        src={image || "/static/img/avatars/default-profile.svg"}
                    />
                </label>
                <input
                    ref={inputFileRef}
                    accept="image/*"
                    hidden
                    id="avatar-image-upload"
                    type="file"
                    onChange={handleOnChange}
                />
                <label htmlFor="avatar-image-upload">
                    <Button
                        variant="contained"
                        color={buttonColor}
                        component="span"
                        mb={2}
                        onClick={handleClick}
                    >
                        {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
                        {image ? "Remove Picture" : "Upload Picture"}
                    </Button>
                </label>
            </CenteredContent>
        </AvatarContent>
    );
};

export default AvatarUpload;