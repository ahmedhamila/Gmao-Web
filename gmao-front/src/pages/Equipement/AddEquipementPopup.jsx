import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { Image } from "mui-image";
import imageUrl from "@/assets/bon-travail.jpg";
import { Button } from "@/components/ui/Button";
import toast, { Toaster } from "react-hot-toast";
import { SERVER_API_CONFIG } from "../../Configurations";

import { useSelector } from "react-redux";

const URL = `${SERVER_API_CONFIG.PROTOCOL}://${SERVER_API_CONFIG.HOST_NAME}:${SERVER_API_CONFIG.PORT}`;

const AddEquipementPopup = ({ open, onClose, onAddEquipement }) => {
  const [newData, setNewData] = useState({});

  const notify = (error, msg) => {
    if (error) toast.error(msg);
    else toast.success(msg);
  };

  const handleFieldChange = (field, value) => {
    setNewData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const addEquipement = async () => {
    const response = await fetch(`${URL}/gmao/Equipement/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      notify(false, "Equipement added successfully");
      // Call the callback function to handle the newly added Equipement
      const responsJson = await response.json();
      onAddEquipement(responsJson);
      onClose();
    } else {
      notify(true, "An error has occurred while adding a Equipement!");
    }
  };

  const handleAdd = () => {
    addEquipement();
  };

  useEffect(() => {
    setNewData({
      code: "",
      date_fabrication: "",
      date_mise_en_marche: "",
      type: "",
      ...newData, // Preserve any existing values in newData state
    });
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Add Equipement</DialogTitle>
      <DialogContent>
        <Grid container display="flex" gap={2}>
          <Grid item>
            <Image src={imageUrl} alt="Row Image" width="250px" height="100%" />
          </Grid>
          <Grid item xs>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", marginBottom: 2 }}
            >
              Information
            </Typography>
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      Code
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={newData.code || ""}
                        onChange={(e) =>
                          handleFieldChange("code", e.target.value)
                        }
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      Type
                    </TableCell>
                    <TableCell>
                      <TextField
                      
                        value={newData.type || ""}
                        onChange={(e) =>
                          handleFieldChange("type", e.target.value)
                        }
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      Date de Fabrication
                    </TableCell>
                    <TableCell>
                      <TextField
                       type="date"
                        value={newData.date_fabrication || ""}
                        onChange={(e) =>
                          handleFieldChange("date_fabrication", e.target.value)
                        }
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      Date de Mise En Mmarche
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="date"
                        value={newData.date_mise_en_marche || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "date_mise_en_marche",
                            e.target.value
                          )
                        }
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd}>Add</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      <Toaster />
    </Dialog>
  );
};

export default AddEquipementPopup;
