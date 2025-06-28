import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const allFields = ["date", "amount", "category", "status", "user_id"];

const ExportModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const toggleField = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://financial-dashboard-w2d7.onrender.com/api/export-csv",
        { fields: selectedFields },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      // Trigger file download
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.csv";
      a.click();
      window.URL.revokeObjectURL(url);
      onClose();
    } catch (error) {
      alert("Export failed. Try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Fields to Export</DialogTitle>
      <DialogContent>
        {allFields.map((field) => (
          <FormControlLabel
            key={field}
            control={
              <Checkbox
                checked={selectedFields.includes(field)}
                onChange={() => toggleField(field)}
              />
            }
            label={field}
          />
        ))}
        {selectedFields.length === 0 && (
          <Typography color="error" variant="caption">
            Please select at least one field.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleExport}
          disabled={selectedFields.length === 0}
          variant="contained"
        >
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExportModal;
