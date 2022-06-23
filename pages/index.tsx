import type { NextPage } from 'next'
import { useState } from 'react'
import ColorContainer from '../components/ColorContainer'
import GradientsContainer from '../components/GradientsContainer'
import Header from '../components/Header'

const Home: NextPage = () => {
  const [selectTab, setSelectedTab] = useState<'gradients' | 'colors'>(
    'gradients'
  )

  return (
    <>
      <Header selectedTab={selectTab} setSelectedTab={setSelectedTab} />
      {selectTab === 'gradients' ? <GradientsContainer /> : <ColorContainer />}
    </>
  )
}

export default Home
