"use client"

import { Button, TextField } from "@mui/material";
import { Products } from "@prismaClient";
import { useEffect, useState } from "react";

interface fromInput {
    buyername: string,
    id: string,
    name: string,
    price: number,
}


const FromInputPrice = ({ id, name, buyername, price }: fromInput) => {
    const [pages, setPages] = useState(25)
    const [dateNow, setDate] = useState("")


    useEffect(() => {
        const now = new Date
        const formatted = now.toLocaleString("en-EN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
        setDate(formatted)
    })

    return (
        <>
            <div className=" w-full p-5">
                <pre><strong>Chekout</strong></pre>
                <hr />
                <div className="w-full flex justify-between">Produk name: <span>{name}</span></div>
                <div className="w-full flex justify-between">Produk id: <span>{id.slice(0,8)}...</span></div>
                <div className="w-full flex justify-between">Buyer: <span>{buyername}</span></div>
                <div className="w-full flex justify-between">Date: <span>{dateNow}</span></div>
                <hr />
                <br />
                <div className="w-full flex justify-between"><div><Button variant="contained" >Add File</Button><span> fileName</span></div> <span>Total Pages: {pages}</span></div>
                <br />
                <div className="w-full flex justify-between">Price <span>Rp. {price}/items</span></div>
                <div className="w-full flex justify-between">Total <span>Rp. {price * pages}</span></div>
                <hr />
                <br />
                <TextField className="w-full"
                    type="number"
                    label="Your Phone number"
                    InputProps={{
                        inputProps: { min: 1 },
                        sx: {
                            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                            },
                            '& input[type=number]': {
                                MozAppearance: 'textfield',
                            },
                        },
                    }}
                />
                <br /><br />
                <Button variant="contained" className="w-full" color="success">Buy</Button>
            </div>
        </>
    );
}

export default FromInputPrice;
