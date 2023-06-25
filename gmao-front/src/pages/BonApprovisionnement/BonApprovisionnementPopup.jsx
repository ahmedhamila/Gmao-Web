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

const BonApprovisionnementPopup = ({
  rowData,
  open,
  onClose,
  isModification,
  onUpdateRecord,
}) => {
  const [modifiedData, setModifiedData] = useState({});
  const [magasinierOptions, setMagasinierOptions] = useState([]);
  const [pieceRechangesOptions, setPieceRechangesOptions] = useState([]);
  const { id } = useSelector((state) => state.user);
  const notify = (error, msg) => {
    if (error) toast.error(msg);
    else toast.success(msg);
  };

  const fetchMagasinierOptions = async () => {
    const response = await fetch(`${URL}/users/Magasinier`);
    if (response.ok) {
      const data = await response.json();
      setMagasinierOptions(data);
    } else {
      notify(true, "Failed to fetch Magasinier options");
    }
  };

  const fetchPieceRechangesOptions = async () => {
    const response = await fetch(`${URL}/gmao/PieceRechange`);
    if (response.ok) {
      const data = await response.json();
      setPieceRechangesOptions(
        data.filter((piece) => piece.bon_approvisionnement.includes(rowData.id))
      );
    } else {
      notify(true, "Failed to fetch piece rechanges options");
    }
  };

  useEffect(() => {
    fetchMagasinierOptions();
    fetchPieceRechangesOptions();
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

  const updateBonApprovisionnement = async (
    BonApprovisionnementId,
    updatedData
  ) => {
    const response = await fetch(
      `${URL}/gmao/BonApprovisionnement/${BonApprovisionnementId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedData, responsable_maintenance: id }),
      }
    );

    if (response.ok) {
      notify(false, "Bon d'Approvisionnement updated successfully");
      // Call the callback function to update the record in the parent component
      onUpdateRecord(BonApprovisionnementId, updatedData);
    } else {
      notify(
        true,
        "An error has occurred while updating (select a magasinier )!"
      );
    }
  };

  const handleUpdate = () => {
    console.log(modifiedData); // Log the current modifiedData
    updateBonApprovisionnement(rowData.id, modifiedData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Bon d'Approvisionnement Details</DialogTitle>
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
                        Magasinier
                      </TableCell>
                      <TableCell>
                        <Select
                          value={modifiedData.magasinier}
                          onChange={(e) =>
                            handleFieldChange("magasinier", e.target.value)
                          }
                          sx={{ width: "100%" }}
                        >
                          {magasinierOptions.map((option) => (
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
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    Pieces de Rechanges
                  </TableCell>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    gap="25px"
                    sx={{ paddingTop: "15px" }}
                  >
                    {pieceRechangesOptions.map((piece, index) => {
                      return (
                        <Grid item key={index}>
                          {piece.nom}
                        </Grid>
                      );
                    })}
                  </Grid>
                </TableRow>
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

export default BonApprovisionnementPopup;
