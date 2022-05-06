import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { styled } from "@mui/system";
import { useMemo } from "react";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(103.91deg, #8F3CDD 21.01%, rgba(48, 129, 237, 0.8) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(103.91deg, #8F3CDD 21.01%, rgba(48, 129, 237, 0.8) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, #8F3CDD 0%, rgba(48, 129, 237, 0.8) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  // ...(ownerState.completed && {
  //   backgroundImage:
  //     "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  // }),
  borderRadius: "6px",
}));

export type MileStonesListingsPropsType = {
  items: any[];
};

const ColorlibStepIcon: React.FC<StepIconProps> = ({
  active,
  completed,
  className,
}) => {
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      <Box
        sx={{
          width: "20px",
          height: "20px",
          background: "#000",
          borderRadius: "4px",
          border: "1px solid rgba(255,255,255,0.35)",
        }}
      />
    </ColorlibStepIconRoot>
  );
};

const MileStonesListings: React.FC<MileStonesListingsPropsType> = ({
  items,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const lastActiveItem = useMemo(() => {
    let activeItem: number | undefined = undefined;
    for (let index = items.length - 1; index > 0; index--) {
      const element = items[index];
      if (element.attributes.completed) {
        activeItem = index;
        break;
      }
    }
    return activeItem;
  }, [items]);

  // *************** RENDER *************** //
  return (
    <Stepper
      alternativeLabel
      activeStep={lastActiveItem}
      connector={isMobile ? undefined : <ColorlibConnector />}
      orientation={isMobile ? "vertical" : "horizontal"}
    >
      {items.map((item) => {
        const { attributes } = item;
        const { name, completed, description } = attributes || {};
        return (
          <Step key={name}>
            <StepLabel
              StepIconComponent={() => (
                <ColorlibStepIcon active={completed} icon={undefined} />
              )}
            >
              <Box sx={{ px: 1 }}>
                <Typography>{name}</Typography>
                <Box sx={{ fontWeight: 300, mt: 1.5 }}>{description}</Box>
              </Box>
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default MileStonesListings;
