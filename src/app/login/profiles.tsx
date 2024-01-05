"use client"
import Image from "next/image";
import LoginForm from "./login-form";
import { useState } from "react";

export default function Profiles() {
  const [selectedProfile, setSelectedProfile] = useState(null)


  return (
   {selectedProfile && <LoginForm />}
    <h1>Who are you?</h1>
    )
    // <>
    //   <div>
    //     <h1>Who are you?</h1>
    //     <div>
    //       <div>
    //         <Image src="/tashan.jpg" alt={""} width={200} height={200} />
    //         <span>Tashan</span>
    //       </div>
    //       <div>
    //         <Image src="/christina.png" alt={""} width={200} height={200} />
    //         <span>Christina</span>
    //       </div>
    //       <div>
    //         <Image src="/guest.png" alt={""} width={200} height={200} />
    //         <span>Guest</span>
    //       </div>
    //     </div>
    //     <div>
    //       <button>Manage Profiles</button>
    //     </div>
    //   </div>
      
    // </>
})