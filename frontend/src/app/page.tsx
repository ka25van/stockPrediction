"use client";
// add the "use client" directive at the top of your file. This will ensure that the file is treated as a client component in Next.js.
import Dashboard from "./pages/dashboard"

export default function Home() {
  return (
    <div>
      <Dashboard/>
    </div>
  );
}
