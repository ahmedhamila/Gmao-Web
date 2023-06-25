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

const AddDemandeInterventionPopup = ({
  open,
  onClose,
  onAddDemandeIntervention,
}) => {
  const [newData, setNewData] = useState({});
  const [responsableMaintenanceOptions, setResponsableMaintenanceOptions] =
    useState([]);
  const [equipementOptions, setEquipementOptions] = useState([]);
  const { id } = useSelector((state) => state.user);

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

  const fetchResponsableMaintenanceOptions = async () => {
    const response = await fetch(`${URL}/users/ResponsableMaintenance`);
    if (response.ok) {
      const data = await response.json();
      setResponsableMaintenanceOptions(data);
    } else {
      notify(true, "Failed to fetch Responsable Maintenance options");
    }
  };

  const fetchEquipementOptions = async () => {
    const response = await fetch(`${URL}/gmao/Equipement`);
    if (response.ok) {
      const data = await response.json();
      setEquipementOptions(data);
    } else {
      notify(true, "Failed to fetch equipement options");
    }
  };

  const addDemandeIntervention = async () => {
    const response = await fetch(`${URL}/gmao/DemandeIntervention/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ responsable_chaine_production: id, ...newData }),
    });

    if (response.ok) {
      notify(false, "Demande d'Intervention added successfully");
      // Call the callback function to handle the newly added Demande d'Intervention
      const responsJson = await response.json();
      onAddDemandeIntervention(responsJson);
      onClose();
    } else {
      notify(
        true,
        "An error has occurred while adding a Demande d'Intervention!"
      );
    }
  };

  const handleAdd = () => {
    addDemandeIntervention();
  };

  useEffect(() => {
    fetchResponsableMaintenanceOptions();
    fetchEquipementOptions();
    setNewData({
      responsable_maintenance: "",
      equipement: "",
      description: "",
      section: "",
      motif: 'AC',
      status: "NT",
      ...newData, // Preserve any existing values in newData state
    });
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Add Demande d'Intervention</DialogTitle>
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
                      responsable_maintenance
                    </TableCell>
                    <TableCell>
                      <Select
                        value={newData.responsable_maintenance || ""}
                        onChange={(e) =>
                          handleFieldChange("responsable_maintenance", e.target.value)
                        }
                        sx={{ width: "100%" }}
                      >
                        {responsableMaintenanceOptions.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.mail}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      equipement
                    </TableCell>
                    <TableCell>
                      <Select
                        value={newData.equipement || ""}
                        onChange={(e) =>
                          handleFieldChange("equipement", e.target.value)
                        }
                        sx={{ width: "100%" }}
                      >
                        {equipementOptions.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.code}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      description
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={newData.description || ""}
                        onChange={(e) =>
                          handleFieldChange("description", e.target.value)
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
                      section
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={newData.section || ""}
                        onChange={(e) =>
                          handleFieldChange("section", e.target.value)
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
                      motif
                    </TableCell>
                    <TableCell>
                      <Select
                        value={newData.motif || ""}
                        onChange={(e) =>
                          handleFieldChange("motif", e.target.value)
                        }
                        sx={{ width: "100%" }}
                      >
                        <MenuItem value="AC">Arret Complet</MenuItem>
                        <MenuItem value="AN">Annomalie</MenuItem>
                      </Select>
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

export default AddDemandeInterventionPopup;
