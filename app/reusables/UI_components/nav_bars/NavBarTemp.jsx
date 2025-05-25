import Image from '@node_modules/next/image'
import React from 'react'

export default function NavBarTemp({children, navBarTempStyle}) {
  return (
    <div style={navBarTempStyle}>
      {children}
    </div>
  )
}

export function NavContainer({children,navContainerStyle}){
    return(
        <div style={navContainerStyle}>{children}</div>
    )
}
export function NavIcon({navIconStyle, children, iconEvent}){
    return(
        <i style={navIconStyle} onClick={iconEvent}>{children}</i>
    )
}
export function NavImage({imageAttributes}){
    return(
        <Image
        src={imageAttributes.src} 
        height={imageAttributes.height}
        width={imageAttributes.width}
        alt={imageAttributes.alt}
        unoptimized
        />
    )
}
export function NavText({children,navTextStyle}){
    return(
        <div style={navTextStyle}>{children}</div>
    )
}

//Create Props
NavBarTemp.NavContainer = NavContainer;
NavBarTemp.NavImage = NavImage;
NavBarTemp.NavIcon = NavIcon;
NavBarTemp.NavText = NavText;
