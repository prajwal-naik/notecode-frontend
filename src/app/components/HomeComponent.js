"use client"

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import MonacoEditorComponent from './MonacoEditorComponent';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const HomeComponent = ({ prerenderedCodeSnippet }) => {

  const SERVER_IP = process.env.NEXT_PUBLIC_SERVER_IP;
  // const SERVER_PORT = process.env.NEXT_PUBLIC_SERVER_PORT;

  const router = useRouter();

  const [theme, setTheme] = useState(prerenderedCodeSnippet.theme);
  const [language, setLangaue] = useState(prerenderedCodeSnippet.language);
  const [codeUuid, setCodeUuid] = useState(prerenderedCodeSnippet.uuid);
  const [codeChanged, setCodeChanged] = useState(false);

  const [code, setCode] = useState(prerenderedCodeSnippet.code);

  

  useEffect(() => {
    setCode(prerenderedCodeSnippet.code);
    setTheme(prerenderedCodeSnippet.theme);
    setLangaue(prerenderedCodeSnippet.language);
    setCodeUuid(prerenderedCodeSnippet.uuid);
    setCodeChanged(false);
    if (codeUuid === "") {
      setCodeChanged(true)
    } 
  }, [prerenderedCodeSnippet]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    setCodeChanged(true);
  };

  const handleShare = () => {
    axios.post(`https://${SERVER_IP}/api/snippets/`, {
      code: code,
      language: language,
      theme: theme
    }).then((response) => {
      setCodeUuid(response.data.id);
      setCodeChanged(false);
      router.push(`/${response.data.id}`);
    })
    .catch((error) => {
      console.error("Error occured while storing snippet: ", error);
    });
  };

  return (
    <div className="relative min-h-screen">
      <div 
        className="fixed inset-0 top-0 z-0" 
        style={{ 
          backgroundImage: "url('/assets/Hero-Background-notecode@2x.png')",
          backgroundSize: "100% 80%",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
      </div>
      <div className="relative px-[40px] md:px-0 w-full md:w-[70%] h-screen mx-auto z-10 flex flex-col overflow-y-scroll no-scrollbar py-[40px] gap-[30px]">
        <div className="mx-auto p-4 flex flex-col justify-center items-center gap-[35px]">
          <Image src={'/assets/NoteCodeLogo.svg'} width={150} height={500} alt="app_logo"/>
          <div className="flex flex-col justify-center items-center">
            <p className="font-outfit text-[32px]">Create & Share</p>
            <p className="font-outfit text-[40px]">Your Code easily</p>
          </div>
        </div>
        <div className={`flex-1 flex flex-col ${theme === "vs-dark"?"bg-[#201c1c]":"bg-white"} md:mx-auto w-[100%] max-w-[100%] md:w-[70%] rounded-2xl shadow-2xl overflow-scroll no-scrollbar py-[20px]`}>
          <MonacoEditorComponent
            value={code}
            onChange={handleCodeChange}
            language={language}
            theme={theme}
          />
          <div className="flex justify-between items-center mx-[30px]">

            {/* Left Div */}
            <div className="flex gap-[10px] relative">
              {/* Language Button */}
              <div 
                className={`flex items-center justify-center gap-[2px] bg-[#CED6E1] px-[10px] py-[5px] rounded-[999px] font-outfit text-[12px] hover:cursor-pointer transition-color duration-[1000]`}
                onClick={() => {
                  // setCodeChanged(true);
                  // setLangaue("html");
                  
                }}
              >
                <div className={`text-[#364153] select-none text-[10px] font-[0.625rem]`}>{language.charAt(0).toUpperCase()}{language.slice(1)}</div>
                <Icon icon={"iconamoon:arrow-down-2-light"} className={`w-[15px] h-[15px] text-[#364153]}`} />
              </div>

              {/* Theme Button */}
              <div 
                className="flex items-center justify-center gap-[2px] bg-[#CED6E1] px-[10px] py-[5px] rounded-[999px] font-outfit text-[12px] hover:cursor-pointer transition-all duration-[1000]"
                onClick={() => {
                  setCodeChanged(true);
                  if (theme === "vs-light") {
                    setTheme("vs-dark");
                  }
                  else {
                    setTheme("vs-light");
                  }
                }}
              >
                <div className={`text-[#364153] select-none text-[10px] font-[0.625rem]`}>{(theme === "vs-light") ? "Dark" : "Light"}</div>
                <Icon icon={"iconamoon:arrow-down-2-light"} className={`w-[15px] h-[15px] text-[#364153]`} />
              </div>
            </div>

            {/* Right Div - Share Button + Sharing Link */}
            <div className="flex gap-[20px] items-center justify-center">
              {/* Url display */}
              {
                codeUuid && (
                  <div className="flex gap-[5px] items-center justify-center">
                    <Icon icon={"mingcute:link-2-line"} className={`w-[15px] text-[#364153]`} />
                    <p className="text-[#364153] text-[10px] font-[0.625rem]">.../{codeUuid}</p>
                  </div>
                )
              }

              {/* Share Button */}
              <div 
                  className={`flex justify-center items-center gap-[8px] 
                    ${theme === "vs-dark"?"bg-[#364153]":"bg-[#406AFF]"} 
                    px-[15px] py-[10px] pr-[25px] rounded-[999px] font-outfit 
                    text-[12px] transition-color duration-[1000] 
                    ${codeChanged == false?
                      "opacity-50 hover:cursor-not-allowed"
                      :"opacity-100 hover:cursor-pointer"
                    }`
                  }
                  onClick={() => {if (codeChanged === true) handleShare()}}
                >
                  <Icon icon={"material-symbols-light:share-outline"} className={`w-[20px] h-[20px] text-[#FFFFFE]`} />
                  <div className={`text-[#FFFFFE] select-none font-outfit text-[16px] font-[1rem]`}>Share</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeComponent