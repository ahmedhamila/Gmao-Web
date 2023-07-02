import React, { useEffect, useState, Fragment } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { SERVER_API_CONFIG } from "../../Configurations";
import { Grid, Typography } from "@mui/material";
import { Button } from "@/components/ui/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ForwardIcon from "@mui/icons-material/Forward";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Image } from "mui-image";
import imageUrl from "@/assets/bon-travail.jpg";
import toast, { Toaster } from "react-hot-toast";
import DemandeInterventionPopup from "./DemandeInterventionPopup";
import AddDemandeInterventionPopup from "./AddDemandeInterventionPopup";
import { updateSelectedDIM } from "@/redux/features/selectedDIMSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const URL = `${SERVER_API_CONFIG.PROTOCOL}://${SERVER_API_CONFIG.HOST_NAME}:${SERVER_API_CONFIG.PORT}`;
export default function DemandeIntervention({ editMode }) {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [addPopupOpen, setAddPopupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const { token, userType } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (error, msg) => {
    if (error) toast.error(msg);
    else toast.success(msg);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/gmao/DemandeIntervention`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await response.json();
      console.log(data);
      //UserType filter
      setRows(data);
    } catch (error) {
      notify(true, "Error fetching data !");
    }
  };

  const handleAddDemandeIntervention = (newDemandeIntervention) => {
    // Update the bonTravaux state by adding the new bon de travail
    setRows((prevBonTravaux) => [...prevBonTravaux, newDemandeIntervention]);
  };

  const handleUpdateRecord = (DemandeInterventionId, updatedData) => {
    console.log("updatedData : ", updatedData);
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === DemandeInterventionId) {
          return {
            ...row,
            ...updatedData,
          };
        }
        return row;
      });
      return updatedRows;
    });
  };

  const handleView = (rowData) => {
    console.log(`View action triggered for : ${rowData}`);
    setSelectedRowData(rowData);
    setIsEditMode(false);
    setPopupOpen(true);
  };

  const handleModify = (rowData) => {
    console.log(`Modify action triggered for id: ${rowData}`);

    setSelectedRowData(rowData);
    setIsEditMode(true);
    setPopupOpen(true);
  };

  const deleteDemandeIntervention = async (DemandeInterventionId) => {
    const response = await fetch(
      `${URL}/gmao/DemandeIntervention/${DemandeInterventionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      notify(false, "Demande d'Intervention deleted Successfully");
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== DemandeInterventionId)
      );
    } else {
      notify(false, "An error has occured while deleting !");
    }
  };

  const handleDelete = (id) => {
    console.log(`Delete action triggered for id: ${id}`);
    deleteDemandeIntervention(id);
  };
  const handleDeleteSelected = () => {
    // Perform delete action for the selected rows
    console.log("Delete selected:", selectedRows);

    selectedRows.map((bonId) => {
      handleDelete(bonId);
    });
  };

  const handleRedirectBonTravail = (row) => {
    dispatch(
      updateSelectedDIM({
        refDIM: row.id,
        equipement: row.equipement,
        section: row.section,
      })
    );
    navigate("/maintenance/redirect-bon");
  };

  const handleSelectionModelChange = (params) => {
    console.log(params);
    setSelectedRows(params);
  };

  const handleOpenDialog = () => {
    setAddPopupOpen(true);
  };

  const handleCloseDialog = () => {
    setAddPopupOpen(false);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "responsable_chaine_production",
      headerName: "Responsable Chaine Production",
      width: 200,
    },
    {
      field: "responsable_maintenance",
      headerName: "Responsable Maintenance",
      width: 200,
    },
    { field: "equipement", headerName: "Equipement", width: 120 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "section", headerName: "Section", width: 100 },
    { field: "date_liberation", headerName: "Date Liberation", width: 150 },
    { field: "motif", headerName: "Motif", width: 100 },
    { field: "status", headerName: "Status", width: 100 },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Grid container gap="10px">
          <IconButton aria-label="viex" onClick={() => handleView(params.row)}>
            <VisibilityIcon />
          </IconButton>
          {editMode && (
            <Fragment>
              <IconButton
                aria-label="edit"
                onClick={() => handleModify(params.row)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(params.row.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Fragment>
          )}

          {userType === "ResponsableMaintenance" &&
            (params.row.has_bon_travail ? (
              <IconButton disabled aria-label="delete" color="green">
                <TaskAltIcon />
              </IconButton>
            ) : (
              <IconButton
                aria-label="delete"
                onClick={() => handleRedirectBonTravail(params.row)}
              >
                <ForwardIcon />
              </IconButton>
            ))}
        </Grid>
      ),
    },
  ];
  const gridApiRef = React.useRef(null);

  const CustomFooter = () => {
    const selectionCount = selectedRows.length;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <div>{selectionCount} row(s) selected</div>
        <div>
          <Button onClick={handleDeleteSelected}>Delete Selected</Button>
        </div>
      </div>
    );
  };

  return (
    <Grid
      container
      sx={{ height: "100%" }}
      display="flex"
      justifyContent="center"
      padding="50px"
    >
      <Grid
        container
        display="flex"
        alignItems="center"
        flexWrap="nowrap"
        sx={{ marginBottom: "50px" }}
      >
        <Grid
          container
          display={{ xs: "none", sm: "none", lg: "flex" }}
          justifyContent="center"
        >
          <Image
            src={imageUrl}
            alt="Industrial Demande d'Intervention"
            height="80%"
            width="80%"
            style={{ borderRadius: 16 }}
          />
        </Grid>
        <Grid container display="flex" flexDirection="column" gap="25px">
          <Typography variant="body1">
            A Demande d'Intervention, also known as a Work Order, is a document
            used to initiate and track maintenance or repair tasks in an
            industrial setting. It serves as a formal request to fix or maintain
            equipment or machinery within a production cycle. The Demande
            d'Intervention contains essential information such as the
            responsible maintenance personnel, equipment details, description of
            the task, expected completion date, and status. It plays a crucial
            role in ensuring the smooth operation and efficiency of the
            production process.
          </Typography>
          {editMode && (
            <Button style={{ width: "100%" }} onClick={handleOpenDialog}>
              Add Demande d'Intervention
            </Button>
          )}
        </Grid>
      </Grid>
      <Grid
        container
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          components={
            editMode && {
              Footer: CustomFooter,
              Toolbar: GridToolbar,
            }
          }
          pageSize={5}
          checkboxSelection
          onGridReady={(params) => {
            gridApiRef.current = params.api;
          }}
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </Grid>
      <DemandeInterventionPopup
        rowData={selectedRowData}
        open={popupOpen}
        isModification={isEditMode}
        onUpdateRecord={handleUpdateRecord}
        onClose={() => setPopupOpen(false)}
      />
      <AddDemandeInterventionPopup
        open={addPopupOpen}
        onClose={handleCloseDialog}
        onAddDemandeIntervention={handleAddDemandeIntervention}
      />
      <Toaster />
    </Grid>
  );
}
