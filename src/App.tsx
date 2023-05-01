import { useState } from 'react'
import BACCal from "./BacCal.tsx";
import './App.css'
import { Container } from 'react-bootstrap';
import {Paper} from "@mui/material";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
        <BACCal />
        <Paper style={{margin: 10, fontWeight: "bolder"}}>⚠️Caution: non of the numbers are super accurate please seek medical assistance in case of medical emergency ⚠️</Paper>
        <Paper style={{margin: 10, fontWeight: "bold"}}>Made with ⚛️ And ❤️ By <a href={"https://paula-george.guru"} >Paula Gawargious</a> And remember don't 🍺 and 🚗 </Paper>
    </Container>
  )
}

export default App
