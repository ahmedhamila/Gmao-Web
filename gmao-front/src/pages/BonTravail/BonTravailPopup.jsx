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
import { SERVER_API_CONFIG } from "./../../Configurations";
import { useSelector } from "react-redux";
const URL = `${SERVER_API_CONFIG.PROTOCOL}://${SERVER_API_CONFIG.HOST_NAME}:${SERVER_API_CONFIG.PORT}`;

const BonTravailPopup = ({
  rowData,
  open,
  onClose,
  isModification,
  onUpdateRecord,
}) => {
  const [modifiedData, setModifiedData] = useState({});
  const [agentMaintenanceOptions, setAgentMaintenanceOptions] = useState([]);
  const [equipementOptions, setEquipementOptions] = useState([]);
  const [demandeInterventionOptions, setDemandeInterventionOptions] = useState(
    []
  );
  const { id } = useSelector((state) => state.user);
  const notify = (error, msg) => {
    if (error) toast.error(msg);
    else toast.success(msg);
  };

  const fetchAgentMaintenanceOptions = async () => {
    const response = await fetch(`${URL}/users/AgentMaintenance`);
    if (response.ok) {
      const data = await response.json();
      setAgentMaintenanceOptions(data);
    } else {
      notify(true, "Failed to fetch agent maintenance options");
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

  const fetchDemandeInterventionOptions = async () => {
    const response = await fetch(`${URL}/gmao/DemandeIntervention`);
    if (response.ok) {
      const data = await response.json();
      setDemandeInterventionOptions(data);
    } else {
      notify(true, "Failed to fetch demande intervention options");
    }
  };

  useEffect(() => {
    fetchAgentMaintenanceOptions();
    fetchEquipementOptions();
    fetchDemandeInterventionOptions();
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

  const updateBonTravail = async (BonTravailId, updatedData) => {
    const response = await fetch(`${URL}/gmao/BonTravail/${BonTravailId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedData, responsable_maintenance: id }),
    });

    if (response.ok) {
      notify(false, "Bon de Travail updated successfully");
      // Call the callback function to update the record in the parent component
      onUpdateRecord(BonTravailId, updatedData);
    } else {
      notify(true, "An error has occurred while updating !");
    }
  };

  const handleUpdate = () => {
    console.log(modifiedData); // Log the current modifiedData
    updateBonTravail(rowData.id, modifiedData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Bon de Travail Details</DialogTitle>
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
                        agent_maintenance
                      </TableCell>
                      <TableCell>
                        <Select
                          value={modifiedData.agent_maintenance}
                          onChange={(e) =>
                            handleFieldChange(
                              "agent_maintenance",
                              e.target.value
                            )
                          }
                          sx={{ width: "100%" }}
                        >
                          {agentMaintenanceOptions.map((option) => (
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
                        refDIM
                      </TableCell>
                      <TableCell>
                        <Select
                          value={modifiedData.refDIM || ""}
                          onChange={(e) =>
                            handleFieldChange("refDIM", e.target.value)
                          }
                          sx={{ width: "100%" }}
                        >
                          {demandeInterventionOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.responsable_maintenance +
                                "(" +
                                option.id +
                                ")"}
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
                        type
                      </TableCell>
                      <TableCell>
                        <Select
                          value={modifiedData.type || ""}
                          onChange={(e) =>
                            handleFieldChange("type", e.target.value)
                          }
                          sx={{ width: "100%" }}
                        >
                          <MenuItem value="CO">Correctif</MenuItem>
                          <MenuItem value="PR">Preventif</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        frequence
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={modifiedData.frequence || 0}
                          onChange={(e) =>
                            handleFieldChange("frequence", e.target.value)
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
                        active
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          checked={modifiedData.active}
                          onChange={(e) =>
                            handleFieldChange("active", e.target.checked)
                          }
                        />
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

export default BonTravailPopup;
