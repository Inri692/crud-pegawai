import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CardPegawai({
  nama,
  jalan,
  kelurahan,
  kecamatan,
  kabupaten,
  provinsi,
  onClick,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          alt="pegawai"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nama}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Jalan: {jalan}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kelurahan: {kelurahan}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kecamatan: {kecamatan}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kabupaten: {kabupaten}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Provinsi: {provinsi}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        {/* awal modal */}
        <div>
          <Button onClick={handleOpen}>Edit</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h1>Ubah Data</h1>
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="jalan"
                      name="Jalan"
                      label="Jalan"
                      fullWidth
                      autoComplete="shipping address-line1"
                      variant="standard"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="kelurahan"
                      name="Kelurahan"
                      label="Kelurahan"
                      fullWidth
                      autoComplete="shipping address-line2"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      sx={{ width: 240 }}
                      label="Kabupaten"
                      defaultValue="EUR"
                      helperText="Please select your currency"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      sx={{ width: 240 }}
                      label="Kecamatan"
                      defaultValue="EUR"
                      helperText="Please select your currency"
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      sx={{ width: 240 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Provinsi" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained">Ubah</Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Modal>
        </div>
        {/* akhir modal */}
        <Button variant="outlined" color="error" onClick={onClick}>
          Hapus
        </Button>
      </CardActions>
    </Card>
  );
}
export default CardPegawai;
