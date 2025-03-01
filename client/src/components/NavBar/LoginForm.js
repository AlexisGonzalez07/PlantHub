import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN_USER);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: "",
      password: "",
    });
  };


  return (  
      <Grid.Column >
        <Header as="h2" color="teal" textAlign="center">
          <Image src="./images/favicon.ico" /> Welcome Back!
        </Header>
        <Form size="large" style={{backgroundColor: 'yellow'}}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Button color="teal" fluid size="large" onClick={handleFormSubmit}>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us?{" "}
          <Button onClick={()=> props.setLogin(!props.login)}>
            Sign Up
          </Button>
        </Message>
      </Grid.Column>
  );
};

export default LoginForm;
