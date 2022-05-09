import { Box, Grid, Button, Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SxProps } from "@mui/material";
import SectionHeader from "./SectionHeader";
// import contactBg from "assets/images/contactBox/background.png";
import { sectionMarginBottom } from "constants/styleConstants";
import ISectionHeaderStrapi from "utils/types/ISectionHeader";
import { useForm as useFormspreeForm } from "@formspree/react";
import { CheckCircleOutlineTwoTone } from "@mui/icons-material";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

type FormValues = {
  name: string;
  email: string;
  message: string;
  phone: string;
};

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number not valid"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup
      .string()
      .required("Message is required")
      .min(20, "Message too short"),
  })
  .required();

export type ContactBoxPropsType = {
  sx?: SxProps;
  header: ISectionHeaderStrapi;
};

const ContactBox: React.FC<ContactBoxPropsType> = ({ sx, header }) => {
  const [state, handleSubmit] = useFormspreeForm("moqryvpb");

  const {
    handleSubmit: hookFormSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSubmit(data);
  };

  const { succeeded } = state;

  // *************** RENDER *************** //
  return (
    <Box
      sx={{
        px: [5, 5, 12],
        py: [3, 3, 7],
        // background: `url('${contactBg}'), rgba(0,0,0,0.3)`,
        backgroundImage:
          "linear-gradient(30.91deg, rgba(143, 60, 221, 0.10) 1.01%, rgba(0,0,0,0.3) 100%)",
        border: "1px solid",
        borderImageSlice: 1,
        borderImageSource:
          "linear-gradient(168.82deg, #FB37FF 1.7%, rgba(155, 111, 238, 0) 27.12%, rgba(123, 127, 234, 0) 61.28%, #1BB2DE 99.52%)",
        backdropFilter: "blur(642.519px)",
        borderRadius: "4px",
        mb: sectionMarginBottom,
      }}
      id="contact"
    >
      <SectionHeader {...header} />
      {succeeded && (
        <Alert
          variant="outlined"
          severity="success"
          sx={{
            fontSize: "1.4rem",
          }}
          icon={
            <Box
              sx={{
                fontSize: "1.8rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CheckCircleOutlineTwoTone fontSize="inherit" />
            </Box>
          }
        >
          <Box sx={{ display: "flex", alignItems: "center" }}></Box>
          Message sent!
        </Alert>
      )}
      {!succeeded && (
        <form onSubmit={hookFormSubmit(onSubmit)}>
          <Grid container spacing={[2, 2, 4, 4]}>
            <Grid item xs={12} sm={12} md={4}>
              <Controller
                name={"name"}
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label={"Name"}
                    InputProps={{ ...field }}
                    error={errors.name ? true : false}
                    onBlur={field.onBlur}
                    helperText={<>{errors.name ? errors.name.message : ""}</>}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Controller
                name={"phone"}
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label={"Phone"}
                    InputProps={{ ...field }}
                    error={errors.phone ? true : false}
                    onBlur={field.onBlur}
                    helperText={<>{errors.phone ? errors.phone.message : ""}</>}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Controller
                name={"email"}
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label={"Email address"}
                    InputProps={{ ...field }}
                    error={errors.email ? true : false}
                    onBlur={field.onBlur}
                    helperText={<>{errors.email ? errors.email.message : ""}</>}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Controller
                name={"message"}
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label={"Message"}
                    InputProps={{ ...field }}
                    error={errors.message ? true : false}
                    onBlur={field.onBlur}
                    multiline
                    minRows={3}
                    helperText={
                      <>{errors.message ? errors.message.message : ""}</>
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", mt: [2, 2, 5] }}>
            <Button
              type="submit"
              size="large"
              variant="outlined"
              color="secondary"
              sx={{
                width: 220,
                maxWidth: "100%",
                height: 52,
              }}
            >
              Contact Us
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
};

export default ContactBox;
