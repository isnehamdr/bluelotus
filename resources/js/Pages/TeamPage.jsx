import BackToTop from '@/HomeComponents/BackToTop'
import Footer from '@/HomeComponents/Footer'
import Navbar from '@/HomeComponents/Navbar'
import TeamBanner from '@/HomeComponents/TeamBanner'
import TeamSection from '@/HomeComponents/TeamSection'
import React from 'react'

const TeamPage = () => {
  return (
    <>
    <Navbar/>
    <BackToTop/>
    <TeamBanner/>
    <TeamSection/>
    <Footer/>
    </>
  )
}

export default TeamPage