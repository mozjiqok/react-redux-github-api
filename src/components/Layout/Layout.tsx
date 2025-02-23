import Navbar from "./Navbar";

export default function Layout({ children }: any) {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
}
