import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

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
import Avatar from "@mui/material/Avatar";
import s from "./SettingsProfile.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SettingProfile() {
  const dispatch = useDispatch();
  const login = useAuth0();
  const [id, setId] = useState(false);
  const [InitImg, setInitImg] = useState("");

  useEffect(() => {
    setId(login.user?.sub);
  }, [login]);

  const { jobs } = useSelector((state) => state);
  const countries = useSelector((state) => state.allCountries);
  const user = useSelector((state) => state.users);
  const userAuth = useSelector((state) => state.authState);
  const uploadedImage = useSelector((state) => state.uploadedImg);
  const navigate = useNavigate();
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
  });
  const [inputJobs, setInputJobs] = useState([]);

  useEffect(() => {
    if (user.Worker) {
      if (user.Worker.Jobs) {
        user.Worker.Jobs.map((e) => {
          setInputJobs([e.name]);
        });
      }
      if (user.Worker.description) {
        setInputWork((inputWork.description = user.Worker.description));
      }
      if (user.Worker.certification) {
        setInputWork((inputWork.certification = user.Worker.certification));
      }
    }
  }, []);

  const [workMax, setWorkMax] = useState(false);
  const [validateWorks, setValidateWorks] = useState(false);

  const handleJob = (e) => {
    const exist = inputJobs.find((job) => job === e.target.value);
    if (!exist) {
      setInputJobs([e.target.value]);
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
    setInitImg(uploadedImage.url);
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
    if (user.Worker?.certification) {
      setInputWork({
        ...inputWork,
        [inputWork.certification]: user.Worker.certification,
      });
    }
    if (user.Worker?.description) {
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
          <h1>Editar perfil</h1>
          <div className={s.pictureContainer}>
            <Avatar src={InitImg} sx={{ width: 86, height: 86 }} />
            <Button
              className={s.buttonImage}
              variant="contained"
              component="label"
            >
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
            {image === "" || image === undefined ? (
              ""
            ) : (
              <div className={s.imageUpload}>
                <Button
                  className={s.buttonImage}
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
                Imagen subida correctamente, persiona el botón Send para guardar
                los cambios
              </span>
            ) : (
              ""
            )}
          </div>
          <div className={s.bloke}>
            <div className={s.blokeField}>
              <span className={s.labelInput}>Telefono</span>
              <TextField
                id="outlined-required"
                name="phone"
                fullWidth
                value={input.phone}
                placeholder={"112324592"}
                /* defaultValue={user.phone}  */
                onChange={handleChange}
              />
            </div>
            <div className={s.blokeField}>
              <span className={s.labelInput}>Trabajo</span>
              <TextField
                id="outlined-required"
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
            <div className={s.blokeField}>
              <span className={s.labelInput}>Descripción</span>
              <TextField
                id="outlined-required"
                name="description"
                multiline
                value={inputWork.description}
                rows={4}
                maxRows={4}
                fullWidth
                aria-label="maximum height"
                placeholder={"Descripción breve sobre tí"}
                defaultValue=""
                // style={{ width: 200 }}
                onChange={handleChangeWork}
              />
            </div>
          </div>

          <div className={s.premium}>
            <div className={s.sendPremium}>
              <Button
                // fullWidth
                type="submit"
                variant="contained"
                endIcon={<SendIcon />}
                sx={{ marginRight: 2 }}
              >
                ENVIAR
              </Button>
              <Button
                // fullWidth
                type="submit"
                variant="contained"
                onClick={handlePremium}
                sx={{
                  background: "#ffa600",
                  border: "2px solid #ffa600",
                  color: "black",
                  "&:hover": {
                    // background: "red",
                    color: "white",
                    border: "none",
                  },
                }}
              >
                PREMIUM
              </Button>
            </div>
            <h4>¡Convertirse en premium!</h4>

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
                Tus datos se modificaron correctamente
              </Alert>
            </Snackbar>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className={s.all}>
      <div className={s.containerSetting}>
        <form onSubmit={onSubmit}>
          <h1>Editar perfil</h1>
          <div className={s.bloke}>
            <h3 className="pad">Telefono</h3>
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
            <h3 className="pad">Imagen</h3>
            <div className={s.im}>
              <TextField
                id="outlined-required"
                name="img"
                value={input.img}
                /* defaultValue={user.img}  */
                onChange={handleChange}
              />

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
                {/* </div> */}
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
          </div>

          {/* renderizado condicional para el worker solamente */}
          <div>
            {user.Worker && (
              <>
                <div className={s.bloke}>
                  <h3 className="pad">Descripcion</h3>
                  <div className={s.campos}>
                    {/* <TextField
                      id="outlined-required"
                      name="description"
                      type="text"
                      value={inputWork.description}
                      placeholder={user.Worker.description}
                      
                      onChange={handleChangeWork}
                    /> */}
                    <TextareaAutosize
                      id="outlined-required"
                      name="description"
                      value={inputWork.description}
                      maxRows={4}
                      aria-label="maximum height"
                      placeholder={user.Worker.description}
                      defaultValue=""
                      style={{ width: 200 }}
                      onChange={handleChangeWork}
                    />
                  </div>
                </div>

                <div className={s.bloke}>
                  <h3 className="pad">Certificacion</h3>
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
                  <h3 className="pad">Trabajo</h3>
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
                          <div>
                            <Button
                              size="large"
                              onClick={handleDelete}
                              id={index}
                              key={job}
                            >
                              {job}
                            </Button>
                          </div>
                        ))
                      : null}
                  </ButtonGroup>
                </div>

                <div className={s.premium}>
                  <h3>¿Quieres convertirte en premium? </h3>
                  <h4>CLICK AQUI!</h4>
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handlePremium}
                  >
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
                      Tus datos se modificaron correctamente
                    </Alert>
                  </Snackbar>
                </div>
              </>
            )}
          </div>
          <div className={s.infoExtra}>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              ENVIAR
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
