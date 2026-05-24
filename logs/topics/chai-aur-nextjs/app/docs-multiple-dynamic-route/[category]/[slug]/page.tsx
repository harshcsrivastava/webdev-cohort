import React from 'react'

const DynamicSlugPage = async ({ params }: { params: { category: string; slug: string } }) => {
  const { category, slug } = params
  return (
    <div>DynamicSlugPage {category} : {slug} </div>
  )
}

export default DynamicSlugPage