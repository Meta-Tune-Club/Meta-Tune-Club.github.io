import IndexHeader from "./indexheader";
interface Props {
  children: React.ReactNode;
}

export default function IndexLayout({ children }: Props) {
  return (
    <>
      <IndexHeader />
      <main>{children}</main>
    </>
  );
}
