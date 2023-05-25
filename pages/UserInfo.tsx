//pages/UserInfo.tsx
import { SessionProvider, GetSessionParams, getSession } from "next-auth/react"
import AccSetup from "../components/accSetup"
import Layout from "../components/layout"

interface CustomMintPageProps {
  session: any
}

export default function CustomMintPage({ session }: CustomMintPageProps) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <AccSetup session={session} />
      </SessionProvider>
    </Layout>
  )
}

export async function getServerSideProps(context: GetSessionParams | undefined) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

