import prisma from "@/auth";
import ClientRender from "./clientRender";


export default async function ClientSide() {
  const products = await prisma.products.findMany();

  return (
    <main className="p-3">
      <ClientRender data={products} />
    </main>
  );
}
