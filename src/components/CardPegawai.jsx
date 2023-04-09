import React from "react";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import Button from "@mui/material/Button";

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
  id,
  nama,
  jalan,
  kelurahan,
  kecamatan,
  kabupaten,
  provinsi,
  onClick,
}) {
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
        <Link to={`/edit/${id}`}>
          <Button>Edit</Button>
        </Link>
        <Button variant="outlined" color="error" onClick={onClick}>
          Hapus
        </Button>
      </CardActions>
    </Card>
  );
}
export default CardPegawai;
