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

const DemandeInterventionPopup = ({
  rowData,
  open,
  onClose,
  isModification,
  onUpdateRecord,
}) => {
  const [modifiedData, setModifiedData] = useState({});
  const [responsableMaintenanceOptions, setResponsableMaintenanceOptions] = useState([]);
  const [equipementOptions, setEquipementOptions] = useState([]);
  const { id } = useSelector((state) => state.user);
  const notify = (error, msg) => {
    if (error) toast.error(msg);
    else toast.success(msg);
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
      notify(true, "Failed to fetch equipment options");
    }
  };


  useEffect(() => {
    fetchResponsableMaintenanceOptions();
    fetchEquipementOptions();
    console.log("RowData", rowData);
    setModifiedData(rowData);
  }, [rowData]);

  const handleFieldChange = (field, value) => {
    console.log("Modif", field, value);
    setModifiedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const updateDemandeIntervention = async (DemandeInterventionId, updatedData) => {
    const response = await fetch(`${URL}/gmao/DemandeIntervention/${DemandeInterventionId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedData, responsable_chaine_production: id }),
    });

    if (response.ok) {
      notify(false, "Demande d'Intervention updated successfully");
      // Call the callback function to update the record in the parent component
      onUpdateRecord(DemandeInterventionId, updatedData);
    } else {
      notify(
        true,
        "An error has occurred while updating (select a responsable de maintenance )!"
      );
    }
  };

  const handleUpdate = () => {
    console.log(modifiedData); // Log the current modifiedData
    updateDemandeIntervention(rowData.id, modifiedData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Demande d'Intervention Details</DialogTitle>
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
                {isModification ? (
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
                          value={modifiedData.responsable_maintenance}
                          onChange={(e) =>
                            handleFieldChange(
                              "responsable_maintenance",
                              e.target.value
                            )
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
                          value={modifiedData.equipement || ""}
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
                          value={modifiedData.description || ""}
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
                          value={modifiedData.section || ""}
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
                          value={modifiedData.type || ""}
                          onChange={(e) =>
                            handleFieldChange("type", e.target.value)
                          }
                          sx={{ width: "100%" }}
                        >
                          <MenuItem value="AC">Correctif</MenuItem>
                          <MenuItem value="AN">Preventif</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  Object.keys(rowData).map(
                    (field, index) =>
                      index !== 0 && (
                        <TableRow key={field}>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            {field}
                          </TableCell>
                          <TableCell>{rowData[field]}</TableCell>
                        </TableRow>
                      )
                  )
                )}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {isModification && <Button onClick={handleUpdate}>Update</Button>}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
      <Toaster />
    </Dialog>
  );
};

export default DemandeInterventionPopup;
