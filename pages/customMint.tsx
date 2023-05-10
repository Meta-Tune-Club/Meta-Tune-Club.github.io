import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import MintNft from "../components/mintNft"

export default function CustomMintPage() {
  const { data } = useSession()

  return (
    <Layout>
    </Layout>
  )
}
