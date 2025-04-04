"use client";
import React from 'react';
import Image from 'next/image';

const LoadingSpinner = () => {

  const spinnerStyle ={
    display: "flex",
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <>
      <main style={spinnerStyle}>
      <Image
          src="assets/icons/loader.svg" 
          alt="Logos"
          width={70}
          height={70}
        />
      </main>
    </>
  );
};


export default LoadingSpinner;
