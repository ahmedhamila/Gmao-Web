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

const AddBonTravailPopup = ({ open, onClose, onAddBonTravail }) => {
  const [newData, setNewData] = useState({});
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

  const handleFieldChange = (field, value) => {
    setNewData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
      notify(true, "Failed to fetch equipement options");
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

  const addBonTravail = async () => {
    const response = await fetch(`${URL}/gmao/BonTravail/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ responsable_maintenance: id, ...newData }),
    });

    if (response.ok) {
      notify(false, "Bon de Travail added successfully");
      // Call the callback function to handle the newly added Bon de Travail
      const responsJson = await response.json();
      onAddBonTravail(responsJson);
      onClose();
    } else {
      notify(true, "An error has occurred while adding a Bon de Travail!");
    }
  };

  const handleAdd = () => {
    addBonTravail();
  };

  useEffect(() => {
    fetchAgentMaintenanceOptions();
    fetchEquipementOptions();
    fetchDemandeInterventionOptions();
    setNewData({
      agent_maintenance: "",
      equipement: "",
      refDIM: "",
      description: "",
      section: "",
      type: "",
      frequence: 0,
      active: false,
      status: "NT",
      ...newData, // Preserve any existing values in newData state
    });
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Add Bon de Travail</DialogTitle>
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
                      agent_maintenance
                    </TableCell>
                    <TableCell>
                      <Select
                        value={newData.agent_maintenance || ""}
                        onChange={(e) =>
                          handleFieldChange("agent_maintenance", e.target.value)
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
                      refDIM
                    </TableCell>
                    <TableCell>
                      <Select
                        value={newData.refDIM || ""}
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
                      type
                    </TableCell>
                    <TableCell>
                      <Select
                        value={newData.type || ""}
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
                        value={newData.frequence || 0}
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
                        checked={newData.active}
                        onChange={(e) =>
                          handleFieldChange("active", e.target.checked)
                        }
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

export default AddBonTravailPopup;
