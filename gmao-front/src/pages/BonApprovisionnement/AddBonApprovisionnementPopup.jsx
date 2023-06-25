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

const AddBonApprovisionnementPopup = ({
  open,
  onClose,
  onAddBonApprovisionnement,
}) => {
  const [newData, setNewData] = useState({});
  const [magasinierOptions, setMagasinierOptions] = useState([]);
  const [pieceRechangesOptions, setPieceRechangesOptions] = useState([]);
  const { id } = useSelector((state) => state.user);
  const [pieceRechanges, setPieceRechanges] = useState([{ id: "", value: "" }]);

  const notify = (error, msg) => {
    if (error) toast.error(msg);
    else toast.success(msg);
  };

  const handleFieldChange = (field, value, index = null) => {
    if (index !== null) {
      setPieceRechanges((prevRechanges) => {
        const updatedRechanges = [...prevRechanges];
        updatedRechanges[index] = {
          ...updatedRechanges[index],
          [field]: value,
        };
        return updatedRechanges;
      });
    } else {
      setNewData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
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
      setPieceRechangesOptions(data);
    } else {
      notify(true, "Failed to fetch piece rechanges options");
    }
  };

  const addBonApprovisionnement = async () => {
    const response = await fetch(`${URL}/gmao/BonApprovisionnement/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        responsable_maintenance: id,
        ...newData,
        piece_rechanges: pieceRechanges.map((rechange) => rechange.id),
      }),
    });

    if (response.ok) {
      notify(false, "Bon d'Approvisionnement added successfully");
      const responsJson = await response.json();
      onAddBonApprovisionnement(responsJson);
      onClose();
    } else {
      notify(
        true,
        "An error has occurred while adding a Bon d'Approvisionnement!"
      );
    }
  };

  const handleAdd = () => {
    addBonApprovisionnement();
  };

  const addPieceRechange = () => {
    setPieceRechanges((prevRechanges) => [
      ...prevRechanges,
      { id: "", value: "" },
    ]);
  };
  const handleRemovePieceRechange = (index) => {
    setPieceRechanges((prevRechanges) => {
      const updatedRechanges = [...prevRechanges];
      updatedRechanges.splice(index, 1);
      return updatedRechanges;
    });
  };

  useEffect(() => {
    fetchMagasinierOptions();
    fetchPieceRechangesOptions();
    setNewData({
      magasinier: "",
      piece_rechanges: [],
      description: "",
      ...newData,
    });
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Add Bon d'Approvisionnement</DialogTitle>
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
                      magasinier
                    </TableCell>
                    <TableCell>
                      <Select
                        value={newData.magasinier || ""}
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
                        value={newData.description || ""}
                        onChange={(e) =>
                          handleFieldChange("description", e.target.value)
                        }
                        sx={{ width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  {pieceRechanges.map((rechange, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        Piece de Rechange
                      </TableCell>
                      <TableCell>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs>
                            <Select
                              value={rechange.id}
                              onChange={(e) =>
                                handleFieldChange("id", e.target.value, index)
                              }
                              sx={{ width: "100%" }}
                            >
                              {pieceRechangesOptions.map((option) => {
                                const isOptionChosen = pieceRechanges.some(
                                  (rechange) => rechange.id === option.id
                                );
                                if (
                                  !isOptionChosen ||
                                  rechange.id === option.id
                                ) {
                                  return (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.code}
                                    </MenuItem>
                                  );
                                }
                                return null;
                              })}
                            </Select>
                          </Grid>
                          <Grid item>
                            <Button
                              onClick={() => handleRemovePieceRechange(index)}
                              variant="outlined"
                            >
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      <Button onClick={addPieceRechange} variant="outlined">
                        Add More
                      </Button>
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

export default AddBonApprovisionnementPopup;
