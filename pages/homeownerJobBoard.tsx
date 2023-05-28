import { SessionProvider, GetSessionParams, getSession } from "next-auth/react"
import Layout from "../components/layout"
import HomeownerJobs from "../components/homeownerJobs"

interface CustomMintPageProps {
  session: any
}

export default function CustomMintPage({ session }: CustomMintPageProps) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <HomeownerJobs session={session} />
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

