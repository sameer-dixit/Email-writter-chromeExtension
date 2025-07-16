import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box"; // ✅ Missing import added
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';


function App() {
  const [emailcontent, setemailcontent] = useState("");
  const [tone, settone] = useState("");
  const [generatedreply, setgeneratedreply] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const handleSubmit = async () => {
    setloading(true);
    seterror('');
    try {
      const response=await axios.post("http://localhost:8080/api/email/generate",{
        emailcontent,
        tone
      });
      setgeneratedreply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
      
    } catch (error) {
      seterror('failed to generate email reply. Please try again later');
      console.error(error);
    }finally{
      setloading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email reply generator
      </Typography>
      <Box component="section" sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original email content"
          value={emailcontent}
          onChange={(e) => setemailcontent(e.target.value)}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ""}
            label={"Tone (Optional) "}
            onChange={(e) => settone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailcontent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {generatedreply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedreply || ""}
            InputProps={{ readOnly: true }}
          />
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigator.clipboard.writeText(generatedreply)}
          >
            Copy to clipboard
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default App;
