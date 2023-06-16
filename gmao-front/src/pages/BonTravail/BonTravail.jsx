import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { SERVER_API_CONFIG } from "./../../Configurations";
import { Grid, Typography } from "@mui/material";
import { Button } from "@/components/ui/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Image } from "mui-image";
import imageUrl from "@/assets/bon-travail.jpg";
import toast, { Toaster } from "react-hot-toast";
import BonTravailPopup from "./BonTravailPopup";
import AddBonTravailPopup from "./AddBonTravailPopup";
import { useSelector } from "react-redux";
const URL = `${SERVER_API_CONFIG.PROTOCOL}://${SERVER_API_CONFIG.HOST_NAME}:${SERVER_API_CONFIG.PORT}`;

export default function BonTravail() {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [addPopupOpen, setAddPopupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  const notify = (error, msg) => {
    if (error) toast.error(msg);
    else toast.success(msg);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/gmao/BonTravail`);
      const data = await response.json();
      console.log(data);
      setRows(data);
    } catch (error) {
      notify(true, "Error fetching data !");
    }
  };

  const handleAddBonTravail = (newBonTravail) => {
    // Update the bonTravaux state by adding the new bon de travail
    setRows((prevBonTravaux) => [...prevBonTravaux, newBonTravail]);
  };

  const handleUpdateRecord = (BonTravailId, updatedData) => {
    console.log("updatedData : ", updatedData);
    setRows((prevRows) => {
      const updatedRows = prevRows.map((row) => {
        if (row.id === BonTravailId) {
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

  const deleteBonTravail = async (BonTravailId) => {
    const response = await fetch(`${URL}/gmao/BonTravail/${BonTravailId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      notify(false, "Bon de Travail deleted Successfully");
      setRows((prevRows) => prevRows.filter((row) => row.id !== BonTravailId));
    } else {
      notify(false, "An error has occured while deleting !");
    }
  };

  const handleDelete = (id) => {
    console.log(`Delete action triggered for id: ${id}`);
    deleteBonTravail(id);
  };
  const handleDeleteSelected = () => {
    // Perform delete action for the selected rows
    console.log("Delete selected:", selectedRows);

    selectedRows.map((bonId) => {
      handleDelete(bonId);
    });
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
    { field: "responsable_maintenance", headerName: "Responsable", width: 200 },
    { field: "agent_maintenance", headerName: "Agent", width: 200 },
    { field: "refDIM", headerName: "Ref DIM", width: 100 },
    { field: "equipement", headerName: "Equipement", width: 120 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "section", headerName: "Section", width: 100 },
    { field: "date_liberation", headerName: "Date Liberation", width: 150 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "frequence", headerName: "Frequence", width: 120 },
    { field: "active", headerName: "Active", width: 100 },
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
          display={{ sm: "none", lg: "flex" }}
          justifyContent="center"
        >
          <Image
            src={imageUrl}
            alt="Industrial Bon de Travail"
            height="80%"
            width="80%"
            style={{ borderRadius: 16 }}
          />
        </Grid>
        <Grid container display="flex" flexDirection="column" gap="25px">
          <Typography variant="body1">
            A Bon de Travail, also known as a Work Order, is a document used to
            initiate and track maintenance or repair tasks in an industrial
            setting. It serves as a formal request to fix or maintain equipment
            or machinery within a production cycle. The Bon de Travail contains
            essential information such as the responsible maintenance personnel,
            equipment details, description of the task, expected completion
            date, and status. It plays a crucial role in ensuring the smooth
            operation and efficiency of the production process.
          </Typography>
          <Button style={{ width: "100%" }} onClick={handleOpenDialog}>
            Add Bon Travail
          </Button>
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
          components={{
            Footer: CustomFooter,
            Toolbar: GridToolbar,
          }}
          pageSize={5}
          checkboxSelection
          onGridReady={(params) => {
            gridApiRef.current = params.api;
          }}
          onRowSelectionModelChange={handleSelectionModelChange}
        />
      </Grid>
      <BonTravailPopup
        rowData={selectedRowData}
        open={popupOpen}
        isModification={isEditMode}
        onUpdateRecord={handleUpdateRecord}
        onClose={() => setPopupOpen(false)}
      />
      <AddBonTravailPopup
        open={addPopupOpen}
        onClose={handleCloseDialog}
        onAddBonTravail={handleAddBonTravail}
      />
      <Toaster />
    </Grid>
  );
}
