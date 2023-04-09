import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPegawai,
  getAllUser,
  deletePegawai,
} from "../features/pegawaiSlice";
import axios from "axios";

import CardPegawai from "../components/CardPegawai";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const Home = () => {
  const [nama, setNama] = useState("");
  const [jalan, setJalan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [provinsiData, setProvinsiData] = useState([]);
  const [kabupatenData, setKabupatenData] = useState([]);
  const [kecamatanData, setKecamatanData] = useState([]);
  const [kecamatan, setKecamatan] = useState("");
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedKabupaten, setSelectedKabupaten] = useState("");

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  useEffect(() => {
    fetchProvinsi();
  }, []);

  function handleAddPegawai(
    nama,
    jalan,
    kelurahan,
    kecamatan,
    kabupaten,
    provinsi,
    event
  ) {
    dispatch(
      addPegawai({
        nama,
        jalan,
        kelurahan,
        kecamatan,
        kabupaten,
        provinsi,
      })
    );
    event.preventDefault();
    console.log({
      nama,
      jalan,
      kelurahan,
      kecamatan,
      kabupaten,
      provinsi,
    });
  }
  function handleDeletePegawai(id) {
    dispatch(deletePegawai(id));
  }

  function fetchProvinsi() {
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((response) => {
        setProvinsiData(response?.data?.provinsi);
        // console.log(response?.data?.provinsi);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function fetchKabupaten(idProvinsi) {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`
      )
      .then((response) => {
        setKabupatenData(response.data.kota_kabupaten);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function fetchKecamatan(idKabupaten) {
    axios
      .get(
        `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKabupaten}`
      )
      .then((response) => {
        setKecamatanData(response.data.kecamatan);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            CRUD DATA PEGAWAI
          </Typography>
        </Toolbar>
      </AppBar>
      {/* form */}
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Tambah Pegawai
          </Typography>
          <form
            onSubmit={(event) =>
              handleAddPegawai(
                nama,
                jalan,
                kelurahan,
                kecamatan,
                selectedKabupaten,
                selectedProvinsi,
                event
              )
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="nama"
                  name="nama"
                  label="nama"
                  fullWidth
                  variant="standard"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="jalan"
                  name="jalan"
                  label="Jalan"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                  value={jalan}
                  onChange={(e) => setJalan(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="kelurahan"
                  name="kelurahan"
                  label="Kelurahan"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                  value={kelurahan}
                  onChange={(e) => setKelurahan(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name="provinsi"
                  sx={{ width: 240 }}
                  options={provinsiData}
                  getOptionLabel={(provinsiData) => provinsiData.nama}
                  isOptionEqualToValue={(newValue) => newValue.nama}
                  onChange={(e, newValue) => {
                    setSelectedProvinsi(newValue.nama);

                    fetchKabupaten(newValue.id);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Provinsi"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" sx={{ minWidth: 240 }}>
                  <Select
                    value={selectedKabupaten.nama}
                    displayEmpty
                    inputProps={{ "aria-label": "Kabupaten/Kota" }}
                    onChange={(event) => {
                      setSelectedKabupaten(event.target.value.nama);
                      fetchKecamatan(event.target.value.id);
                    }}
                  >
                    <MenuItem value="" disabled>
                      Kabupaten/Kota
                    </MenuItem>
                    {kabupatenData &&
                      kabupatenData.map((item) => (
                        <MenuItem key={item.id} value={item}>
                          {item.nama}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" sx={{ minWidth: 240 }}>
                  <Select
                    value={kecamatan}
                    onChange={(event) => {
                      setKecamatan(event.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Kecamatan" }}
                  >
                    <MenuItem value="" disabled>
                      Kecamatan
                    </MenuItem>
                    {kecamatanData &&
                      kecamatanData.map((item) => (
                        <MenuItem key={item.id} value={item.nama}>
                          {item.nama}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Tambah
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      {/* akhir form */}

      <Grid
        container
        my={4}
        p={4}
        rowSpacing={1}
        spacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {users.map((item) => (
          <Grid item xs={12} sm={6} md={3}>
            <CardPegawai
              key={item.id}
              jalan={item.jalan}
              kelurahan={
                item?.kelurahan?.length > 1 ? item.kelurahan : "tidak ada data"
              }
              kecamatan={
                item?.kecamatan?.length > 1 ? item.kecamatan : "tidak ada data"
              }
              kabupaten={
                item?.kabupaten?.length > 1 ? item.kabupaten : "tidak ada data"
              }
              provinsi={
                item?.provinsi?.length > 1 ? item.provinsi : "tidak ada data"
              }
              onClick={() => handleDeletePegawai(item.id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
