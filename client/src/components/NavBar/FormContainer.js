import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Grid } from "semantic-ui-react";
const FormContainer = () => {
  const [login, setLogin] = useState(true);
  const [minWidth, setMinWidth] = useState(0);
  useEffect(() => {
    const windowWidth = window.innerWidth;
    const percentageWidth = windowWidth * 0.9;
    const minColumnWidth = Math.min(450, percentageWidth);
    setMinWidth(minColumnWidth);
  }, []);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        marginTop: 1,
      }}
    >
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{ width: minWidth }}
      >
        {login ? (
          <LoginForm login={login} setLogin={setLogin} />
        ) : (
          <SignUpForm login={login} setLogin={setLogin} />
        )}
      </Grid>
    </div>
  );
};

export default FormContainer;
