import { Button } from "@material-ui/core";
import { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { uploadFile } from "../helpers/upload";

const useStyles = makeStyles({
  root: {
    margin: 0,
    width: 200,
    padding: 0,
  },
  form: {
    width: "100%",
  },
  imgContainer: {
    width: 200,
    height: 200,
    border: "2px solid gray",
    marginBottom: ".2rem",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    marginRight: ".2rem",
    flexGrow: 1,
  },
  btnCancel: {
    marginLeft: ".2rem",
    flexGrow: 0.5,
  },
});

function ImageUploader({ imageUrl }) {
  const currentImage = imageUrl || "/profile-placeholder.png";
  const classes = useStyles();
  const fileSelect = useRef(null);
  const [image, setImage] = useState(currentImage);
  const [file, setFile] = useState(null);

  async function handleFileSelect() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function handleChange(e) {
    let selected = e.target.files[0];
    let preview = URL.createObjectURL(selected);
    console.log("prev", preview);
    setImage(preview);
    setFile(selected);
  }

  function handleUpload() {
    const url = uploadFile(file);
    setImage(url);
    setFile(null);
    // TODO send url to backend
  }

  function handleCancel() {
    setFile(null);
    setImage(currentImage);
  }
  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        <img src={image} alt="avatar" className={classes.img} />
      </div>

      <form className={classes.form}>
        {file ? (
          <div className={classes.btnContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              type="button"
              className={classes.btn}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCancel}
              type="button"
              className={classes.btnCancel}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFileSelect}
            type="button"
            fullWidth
          >
            Change Image
          </Button>
        )}

        <input
          ref={fileSelect}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default ImageUploader;
