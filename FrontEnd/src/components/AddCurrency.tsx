import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CurrencyInput from "./CurrencyInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCurrencySchema } from "../lib/schemas";

const AddCurrency = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ resolver: zodResolver(addCurrencySchema) });
  const handleCreate = async (formData: FormValues) => {
    const res = await fetch("http://localhost:3000/currency", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        info: formData.information,
        price: formData.price,
      }),
    });
    if (res.ok) {
      setStatus(true);
      setTimeout(() => {
        setStatus(false);
      }, 3000);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          onClick={() => {
            setOpen(!open);
          }}
          variant="outlined"
          sx={{
            width: 200,
          }}
        >
          Add Currency
        </Button>
        <Modal
          open={open}
          onClose={() => {
            setOpen(!open);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new currency
            </Typography>
            <form onSubmit={handleSubmit(handleCreate)}>
              <Box display={"flex"} flexDirection={"column"}>
                <CurrencyInput
                  {...register("name")}
                  label={"name"}
                  error={errors.name?.message}
                />
                <CurrencyInput
                  {...register("email")}
                  label={"email"}
                  error={errors.email?.message}
                />
                <CurrencyInput
                  {...register("information")}
                  label={"information"}
                  error={errors.information?.message}
                />
                <CurrencyInput
                  {...register("price")}
                  label={"price"}
                  error={errors.price?.message}
                />
                {status && <Typography color="success">Successfuly</Typography>}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default AddCurrency;
