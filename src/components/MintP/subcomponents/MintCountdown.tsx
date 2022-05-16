import { Box, Paper, Typography } from "@mui/material";
import Countdown from "react-countdown";

interface MintCountdownProps {
  date: Date | undefined;
  style?: React.CSSProperties;
  status?: string;
  onComplete?: () => void;
}

interface MintCountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const itemStyle = {
  fontWeight: "bold",
  fontSize: 18,
};

export const MintCountdown: React.FC<MintCountdownProps> = ({
  date,
  status,
  style,
  onComplete,
}) => {
  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: MintCountdownRender) => {
    hours += days * 24;
    if (completed) {
      return status ? (
        <Typography
          sx={(theme) => ({
            display: "flex",
            margin: 0,
            marginBottom: theme.spacing(0.5),
            height: theme.spacing(3.5),
            padding: theme.spacing(1),
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          })}
        >
          {status}
        </Typography>
      ) : null;
    } else {
      return (
        <Box
          sx={(theme) => ({
            display: "flex",
            padding: theme.spacing(0),
            "& > *": {
              margin: theme.spacing(0.2),
              height: theme.spacing(6),
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 10,
              ...style,
            },
          })}
        >
          <Paper elevation={0}>
            <Typography component="span" sx={itemStyle}>
              {hours < 10 ? `0${hours}` : hours}
            </Typography>
            <span>hrs</span>
          </Paper>
          <Paper elevation={0}>
            <Typography component="span" sx={itemStyle}>
              {minutes < 10 ? `0${minutes}` : minutes}
            </Typography>
            <span>mins</span>
          </Paper>
          <Paper elevation={0}>
            <Typography component="span" sx={itemStyle}>
              {seconds < 10 ? `0${seconds}` : seconds}
            </Typography>
            <span>secs</span>
          </Paper>
        </Box>
      );
    }
  };

  if (date) {
    return (
      <Countdown
        date={date}
        onComplete={onComplete}
        renderer={renderCountdown}
      />
    );
  } else {
    return null;
  }
};
