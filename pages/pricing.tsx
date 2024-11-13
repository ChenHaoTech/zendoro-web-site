import { NextSeo } from "next-seo"
import Layout from "../components/misc/layout"
import FeaturesTable from "../components/pricing/features-table"
import PricingTables from "../components/pricing/pricing-tables"

export default function Pricing() {
  return (
    <Layout>
      <NextSeo title="Pricing" />
      <PricingTables />
    </Layout>
  )
}