import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {
  getJobs,
  getUserId,
  updateUser,
  updateWorker,
  get_countries,
  uploadImage,
} from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import s from "./SettingsProfile.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SettingProfile() {
  const dispatch = useDispatch();
  const {
    user: { sub },
  } = useAuth0();
  const { jobs } = useSelector((state) => state);
  const countries = useSelector((state) => state.allCountries);
  const user = useSelector((state) => state.users);
  const userAuth = useSelector((state) => state.authState);
  const uploadedImage = useSelector((state) => state.uploadedImg);
  const navigate = useNavigate();
  const id = sub;
  const [openLogin, setOpenLogin] = useState(false);
  //const id = userAuth.user.id
  const [input, setInput] = useState({
    location: user.location,
    phone: user.phone,
    img: user.img,
  });

  const [inputWork, setInputWork] = useState({
    certification: "",
    description: "",
    // jobs: [user.Worker.Jobs]
  });
  const [inputJobs, setInputJobs] = useState([]);
  const [workMax, setWorkMax] = useState(false);
  const [validateWorks, setValidateWorks] = useState(false);

  const handleJob = (e) => {
    const exist = inputJobs.find((job) => job === e.target.value);
    if (!exist) {
      setInputJobs([...inputJobs, e.target.value]);
      // setInputWork((prevState) => ({
      //   ...prevState,
      //   jobs: inputJobs,
      // }))
    }
  };

  const handleDelete = (e) => {
    setInputJobs([
      ...inputJobs.filter((job, index) => index !== parseInt(e.target.id)),
    ]);
  };

  //////////////////CLOUDINARY STUFF//////////////////////
  const [image, setImage] = useState("");
  const [uploaded, setUploaded] = useState(false);
  useEffect(() => {
    setInput((prevState) => ({
      ...prevState,
      img: uploadedImage.url,
    }));
  }, [uploadedImage]);

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "jobplatform");

  const handleImgChange = (e) => {
    if (e.target.files !== undefined) {
      setImage(e.target.files[0]);
    } else {
      setImage("");
    }
  };
  const uploadImageHandler = () => {
    if (image !== "" && image !== undefined) {
      dispatch(uploadImage(formData));
      setImage("");
    }
  };
  ////////////////////////////////////////////////////////

  useEffect(() => {
    dispatch(getUserId(id));
    dispatch(getJobs());
    dispatch(get_countries());
    if (user.Worker.certification) {
      setInputWork({
        ...inputWork,
        [inputWork.certification]: user.Worker.certification,
      });
    }
    if (user.Worker.description) {
      setInputWork({
        ...inputWork,
        [inputWork.description]: user.Worker.description,
      });
    }
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(input, id));
    dispatch(updateWorker(inputWork, inputJobs, user.Worker.ID));
    setOpenLogin(true);
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleChangeWork(e) {
    setInputWork({
      ...inputWork,
      [e.target.name]: e.target.value,
    });
  }

  function handlePremium() {
    navigate("/profile/settings/premium");
  }

  const handleClosePopUp = () => {
    setOpenLogin(false);
  };

  return (
    <div className={s.all}>
      <div className={s.containerSetting}>
        <form onSubmit={onSubmit}>
          <h1>Edit profile</h1>
          <div className={s.bloke}>
            <h3 className="pad">Location</h3>
            <div className={s.campos}>
              <TextField
                id="outlined-required"
                name="location"
                select
                value={input.location}
                /* defaultValue={user.location} */
                onChange={handleChange}
              >
                {countries &&
                  countries.map((country) => (
                    <MenuItem key={country.id} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
          </div>

          <div className={s.bloke}>
            <h3 className="pad">Phone</h3>
            <div className={s.campos}>
              <TextField
                id="outlined-required"
                name="phone"
                value={input.phone}
                /* defaultValue={user.phone}  */
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={s.bloke}>
            <h3 className="pad">Image</h3>
            <div className={s.campos}>
              <TextField
                id="outlined-required"
                name="img"
                value={input.img}
                /* defaultValue={user.img}  */
                onChange={handleChange}
              />
            </div>
            <div className={s.UploadIMGDIV}>
              <div className={s.btnImg}>
                <Button variant="contained" component="label">
                  Selecionar archivo
                  <input
                    name="img"
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleImgChange}
                  />
                </Button>
              </div>
              <span className="imgName">{`${
                image === "" || image === undefined
                  ? ""
                  : image.name.length < 15
                  ? image.name
                  : `${image.name.slice(0, 15)}...`
              }`}</span>
              {image === "" || image === undefined ? (
                ""
              ) : (
                <div className={s.imageUpload}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={uploadImageHandler}
                  >
                    Subir Imagen
                  </Button>
                </div>
              )}
              {uploaded === true ? (
                <span className="SuccessIMG">
                  Imagen subida correctamente, persiona el botón Send para
                  guardar los cambios
                </span>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* renderizado condicional para el worker solamente */}
          <div>
            {user.Worker && (
              <>
                <div className={s.bloke}>
                  <h3 className="pad">Description</h3>
                  <div className={s.campos}>
                    <TextField
                      id="outlined-required"
                      name="description"
                      type="text"
                      value={inputWork.description}
                      placeholder={user.Worker.description}
                      /* defaultValue={user.password} */
                      onChange={handleChangeWork}
                    />
                  </div>
                </div>

                <div className={s.bloke}>
                  <h3 className="pad">Certification</h3>
                  <div className={s.campos}>
                    <TextField
                      id="outlined-required"
                      name="certification"
                      type="text"
                      value={inputWork.certification}
                      placeholder={user.Worker.certification}
                      /* defaultValue={user.password} */
                      onChange={handleChangeWork}
                    />
                  </div>
                </div>

                <div className={s.bloke}>
                  <h3 className="pad">Jobs</h3>
                  <div className={s.campos}>
                    <TextField
                      id="outlined-required"
                      label="Jobs"
                      name="jobs"
                      type="text"
                      select
                      value={inputJobs}
                      placeholder="Select your jobs"
                      defaultValue="Select your jobs"
                      onChange={handleJob}
                    >
                      {jobs &&
                        jobs.map((job) => (
                          <MenuItem key={job.id} id={job.id} value={job.name}>
                            {job.name}
                          </MenuItem>
                        ))}
                    </TextField>
                  </div>
                </div>
                <div className={s.Jobs}>
                  <ButtonGroup fullWidth variant="outlined">
                    {inputJobs.length
                      ? inputJobs.map((job, index) => (
                          <Button
                            size="large"
                            onClick={handleDelete}
                            id={index}
                            key={job}
                          >
                            {job}
                          </Button>
                        ))
                      : null}
                  </ButtonGroup>
                </div>
              </>
            )}
          </div>
          <div className={s.premium}>
            <h3>You want to be a premium worker? </h3>
            <h4>PUNCHASE HERE!</h4>
            <Button type="submit" variant="contained" onClick={handlePremium}>
              PREMIUM
            </Button>

            <Snackbar
              open={openLogin}
              autoHideDuration={3000}
              onClose={handleClosePopUp}
            >
              <Alert
                onClose={handleClosePopUp}
                severity="success"
                sx={{ width: "100%" }}
              >
                Your information was successfully modified
              </Alert>
            </Snackbar>
          </div>
          <div className={s.infoExtra}>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
