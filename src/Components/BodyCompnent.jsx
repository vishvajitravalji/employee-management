import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { Styles } from "./style";
import { RenderInputText } from "./common";
import {
  AddDataToFirebase,
  GetFirebaseData,
  GetUpdatedSnapData,
  UpdateFirebaseCollectionDataById,
} from "../databaseDriver";
import UploadedData from "./UploadedData";
import { toast } from "react-toastify";

const useStyles = makeStyles(Styles);

export default function BodyComponent() {
  const classes = useStyles();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    rate: "",
  });
  const [error, setError] = useState({});
  const [Fetched, setFetched] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  //for firebase database
  const [uploadedData, setUploadedData] = useState([]);

  //for update purpose
  const [isUpdateAction, setIsUpdateAction] = useState(false);
  const [updateId, setUpdateId] = useState(false);

  const handleChange = ({ target }) => {
    const name = target.name;
    const value = target.value;

    //setting up errors
    value.length < 1
      ? (error[name] = setError({
          ...error,
          [name]: `*this field must be required`,
        }))
      : (error[name] = setError({ ...error, [name]: "" }));

    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isUpdateAction
      ? UpdateFirebaseCollectionDataById({ id: updateId, data: data })
      : AddDataToFirebase(data);

    //resetting form data.
    setData({
      firstName: "",
      lastName: "",
      email: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      rate: "",
    });

    //popup
    GetUpdatedSnapData({ Fx_RunOnUpdate: setFetched(false) });
    isUpdateAction
      ? toast.warning("Updated Successfully")
      : toast.success("Added Successfully");
  };

  //keep fetched data from firebase
  useEffect(() => {
    if (!Fetched) {
      GetFirebaseData({ setUploadedData });
      setFetched(true);
    }
  }, [Fetched, uploadedData.length]);

  //form validations for submit button
  useEffect(() => {
    let valid = false;
    Object.keys(data).forEach((item) => {
      if (data[item] && data[item] !== "") {
        valid = true;
      } else {
        valid = false;
      }
    });
    setIsFormValid(valid);
  }, [data]);

  return (
    <Grid container className={classes.formContainer}>
      <Grid item xs={12} sm={10}>
        {/* form container  */}
        <form onSubmit={handleSubmit}>
          <Paper component={Box} mb={1} p={2}>
            <Box mb={2} mt={1}>
              <Typography variant="h6" color="primary" align="center">
                Employees Availabilities
              </Typography>
            </Box>
            {/* //row */}
            <Grid container>
              <Grid item xs={12} sm={7}>
                <Card>
                  <CardContent>
                    <Box mb={2}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} sm={6}>
                          <RenderInputText
                            label="First Name"
                            name="firstName"
                            data={data}
                            error={error}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <RenderInputText
                            label="Last Name"
                            name="lastName"
                            data={data}
                            error={error}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box mb={2}>
                      <RenderInputText
                        label="Email"
                        name="email"
                        data={data}
                        error={error}
                        onChange={handleChange}
                      />
                    </Box>
                    <Box mb={2}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} sm={6}>
                          <RenderInputText
                            label="Start Date"
                            name="startDate"
                            data={data}
                            error={error}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <RenderInputText
                            label="End Date"
                            name="endDate"
                            data={data}
                            error={error}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box mb={2}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} sm={6}>
                          <RenderInputText
                            label="Start Time"
                            name="startTime"
                            data={data}
                            error={error}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <RenderInputText
                            label="End Time"
                            name="endTime"
                            data={data}
                            error={error}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                   <buttpn></buttpn>
                    <Box>
                      <Grid item xs={6} sm={12}>
                        <RenderInputText
                          label="Rate hourly"
                          name="rate"
                          data={data}
                          error={error}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Box>
                  </CardContent>
                  <Box mt={1} mb={1} p={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="small"
                      color="primary"
                      fullWidth={true}
                      disabled={!isFormValid}
                    >
                      Submit
                    </Button>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={5}>
                {/* uploaddataDiaplay */}
                <UploadedData
                  UserData={uploadedData}
                  setFetched={setFetched}
                  setData={setData}
                  setIsUpdateAction={setIsUpdateAction}
                  setUpdateId={setUpdateId}
                />
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
}
