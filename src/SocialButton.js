import React from "react";
import SocialLogin from "react-social-login";
import Button from "@material-ui/core/Button";

class SocialButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <Button
        variant="contained"
        fullWidth
        size="large"
        style={{ margin: 8 }}
        onClick={triggerLogin}
        {...props}
      >
        {children}
      </Button>
    );
  }
}

export default SocialLogin(SocialButton);
