import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

const Currencies = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [currency, setCurrency] = useState<Currency[]>();
  const [updated, setUpdated] = useState<string>();

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("user-joined", (res: Currency[]) => {
      setCurrency(res);
    });

    socket.on("newData", (res: { data: Currency[]; latestUpdated: string }) => {
      setCurrency(res.data);
      setUpdated(res.latestUpdated);
    });

    return () => {
      socket.off("connect", () => {
        setIsConnected(true);
      });
      socket.off("disconnect", () => {
        setIsConnected(false);
      });
    };
  }, []);
  return (
    <>
      <Grid container spacing={4}>
        {isConnected &&
          currency?.map((item) => (
            <React.Fragment key={item.name}>
              <Grid display={"flex"} justifyContent={"center"} size={4}>
                {item.name}
              </Grid>
              <Grid display={"flex"} justifyContent={"center"} size={4}>
                {item.info}
              </Grid>
              <Grid display={"flex"} justifyContent={"center"} size={4}>
                {updated === item.name ? (
                  <Typography variant="subtitle1" color="success">
                    {item.price} $
                  </Typography>
                ) : (
                  <Typography variant="subtitle2">{item.price} $</Typography>
                )}
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
    </>
  );
};

export default Currencies;
