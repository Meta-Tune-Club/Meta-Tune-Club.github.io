import IndexHeader from "./indexheader";
import Footer from "./footer"
interface Props {
  children: React.ReactNode;
}

export default function IndexLayout({ children }: Props) {
  return (
    <>
      <IndexHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
