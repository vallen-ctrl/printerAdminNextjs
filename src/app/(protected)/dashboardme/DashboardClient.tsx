// app/dashboard/DashboardClient.tsx
"use client";

import { deleteUser, signOut } from "@/auth-client";
import Swal from "sweetalert2";

export default function DashboardClient({ user }: { user: { name: string } }) {
  const handle = () => {
    Swal.fire("button clicked").then(f=>{
      signOut({
        fetchOptions:{
          onSuccess:()=>{
            Swal.fire("sukses logout")
          }
        }
      })
    });
  };

  const handlehapus = ()=>{
    deleteUser({
      fetchOptions:{
        onRequest: ()=>{
          Swal.fire({
              title: "loading",
              text: "waiting..",
              allowEscapeKey: false,
              allowOutsideClick: false,
              showCancelButton:false,
              didOpen: ()=>{
                  Swal.showLoading()
              }
          })
        }, onSuccess:()=>{
          Swal.close()
        }
      }
    })
  }

  return (
    <div className="text-black">
      <h1>Welcome {user.name}</h1>
      <button onClick={handle}>log out</button>
      <br />
      <button onClick={handlehapus}>hapus data</button>
    </div>
  );
}
