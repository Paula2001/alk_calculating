import { useState } from 'react'
import BACCal from "./BacCal.tsx";
import './App.css'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container>
        <BACCal />
    </Container>
  )
}

export default App
