"use client"


import { Button, Collapse, Dialog, Icon, Stack } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Products } from '@prismaClient';
import FromInputPrice from '@/components/fromInput/frominput';
import { usePathname, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface data {
  data: Products,
  buyerName: string
}


const ProductRender = ({ data, buyerName }: data) => {
  const router = useRouter(); 
  const pathName = usePathname()
  const [bacaSelengkapnya, setBacaselengkapnya] = useState(false)
  const [open, setOpen] = useState(false)
  const handler = () => {
    setBacaselengkapnya(!bacaSelengkapnya)
  }
  const buyButtonHandler = () => {
    if(buyerName == "404") {
      return Swal.fire({
          title: "Are you already signIn?",
          text:"this eror show when you are not signIn in this website, do signIn first and your are ready",
        }).then(()=>window.open(`/signIn?authTrue=${pathName}`,"_blank"))
      }
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
      <div className="card shadow-2xl text-black
        w-[100vw]
       max-w-2xl
       overflow-hidden
       
      ">
        <Image
          className="
          w-full
          "
          width={672} height={672} alt='as' src="/pexels.jpg"  ></Image>
        <div className="
          p-2.5
        ">
          <pre><strong>{data.name}</strong></pre>
          <div className='
           text-gray-600
            flex justify-between
          '><span>Rp. <span>{data.price}</span></span> <span>{data.totalBuyer} Dibeli</span></div>
          <hr className='mt-2 mb-2' />
          <h3>Description</h3>
          <Collapse collapsedSize={200} in={bacaSelengkapnya}>
            <p className='text-gray-700'>{data.description}</p>
          </Collapse>
          <hr className='mt-4' />
          <Stack direction="column">
            <button onClick={handler} className=' cursor-pointer' >{bacaSelengkapnya ? "Sembunyikan" : "Baca selengkapnya"}</button>
            <br />
            <Button className='' variant="contained" color="success" onClick={buyButtonHandler}>Beli</Button>
          </Stack>
          <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth={true}>
            <FromInputPrice 
              id={data.id}
              name={data.name}
              buyername={buyerName}
              price={data.price}
            ></FromInputPrice>
          </Dialog>
        </div>
      </div>
  );
}

const StyledWrapper = styled.div`
  .card {
   background: white;
   border-radius: 10px;
   transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .shadow {
   box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
               0 0  0 2px rgb(190, 190, 190),
               0.3em 0.3em 1em rgba(0,0,0,0.3);
  }`;

export default ProductRender;
