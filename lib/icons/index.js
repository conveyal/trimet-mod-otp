import React from 'react'

import BikeIcon from './bike-icon'
import BiketownIcon from './biketown-icon'
import BoltIcon from './bolt-icon'
import BusIcon from './bus-icon'
import Car2goIcon from './car2go-icon'
import ReachNowIcon from './reachnow-icon'
import GondolaIcon from './gondola-icon'
import GruvIcon from './gruv-icon'
import LimeIcon from './lime-icon'
import LyftIcon from './lyft-icon'
import RailIcon from './rail-icon'
import RazorIcon from './razor-icon'
import SharedIcon from './shared-icon'
import SpinIcon from './spin-icon'
import StreetcarIcon from './streetcar-icon'
import TramIcon from './tram-icon'
import TransitIcon from './transit-icon'
import UberIcon from './uber-icon'
import WalkIcon from './walk-icon'

// define Portland-specific mode icons
export default {
  BICYCLE: <BikeIcon />,
  BIKETOWN: <BiketownIcon />,
  BOLT: <BoltIcon />,
  BUS: <BusIcon />,
  CAR2GO: <Car2goIcon />,
  CLEVR: <GruvIcon />,
  GONDOLA: <GondolaIcon />,
  LIME: <LimeIcon />,
  LYFT: <LyftIcon />,
  RAIL: <RailIcon />,
  RAZOR: <RazorIcon />,
  REACHNOW: <ReachNowIcon />,
  SHARED: <SharedIcon />,
  SPIN: <SpinIcon />,
  STREETCAR: <StreetcarIcon />,
  TRAM: <TramIcon />,
  TRANSIT: <TransitIcon />,
  UBER: <UberIcon />,
  WALK: <WalkIcon />,
  customIconForLeg: (leg) => {
    if (
      leg.routeLongName &&
      leg.routeLongName.startsWith('Portland Streetcar')
    ) {
      return 'STREETCAR'
    } else if (leg.rentedBike) {
      return 'BIKETOWN'
    }
    return null
  }
}
