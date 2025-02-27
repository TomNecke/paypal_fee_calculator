import React, { useRef, useState } from 'react'


export default function Form() {

    const [resultSend, setResultSend] = useState(0);
    const [resultReceive, setResultReceive] = useState(0);
    const [type, setType] = useState("sendRadio");
    const [feeRate, setFeeRate] = useState("0");
    const [sendFee, setSendFee] = useState(0);
    const [receiveFee, setReceiveFee] = useState(0);
    const inputNumber = useRef(null);
    const inputFeeRate = useRef("0");
    const [typeStyle, setTypeStyle] = useState("sendRadio");

    const fee = [
        {
            Titel: "Waren oder Dienstleistungen bezahlen",
            Gebühr: 2.49,
            Festgebühr: 0.35
        },
        {
            Titel: "Zahlung an Freunde und Familie",
            Gebühr: 0.00,
            Festgebühr: 0.00
        },
        {
            Titel: "Spenden sammeln",
            Gebühr: 1.50,
            Festgebühr: 0.35
        },
        {
            Titel: "Mikrozahlung",
            Gebühr: 10.00,
            Festgebühr: 0.10
        },
        {
            Titel: "Zahlung mit QR-Code",
            Gebühr: 0.90,
            Festgebühr: 0.00
        },
        {
            Titel: "Händlerkonditionen < 2.000 €",
            Gebühr: 2.49,
            Festgebühr: 0.35
        },
        {
            Titel: "Händlerkonditionen 2.000 - 5.000 €",
            Gebühr: 2.19,
            Festgebühr: 0.35
        },
        {
            Titel: "Händlerkonditionen 5.000 - 25.000 €",
            Gebühr: 1.99,
            Festgebühr: 0.35
        },
        {
            Titel: "Händlerkonditionen > 25.000 €",
            Gebühr: 1.49,
            Festgebühr: 0.35
        }
    ]

    const handleSubmit = async (event) => {
        let input = Number.parseFloat(inputNumber.current.value)

        let sendFeeCalc = ((input / 100 * fee[inputFeeRate.current.value].Gebühr + fee[inputFeeRate.current.value].Festgebühr) * 100) / 100
        let sendOutput = (input - sendFeeCalc).toFixed(2)

        let receiveOutput = (Math.ceil(((input / (1 - (fee[inputFeeRate.current.value].Gebühr / 100))) + fee[inputFeeRate.current.value].Festgebühr) * 100) / 100).toFixed(2)
        let receiveFeeCalc = receiveOutput - input

        setSendFee(sendFeeCalc.toFixed(2))
        setReceiveFee(receiveFeeCalc.toFixed(2))
        setResultSend(sendOutput)
        setResultReceive(receiveOutput)

    }

    const chooseType = (e) => {
        if(e.target.id == "sendRadio") {
            document.getElementById("typeLabelOne").style.color = "red";
            document.getElementById("typeLabelTwo").style.color = "white";
        } else {
            document.getElementById("typeLabelTwo").style.color = "red";
            document.getElementById("typeLabelOne").style.color = "white";
        }
    }
    return (
        <div className='tab'>
            <h1>PayPal Gebührenrechner</h1>
                    <fieldset className="chooseType" onChange={(e) => { setType(e.target.value) }} >
                        <label htmlFor="sendRadio" id='typeLabelOne'>Gebühren berechnen
                            <input type='radio' id='sendRadio' value="sendRadio" name='selectCalc' onChange={chooseType} defaultChecked />
                        </label>
                        <label htmlFor="receiveRadio" id='typeLabelTwo' >Endsumme berechnen
                            <input type='radio' id='receiveRadio' value="receiveRadio" name='selectCalc' onChange={chooseType} />
                        </label>
                    </fieldset>
            <div className='block'>
                <form onChange={handleSubmit}>
                    <div id='inputBox'>
                        <label htmlFor="inputNum">Betrag in € : </label>
                        <input id='inputNum' type='number' min="0.00" step="0.01" ref={inputNumber} />
                    </div>
                    <select name='feeRate' id='selectFeeRate' onChange={(e) => { setFeeRate(e.target.value) }} ref={inputFeeRate}>
                        <option value="0">{fee[0].Titel}</option>
                        <option value="1">{fee[1].Titel}</option>
                        <option value="2">{fee[2].Titel}</option>
                        <option value="3">{fee[3].Titel}</option>
                        <option value="4">{fee[4].Titel}</option>
                        <option value="5">{fee[5].Titel}</option>
                        <option value="6">{fee[6].Titel}</option>
                        <option value="7">{fee[7].Titel}</option>
                        <option value="8">{fee[8].Titel}</option>
                    </select>
                </form>
                <div className='result'>
                    <h2>Ergebnis</h2>
                    {inputNumber.current && inputNumber.current.value && <div>
                        {type === "sendRadio" ? <p>Betrag: {resultSend} €</p> : <p>Betrag: {resultReceive} €</p>}
                        {type === "sendRadio" ? <p>Gebühren: {sendFee} €</p> : <p>Gebühren: {receiveFee} €</p>}
                    </div>}
                    <div>
                        <p>Gebührenrate: {fee[feeRate].Gebühr} %</p>
                        <p>Festgebühr: {fee[feeRate].Festgebühr} €</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
