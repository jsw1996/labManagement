import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../app/common/modals/modalReducer";
import { socialLogin } from "../../app/firestore/firebaseService";

export default function SocialLogin() {
  const dispatch = useDispatch();

  function handleSocialLogin(provider) {
    dispatch(closeModal());
    socialLogin(provider);
  }
  return (
    <>
      <Form>
        <Form.Field>
          <Button
            onClick={() => handleSocialLogin("facebook")}
            icon='facebook'
            fluid
            color='facebook'
            content='Login with Facebook'
          />
        </Form.Field>
        <Form.Field>
          <Button
            onClick={() => handleSocialLogin("google")}
            icon='google'
            fluid
            color='google plus'
            content='Login with Facebook'
          />
        </Form.Field>
      </Form>
    </>
  );
}
