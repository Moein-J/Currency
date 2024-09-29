import { Box, Typography } from "@mui/material";

const Title = () => {
  return (
    <>
      <Box display={"flex"} justifyContent={"space-around"}>
        <Typography variant="h5">Name</Typography>
        <Typography variant="h5">Information</Typography>
        <Typography variant="h5">Price</Typography>
      </Box>
    </>
  );
};

export default Title;
