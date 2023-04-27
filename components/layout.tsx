import Header from "./header";
import Mint from "./mint";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <button onClick={Mint}/>
      <main>{children}</main>
    </>
  );
}
