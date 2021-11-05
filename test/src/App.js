import {Autocomplete,Button,TextField } from '@material-ui/core'

function App() {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
  ]
  return (
    <div className="App">
       <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      <Button>按钮</Button>
      <Button variant="outlined">Outlined</Button>
111
    </div>
  );
}

export default App;
