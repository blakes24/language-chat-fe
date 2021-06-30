import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/logout";
import { setLocalStorage } from "../../helpers/localStorage";
import { useHistory } from "react-router-dom";
import ChatApi from "../../helpers/api";

function DeleteUserModal({ open, handleToast, handleClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.users.current);

  const deleteAccount = async () => {
    try {
      await ChatApi.deleteUser(user.id);
      handleToast("account deleted");
      setLocalStorage("token", "");
      dispatch(logoutUser());
      history.push("/");
    } catch (err) {
      handleToast(err[0] || err);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="delete-alert">
      <DialogContent>
        <DialogContentText id="delete-alert" color="secondary">
          Are you sure you want to delete your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="secondary"
          id="cancel"
        >
          Cancel
        </Button>
        <Button
          id="delete"
          onClick={deleteAccount}
          color="primary"
          variant="contained"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserModal;
