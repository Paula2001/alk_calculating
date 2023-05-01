import {useEffect, useState} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {calculateBac, getResult, gramsInBlood} from "./BL.ts";
import {FormControlLabel, Paper, Radio, RadioGroup, TextField} from "@mui/material";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function BACCalculator() {
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('female');
    const [drinks, setDrinks] = useState(null);
    const [result, setResult] = useState(['','1.png']);
    const [stage, setStage] = useState(1);

    const MySwal = withReactContent(Swal)
    const StageOne = () => {
        const [w, setW] = useState(weight);
        const [g, setG] = useState(gender);

        const wChange = (event) => {
            setW(event.target.value);
        };
        const GenderChange = (event) => {
            setG(event.target.value);
        };
        return(<>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>
                    Weight (kg):
                </Form.Label>
                <Col sm={10}>
                    <TextField label={"weight"} type="number" value={w} onChange={wChange} required />
                </Col>
            </Form.Group>

            <div style={{display: "grid" ,margin: "0 auto"}}>
                <Form.Label  column sm={2}>
                    Gender:
                </Form.Label>
                <RadioGroup
                    style={{display: "flex" ,margin: "0 auto", flexDirection: "row"}}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel checked={g === 'female'} onChange={GenderChange} value="female" control={<Radio />} label="Female" />
                    <FormControlLabel checked={g === 'male'} onChange={GenderChange} value="male" control={<Radio />} label="Male" />
                </RadioGroup>

            </div>
            <Button onClick={() => {
                if(!w) {
                    MySwal.fire({
                        title: "Please Set Weight !",
                    })
                    return;
                }
                setStage(2)
                setGender(g);
                setWeight(w);
            }} variant="contained">Next</Button>
        </>);
    }

    const StageTwo = () => {
        const [d, setD] = useState([
            { liters: null, alkPercentage: null}
        ]);
        const change = (index, event) => {
            const newDrinks = [...d];
            newDrinks[index][event.target.name] = event.target.value;
            setD(newDrinks);
        }
        useEffect(() => {
            if (drinks) {
                setD(drinks);
            }
        }, [])
        const handleAddDrink = () => {
            setD([...d, { liters: null, alkPercentage: null }]);
        };
        return(
            <>
                <div style={{overflow: "auto", height: "400px"}} >
                    {d.map((drink, index) => (
                        <Form.Group key={index} as={Row}>
                            <Form.Label column sm={2}>
                                Drink #{index + 1}:
                            </Form.Label>
                            <Col sm={5}>
                                <TextField
                                    style={{margin: 15}}
                                    onChange={(event) => change(index, event)}
                                    type="number"
                                    required={true}
                                    name="liters"
                                    value={drink.liters ?? 0}
                                    placeholder="% Alcohol by volume"
                                    id="outlined-basic"
                                    label="Liters"
                                />

                            </Col>
                            <Col sm={5}>
                                <TextField
                                    type="number"
                                    name="alkPercentage"
                                    label="ALK Percentage"
                                    value={drink.alkPercentage ?? 0}
                                    onChange={(event) => change(index, event)}
                                    required
                                    placeholder="% Alcohol by volume"
                                />
                            </Col>
                        </Form.Group>
                    ))}
                </div>

                <Button variant="primary" onClick={handleAddDrink}>
                    Add Drink
                </Button>
                <br/>
                <Button onClick={() => {
                    setStage(1);
                }} variant="contained">Back</Button>
                <Button style={{margin: 10}} type="submit" onClick={() => {
                    for (let i = 0; i < d.length; i++) {
                        if(!d[i].liters || !d[i].alkPercentage) {
                            MySwal.fire({
                                title: "Please Set Liters and Pecentage Example liters = 0.5, Percentage = 5.8 !",
                            });
                            return ;
                        }
                    }
                    console.log('this is ',d);
                    setDrinks(d);
                    setStage(3);
                    calculate(d);
                }} variant="contained">Next</Button>
            </>
        );
    }

    const StageThree = () => {
        return (<div>
            <img width={300} height={400} src={`/${result[1]}`}/>
            <p>{result[0]}</p>
        </div>);
    }

    const Stage = () => {
        switch (stage) {
            case 2:
                return <StageTwo />;
            case 3:
                return <>
                    <StageThree />
                    <Button onClick={() => {
                        setStage(2);
                    }} variant="contained">Back</Button>
                </>;
            default:
                return <StageOne />
        }
    }

    const calculate = (dd) => {
        let grams: number = 0;
        for (let i = 0; i < dd.length; i++) {
            grams= grams + gramsInBlood(Number(dd[i].liters),Number( dd[i].alkPercentage));
        }

        const bac = calculateBac(gender === "male",grams,  weight);
        setResult(getResult(bac));
    };

    return (
        <>
        <h1 style={{color:"black"}}>Learn how much you can drink before you actually get <span style={{color: "red"}}>drunk</span>  ;) 🍺</h1>

    <Paper style={{padding: 40}}>
            <Stage />
        </Paper>
        </>
    );
}

export default BACCalculator;
