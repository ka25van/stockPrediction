"use client";
// add the "use client" directive at the top of your file. This will ensure that the file is treated as a client component in Next.js.
import Register from "./pages/register"
import Login from "./pages/login";
import Dashboard from "./pages/dashboard"

export default function Home() {
  return (
    <div>
      {/* <Register/>
      <Login/> */}
      <Dashboard/>
    </div>
  );
}
