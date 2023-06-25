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

const AddPieceRechangePopup = ({ open, onClose, onAddPieceRechange }) => {
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

  const addPieceRechange = async () => {
    const response = await fetch(`${URL}/gmao/PieceRechange/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      notify(false, "Piece Rechange added successfully");
      // Call the callback function to handle the newly added PieceRechange
      const responsJson = await response.json();
      onAddPieceRechange(responsJson);
      onClose();
    } else {
      notify(true, "An error has occurred while adding a Piece Rechange!");
    }
  };

  const handleAdd = () => {
    addPieceRechange();
  };

  useEffect(() => {
    setNewData({
      code: "",
      nom: "",
      ...newData, // Preserve any existing values in newData state
    });
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Add Piece Rechange</DialogTitle>
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
                      Nom
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={newData.nom || ""}
                        onChange={(e) =>
                          handleFieldChange("nom", e.target.value)
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

export default AddPieceRechangePopup;
