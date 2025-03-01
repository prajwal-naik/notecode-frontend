"use client"
import axios from 'axios'
import React, { use, useEffect, useState } from 'react'
import HomeComponent from '../components/HomeComponent';
import { TEMPLATE_SNIPPET } from '../constants';

const page = ({ params }) => {
  const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP;
  // const SERVER_PORT = process.env.NEXT_PUBLIC_SERVER_PORT;
  const [prerenderedCodeSnippet, setPrerenderedCodeSnippet] = useState(TEMPLATE_SNIPPET);
  const {id} = use(params);
  console.log('id:', id);
  useEffect(() => {
    console.log('inside use effect ', id);
      axios.get(`http://${SERVER_IP}/api/snippets/${id}`)
        .then((response) => {
          if(response.status === 200) {
            setPrerenderedCodeSnippet({
              language: response.data.language,
              theme: response.data.theme,
              code: response.data.code,
              uuid: response.data._id
            });
            console.log("###########Seting it:", prerenderedCodeSnippet);
          }
        }).catch((error) => {
          console.error("Error occured while fetching snippet: ", error);
          setPrerenderedCode(TEMPLATE_SNIPPET);
        }
      );
  }, [id]);
  
  return (
    <HomeComponent prerenderedCodeSnippet={prerenderedCodeSnippet}/>
  )
}

export default page