// app/dashboard/DashboardClient.tsx
"use client";

import Swal from "sweetalert2";

export default function DashboardClient({ user }: { user: { name: string } }) {
  const handle = () => {
    Swal.fire("button clicked");
  };

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={handle}>Click me</button>
    </div>
  );
}
