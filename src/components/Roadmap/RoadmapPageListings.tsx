import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useMemo } from "react";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
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
    height: 100,
    width: 10,
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
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, #8F3CDD 0%, rgba(48, 129, 237, 0.8) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  borderRadius: "6px",
}));

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

export type RoadmapPageListingsPropsType = {
  items: any[];
};

const RoadmapPageListings: React.FC<RoadmapPageListingsPropsType> = ({
  items,
}) => {
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
    <Box>
      <Box sx={{ maxWidth: 400, m: "0 auto" }}>
        <Stepper
          activeStep={lastActiveItem}
          connector={<ColorlibConnector />}
          orientation={"vertical"}
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
      </Box>
    </Box>
  );
};

export default RoadmapPageListings;
