import React, { useState, useEffect } from "react";
import {
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
import { useNavigate } from "react-router-dom";

const URL = `${SERVER_API_CONFIG.PROTOCOL}://${SERVER_API_CONFIG.HOST_NAME}:${SERVER_API_CONFIG.PORT}`;

const RedirectBonTravail = () => {
  const [newData, setNewData] = useState({});
  const [agentMaintenanceOptions, setAgentMaintenanceOptions] = useState([]);
  const [equipementOptions, setEquipementOptions] = useState([]);
  const [demandeInterventionOptions, setDemandeInterventionOptions] = useState(
    []
  );
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.user);
  const { refDIM, equipement, section } = useSelector(
    (state) => state.selectedDIM
  );

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
      navigate("/maintenance/bon-travail");
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
      equipement: equipement,
      refDIM: refDIM,
      description: "",
      section: section,
      type: "",
      frequence: 0,
      active: false,
      status: "NT",
      ...newData, // Preserve any existing values in newData state
    });
  }, []);

  return (
    <Grid container display="flex" justifyContent="center">
      <Grid
        container
        display="flex"
        sx={{
          minWidth: "350px",
          maxWidth: "75%",
          paddingX: "50px",
          paddingY: "25px",
        }}
        justifyContent="center"
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Add Bon de Travail
        </Typography>
        <Grid container spacing={2}>
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
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      {
                        equipementOptions.find(
                          (item) => item.id === newData.equipement
                        )?.code
                      }
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
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      {demandeInterventionOptions.find(
                        (item) => item.id === newData.refDIM
                      )?.responsable_chaine_production + `(${newData.refDIM})`}
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
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontWeight: "bold" }}
                    >
                      {newData.section}
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
        <Grid container display="flex">
          <Button style={{ width: "100%" }} onClick={handleAdd}>
            Add
          </Button>
        </Grid>
        <Toaster />
      </Grid>
    </Grid>
  );
};

export default RedirectBonTravail;
