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

const PieceRechangePopup = ({
  rowData,
  open,
  onClose,
  isModification,
  onUpdateRecord,
}) => {
  const [modifiedData, setModifiedData] = useState({});

  const notify = (error, msg) => {
    if (error) toast.error(msg);
    else toast.success(msg);
  };

  useEffect(() => {
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

  const updatePieceRechange = async (PieceRechangeId, updatedData) => {
    const response = await fetch(`${URL}/gmao/PieceRechange/${PieceRechangeId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      notify(false, "Piece Rechange updated successfully");
      // Call the callback function to update the record in the parent component
      onUpdateRecord(PieceRechangeId, updatedData);
    } else {
      notify(true, "An error has occurred while updating !");
    }
  };

  const handleUpdate = () => {
    console.log(modifiedData); // Log the current modifiedData
    updatePieceRechange(rowData.id, modifiedData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Piece Rechange Details</DialogTitle>
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
                        Code
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={modifiedData.code || ""}
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
                          value={modifiedData.nom || ""}
                          onChange={(e) =>
                            handleFieldChange("nom", e.target.value)
                          }
                          sx={{ width: "100%" }}
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

export default PieceRechangePopup;
