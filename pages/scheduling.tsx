import { SessionProvider, GetSessionParams, getSession } from "next-auth/react"
import Layout from "../components/layout"
import BookAppointment from "../components/scheduleAppt"
import AcceptAppointments from "../components/acceptAppt"

interface CustomMintPageProps {
  session: any
}

export default function Scheduling({ session }: CustomMintPageProps) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <BookAppointment/>
        <AcceptAppointments/>
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
