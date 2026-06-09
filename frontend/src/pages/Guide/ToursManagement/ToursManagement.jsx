import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import { Button } from '../../../shared/components/Button/Button'
import { Card } from '../../../shared/components/cards/Cards'

function ToursManagement() {
  return (
<>
<Navbar/>

<h1>My Tours</h1>

<div classname='text'>
<p>Manage your curated experiences and
track their performance.</p>
</div>

<Button/>

<div classname='insights'>
<p>{`all(${tours.all}) active(${tours.active}) Reviewing(${tours.all}) Draft(${tours.all})  `}</p>
</div>

<Card/>
</>
  )
}

export default ToursManagement