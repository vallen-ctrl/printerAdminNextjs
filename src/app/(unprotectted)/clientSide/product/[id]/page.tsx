import prisma from "@/auth";
import ProductRender from "./productRender";
import { headers } from "next/headers";
import { getCookieCache } from "better-auth/cookies";


export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;  // tunggu params-nya
  
  const sesion = await getCookieCache(await headers())
  
  const data = await prisma.products.findUnique({
    where:{
      id: params.id
    }
  })

  if (!data) {
    return <div className="text-center mt-10 text-red-500">Produk tidak ditemukan.</div>;
  }
  
  return (
    <>
      <div className="w-full flex justify-center">
        <ProductRender data={data} buyerName={sesion? sesion.user.name : "404" }></ProductRender>
      </div>
    </>
  );
}
