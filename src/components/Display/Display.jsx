import {useState, useEffect} from "react";
import './Display.css'

const Display = () => {
    const [gatesList1, setGatesList1] = useState([
        // MOCK DATA TO USE IN DEV
        // {"operator":"and", "symbol": "."},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"not", "symbol": "~"},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"and", "symbol": "."},
    ]);
    const [wireInput1, setWireInput1] = useState(0)
    const [wireOutput1, setWireOutput1] = useState(0)

    const [gatesList2, setGatesList2] = useState([
        // MOCK DATA TO USE IN DEV
        // {"operator":"and", "symbol": "."},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"not", "symbol": "~"},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"and", "symbol": "."},
    ]);
    const [wireInput2, setWireInput2] = useState(0)
    const [wireOutput2, setWireOutput2] = useState(0)

    const [gatesList3, setGatesList3] = useState([
        // MOCK DATA TO USE IN DEV
        // {"operator":"and", "symbol": "."},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"not", "symbol": "~"},
        // {"operator":"or", "symbol": "+"},
        // {"operator":"and", "symbol": "."},
    ]);
    const [wireInput3, setWireInput3] = useState(0)
    const [wireOutput3, setWireOutput3] = useState(0)

    const handleDragOver = (e) => {
        e.preventDefault();
        console.log("dragging over");
    }

    const handleWireInputChange = (e, wireNum) => {
        const value = e.target.value;
        if (value === '0' || value === '1' || value === '') {
            switch(wireNum) {
                case 1:
                    setWireInput1(value);
                    break;
                case 2:
                    setWireInput2(value);
                    break;
                case 3:
                    setWireInput3(value);
                    break;
            }
        }
    };

    const calculateWireOutputOnChange = (wireNum, oldOutput) => {
        let newOutput;
        for(let i = 0; i < gatesList1.length; i++) {
            newOutput = calculateWireOutput(oldOutput, gatesList1[i].operator);
        }
        setWireOutput1(newOutput);
    }


    const calculateWireOutput = (oldOutput, operator) => {
        let newOutput;
        switch(operator) {
            case "not":
                newOutput = Number(!oldOutput);
                break;
        }
        return newOutput;
    }

    const handleDrop1 = (e) => {
        if(gatesList1.length < 5) {
            let newGate = JSON.parse(e.dataTransfer.getData("text/plain"));
            newGate = {id: gatesList1.length, ...newGate};
            setGatesList1([...gatesList1, newGate]);

            const newOutput = calculateWireOutput(wireOutput1, newGate.operator);
            setWireOutput1(newOutput);
        }
        else {
            alert("ERROR: A maximum of 5 gates are allowed on the simulator quantum wire at a time.")
        }
    }
    const handleDrop2 = (e) => {
        if(gatesList2.length < 5) {
            let newGate = JSON.parse(e.dataTransfer.getData("text/plain"));
            newGate = {id: gatesList2.length, ...newGate};
            setGatesList2([...gatesList2, newGate]);

            const newOutput = calculateWireOutput(wireOutput2, newGate.operator);
            setWireOutput2(newOutput);
        }
        else {
            alert("ERROR: A maximum of 5 gates are allowed on the simulator quantum wire at a time.")
        }
    }
    const handleDrop3 = (e) => {
        if(gatesList3.length < 5) {
            let newGate = JSON.parse(e.dataTransfer.getData("text/plain"));
            newGate = {id: gatesList3.length, ...newGate};
            setGatesList3([...gatesList3, newGate]);

            const newOutput = calculateWireOutput(wireOutput3, newGate.operator);
            setWireOutput3(newOutput);
        }
        else {
            alert("ERROR: A maximum of 5 gates are allowed on the simulator quantum wire at a time.")
        }
    }
    

    return (
        <section className="display">
            <h2>Simulator</h2>
            <div className="circuit-area">
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop1}>
                    <span className="qubit-name">q[0]</span>
                    <input
                        className="wire-input"
                        value = {wireInput1}
                        type="text"
                        maxLength="1"
                        onChange={(e)=>handleWireInputChange(e, 1)}
                    />
                    <div className="wire"></div>
                    <div className="wire-gates-area">
                        {gatesList1.map((gate, index) => {
                            return(
                                <div key = {index} className="wire-gate gate">
                                    <span>{gate.symbol}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="wire-output">{wireOutput1}</div>
                </div>
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop2}>
                    <span className="qubit-name">q[0]</span>
                    <input
                        className="wire-input"
                        value={wireInput2}
                        type="text"
                        maxLength="1"
                        onChange={(e)=>handleWireInputChange(e, 2)}
                    />
                    <div className="wire"></div>
                    <div className="wire-gates-area">
                        {gatesList2.map((gate, index) => {
                            return (
                                <div key={index} className="wire-gate gate">
                                    <span>{gate.symbol}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="wire-output">{wireOutput2}</div>
                </div>
                <div className="circuit-block" onDragOver={handleDragOver} onDrop={handleDrop3}>
                    <span className="qubit-name">q[0]</span>
                    <input
                        className="wire-input"
                        value={wireInput3}
                        type="text"
                        maxLength="1"
                        onChange={(e)=>handleWireInputChange(e, 3)}
                    />
                    <div className="wire"></div>
                    <div className="wire-gates-area">
                        {gatesList3.map((gate, index) => {
                            return (
                                <div key={index} className="wire-gate gate">
                                    <span>{gate.symbol}</span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="wire-output">{wireOutput3}</div>
                </div>
            </div>
        </section>
    );
};

export default Display;