import user from "./userdata";
import React, { Component } from "react";
import Axios from "axios";
import ReactDOM from "react-dom";
import "./styles.css"
 import Box from '@mui/material/Box';
 import Slider from '@mui/material/Slider';

import ScotchInfoBar from "./ScotchInfoBar";
import Rating from '@mui/material/Rating';

import StarIcon from '@mui/icons-material/Star';


Axios.defaults.withCredentials = true;


function App() {
    return (
        <div id="container1">
            <div id="container2">
                <div className="App2">
                    <div className="page-deets">
                    </div>

                    {/* Iterate over imported array in userData */}
                    <div className="user">

                        {/* Display each data in array in a card */}
                        {/* Each card must have a 'key' attribute */}
                        {
                            user.map((u, index) => {
                                return (
                                    <div key={index}>

                                        <p>{u.name}</p>
                                        <p>{u.subject}</p>
                                        <p>{u.price}</p>
                                        <p>{u.description}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {/* <ScotchInfoBar /> */}
                </div>
            </div>
        </div>
    );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
//Rating
function HoverRating() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
const marks = [
    {
      value: 0,
      label: '0 €',
    },
    {
      value: 25,
      label: '25 €',
    },
    {
      value: 50,
      label: '50 €',
    },
    {
        value: 75,
        label: '75 €',
      },
    {
      value: 100,
      label: '100 €',
    },
  ];
  
  function valuetext(value) {
    return `${value}°C`;
  }
  
 function DiscreteSliderLabel() {
    return (
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Always visible"
          defaultValue={80}
          getAriaValueText={valuetext}
          step={10}
          marks={marks}
          valueLabelDisplay="on"
        />
      </Box>
    );
  }

export default class Homepage extends Component {
    render() {

        return (
            <form className={"homepage"}>

                <h1 className={"homepage-center"}>Enjoy learning!</h1>
                <link href="https://getbootstrap.com/examples/jumbotron-narrow/jumbotron-narrow.css" rel="stylesheet" />
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
                <div class="row">
                <DiscreteSliderLabel/>
                <HoverRating/>
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </span>

                            <input id="Subject" type="text" class="form-control" name="Subject" placeholder="Subject"></input>

                            <span class="input-group-addon"> <button>Submit</button></span>
                        </div>

                    </div>

                    <div class="col-md-2"></div>

                </div>
                <App />

                


            </form>
        );
    }
}
