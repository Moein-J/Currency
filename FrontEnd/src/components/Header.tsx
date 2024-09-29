import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      <Box
        height={"4rem"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="h4" color="primary">
          Currency - Task
        </Typography>
      </Box>
    </>
  );
};

export default Header;
