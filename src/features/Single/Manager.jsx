import React, { useEffect, useState } from "react";
import { Segment, Button, Header, Grid, Card } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { listenToSelectedProfile } from "../profileActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyImageInput from "../../app/common/form/MyImageInput";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import MySelectInput from "../../app/common/form/MySelectInput";
import { categoryData } from "../../app/api/categoryOptions";
import MyDateInput from "../../app/common/form/MyDateInput";
import { projectData } from "../../app/api/projectOptions";
import useFirestoreDoc from "../../app/hooks/useFirestoreDoc";
import {
  listenToProfileFromFirestore,
  updateProfileInFirestore,
  addProfileToFirestore,
} from "../../app/firestore/firestoreService";
import { storage } from "../../app/config/firebase";
import 'firebase/storage'
import LoadingComponent from "../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import ImageUploader from 'react-images-upload';
import "../../app/layout/style.css";
import uploadImage from "../../app/firebase_storage/upload_to_cloud";



export default function Manager({ match, history }) {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToProfileFromFirestore(match.params.id),
    data: (profile) => dispatch(listenToSelectedProfile(profile)),
    deps: [match.params.id, dispatch],
  });

  const { selectedProfile } = useSelector((state) => state.profile);

  function imageCallback(imageFile) {
    setFile(imageFile);
  }

  const validationSchema = Yup.object({
    name: Yup.string().required("You must provide a name"),
    since: Yup.string().required("You must provide the year"),
    project: Yup.string().required(),
    teamLeader: Yup.string().required(),
    spec: Yup.string().required("You must provide a specialization"),
    position: Yup.string().required("You must provide a position"),
    description: Yup.string().required("You must provide a description"),
  });

  const initialValues = selectedProfile ?? {
    name: "",
    since: "",
    project: "",
    teamLeader: "",
    spec: "",
    position: "",
    description: "",
    photoURL:
      "https://cdn2.iconfinder.com/data/icons/facebook-51/32/FACEBOOK_LINE-01-512.png",
  };

  if (loading) return <LoadingComponent content='Loading profile...' />;

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            selectedProfile
              ? await updateProfileInFirestore(values)
              : await addProfileToFirestore(values);
            uploadImage(file, setFile, setURL);
            setSubmitting(false);

            history.push("/members");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <Grid>
              <Grid.Column width={5}>
                <Card>
                  <Card.Content>
                    <Header sub color='violet' content='Edit Details' />
                    <MyTextInput name='name' placeholder='Name' />
                    {/* <ImageUploader
                      id='photo'
                      style={{ border: '1px solid Gainsboro', borderRadius: '4px', marginBottom: '0' }}
                      withIcon={true}
                      buttonText='upload profile iamge'
                      // onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
                    /> */}
                    <MyImageInput callback={imageCallback} />
                    <MyTextInput name='teamLeader' placeholder='Team Leader' />
                    <MyTextInput name='position' placeholder='Position' />
                  </Card.Content>
                </Card>
                <Card>
                  <Card.Content>
                    <Header sub color='violet' content='Edit Categories' />
                    <Header
                      sub
                      color='violet'
                      content='Specialization'
                      size='large'
                    />
                    <MySelectInput
                      name='spec'
                      placeholder='Specialization'
                      options={categoryData}
                    />
                    <Header
                      sub
                      color='violet'
                      content='Projects'
                      size='large'
                    />
                    <MySelectInput
                      name='project'
                      placeholder='Projects'
                      options={projectData}
                    />
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={10}>
                <Header sub color='violet' content='Joined since' />
                <MyDateInput
                  name='since'
                  placeholderText='Joined since'
                  dateFormat='MMMM d, yyyy'
                />
                <MyTextArea
                  name='description'
                  placeholder='Description'
                  rows={10}
                />
              </Grid.Column>
            </Grid>
            <Button
              floated='right'
              type='submit'
              positive
              content='Submit'
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
            />
            <Button
              floated='right'
              disabled={isSubmitting}
              type='submit'
              content='Cancel'
              as={Link}
              to='/members'
            />
          </Form>
        )}
      </Formik>
    </Segment >
  );
}
