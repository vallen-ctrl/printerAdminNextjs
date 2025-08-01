"use client"

import Card from "@/components/card "
import { Products } from "@prismaClient"
import { Stack } from "@mui/material"
import { usePathname, useRouter } from "next/navigation"


interface clientRender {
    data: Products[]
}


export default function ClientRender({ data }: clientRender) {
    const router = useRouter(); 
    const pathname = usePathname();

    const handleClick = (e: React.MouseEvent<HTMLParagraphElement>) =>{
        const id = e.currentTarget.dataset.id;
        router.push(`${pathname}/product/${id}`)
    }

    return (<>
        <Stack
            direction="row"

            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
            }}>
            {data.map(product => (<Card
                id={product.id}
                name={product.name}
                desc={product.description}
                price={product.price}
                key={product.id}
                star={product.productStar}
                pembeli={product.totalBuyer}
                onClick={handleClick}
            ></Card>))}
        </Stack>
    </>)
}