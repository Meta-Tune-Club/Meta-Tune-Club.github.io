import Layout from "../components/layout";
import IndexLayout from "../components/indexlayout";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { url } from "inspector";

export default function IndexPage() {
  return (
    <IndexLayout>
      <div className='indexDiv' style={{
        height: '400px',
        backgroundColor: '#01095E',
      }}>
        <div style={{
          height: '100px',
          width: '800px',
          background: 'green',
          marginLeft: '10rem'
        }}></div>
        <div style={{
          height: '100px',
          width: '800px',
          background: 'green',
          marginLeft: '10rem'
        }}></div>
        <div style={{
          height: '100px',
          width: '800px',
          background: 'green',
          marginLeft: '10rem'
        }}></div>
        <div style={{
          height: '100px',
          width: '800px',
          background: 'green',
          marginLeft: '10rem'
        }}></div>
      </div>
    </IndexLayout>
  );
}