import React from 'react'

type PageProps = {
  params: Promise<{
    slug: string[]
  }>
}

const DynamicPageWithCatchAllRoutes = async ({ params }: PageProps) => {
  const {slug} = await params // slug comes in form of array
  console.log(slug);
  
  return (
    <div>DynamicPageWithCatchAllRoutes {slug.join("/")}</div>
  )
}

export default DynamicPageWithCatchAllRoutes