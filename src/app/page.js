// "use client"

import HomeComponent from "./components/HomeComponent";
import { TEMPLATE_SNIPPET } from "./constants";




export default function Home() {

  return (
    <HomeComponent prerenderedCodeSnippet={TEMPLATE_SNIPPET}/>
  );
}
