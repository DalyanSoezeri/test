// import React, { Component } from "react";
import React, { Component } from "react";
import Popup from './popup.component.js';
import ReactDOM from "react-dom";
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//Beschreibung
function MultilineTextFields() {
    const [value, setValue] = React.useState('');
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
         
        <div>
          <TextField
            id="filled-multiline-flexible"
            label="short description"
            multiline
            rows={10}
            value={value}
            onChange={handleChange}
            variant="filled"
          />
         
        </div>
  
      </Box>
    );
  }
//Money
function TextFieldSizes() {
    return (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
        
          <TextField label="Tutor fee per hour in €" id="outlined-size-normal" />
        </div>
       
      </Box>
    );
  }
//Fächer
function App() {
  const items = [
    { id: 0, label: "Mathe 1. Jahrgang" },
    { id: 2, label: "Mathe 2. Jahrgang", disabled: false },
    { id: 3, label: "Mathe 3. Jahrgang", disabled: false },
    { id: 4, label: "Mathe 4. Jahrgang" },
    { id: 5, label: "Mathe 5. Jahrgang" },
    { id: 6, label: "Deutsch 1. Jahrgang" },
    { id: 7, label: "Deutsch 2. Jahrgang", disabled: false },
    { id: 8, label: "Deutsch 3. Jahrgang", disabled: false },
    { id: 9, label: "Deutsch 4. Jahrgang" },
    { id: 10, label: "Deutsch 5. Jahrgang" },
    { id: 11, label: "Englisch 1. Jahrgang" },
    { id: 12, label: "Englisch 2. Jahrgang", disabled: false },
    { id: 13, label: "Englisch 3. Jahrgang", disabled: false },
    { id: 14, label: "Englisch 4. Jahrgang" },
    { id: 15, label: "Englisch 5. Jahrgang" },
    { id: 11, label: "BWM 1. Jahrgang" },
    { id: 12, label: "BWM 2. Jahrgang", disabled: false },
    { id: 13, label: "BWM 3. Jahrgang", disabled: false },
    { id: 14, label: "BWM 4. Jahrgang" },
    { id: 15, label: "BWM 5. Jahrgang" },
    { id: 16, label: "NW2 1. Jahrgang" },
    { id: 17, label: "NW2 2. Jahrgang", disabled: false },
    { id: 18, label: "NW2 3. Jahrgang", disabled: false },
    { id: 19, label: "NW2 4. Jahrgang" },
    { id: 20, label: "NW2 5. Jahrgang" },
    { id: 21, label: "NVS 2. Jahrgang", disabled: false },
    { id: 22, label: "NVS 3. Jahrgang", disabled: false },
    { id: 23, label: "NVS 4. Jahrgang" },
    { id: 24, label: "NVS 5. Jahrgang" },
    { id: 25, label: "SYP 2. Jahrgang", disabled: false },
    { id: 26, label: "SYP 3. Jahrgang", disabled: false },
    { id: 27, label: "SYP 4. Jahrgang" },
    { id: 28, label: "SYP 5. Jahrgang" },
    { id: 29, label: "GGP 1. Jahrgang" },
    { id: 30, label: "GGP 2. Jahrgang", disabled: false },
    { id: 31, label: "GGP 3. Jahrgang", disabled: false },
    { id: 32, label: "GGP 4. Jahrgang" },
    { id: 33, label: "GGP 5. Jahrgang" },
    { id: 34, label: "POS 1. Jahrgang" },
    { id: 35, label: "POS 2. Jahrgang", disabled: false },
    { id: 36, label: "POS 3. Jahrgang", disabled: false },
    { id: 37, label: "POS 4. Jahrgang" },
    { id: 38, label: "POS 5. Jahrgang" },
    { id: 39, label: "TINF 1. Jahrgang", disabled: false },
    { id: 40, label: "TINF 2. Jahrgang" },
    { id: 41, label: "TINF 3. Jahrgang" }
    
  ];

  return (
    <div className="App">
      <MultiSelect items={items} selectedItems={items} searchValue="1" />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);






export default class Profile extends Component {

    constructor(props) {

        super(props);
        this.state = {
            isOpen: false,
        };
    }




    render() {




        const togglePopup = () => {
            this.setState({ isOpen: !this.state.isOpen });
        }

        return (
            <form className="profile-auth-inner" >
                <h1 className="align-center">Your Profile</h1>
                <div className="image"></div>

                <div className="form-group">
                    <label htmlFor="mob_no" className="col-md-3 control-label" >Upload Profile Picture</label>

                    <div className="col-sm-9">
                        <input className="form-control" type="file" name="uploaded_image" accept="" />
                    </div>

                </div>
                
                <div /*className="align-right"*/>
                    <button type="submit" className="btn btn-primary btn-block" >Upload Picture</button>
                </div>




                <div className="form-group">
                    <label>Username</label>
                    <label type="Username" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <label type="email" className="form-control" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <label type="email" className="form-control" />
                </div>

                <p className="forgot-password text-right">
                    <a href="#">Change password!</a>
                </p>


                <button type="button" onClick={togglePopup}>
                    <p>"Click to become a tutor"</p>
                </button>


                {this.state.isOpen && < Popup
                    content={<>

                        <b>Become a tutor</b>
                        <p>Enter your tutoring subject</p>

                        
                        <TextFieldSizes/>
                        <MultilineTextFields/>
                        <App/>


                        <button>Submit</button>
                    </>}
                    handleClose={togglePopup}
                />}



            </form>

        );
    }
}