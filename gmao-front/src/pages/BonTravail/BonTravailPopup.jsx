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
} from "@mui/material";
import { Image } from "mui-image";
import imageUrl from "@/assets/bon-travail.jpg";
import { Button } from "@/components/ui/Button";
import toast, { Toaster } from "react-hot-toast";
import { SERVER_API_CONFIG } from "./../../Configurations";
const URL = `${SERVER_API_CONFIG.PROTOCOL}://${SERVER_API_CONFIG.HOST_NAME}:${SERVER_API_CONFIG.PORT}`;
const BonTravailPopup = ({
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
    setModifiedData(rowData);
  }, [rowData]);

  const handleFieldChange = (field, value) => {
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
      body: JSON.stringify(updatedData),
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
                <TableBody>
                  {Object.keys(rowData).map(
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
                          {isModification ? (
                            <TableCell>
                              <TextField
                                value={modifiedData[field] || ""}
                                onChange={(e) =>
                                  handleFieldChange(field, e.target.value)
                                }
                              />
                            </TableCell>
                          ) : (
                            <TableCell>{rowData[field]}</TableCell>
                          )}
                        </TableRow>
                      )
                  )}
                </TableBody>
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
