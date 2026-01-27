

import React from "react";
//import {fetchChildren, getUniqueCountries} from "./fetch-children";
import MeetTheChildrenUI from "@/components/meet-the-children-ui";
import { Suspense } from "react";



const genders = ["Male", "Female"];
const gradeLevels = ["Infant", "Pre-School", "1-3", "4-6", "7-9", "10-12", "College"];


export default async function MeetTheChildrenPage() {
  //const children = await fetchChildren(0, 4);
  //const uniqueCountries = await getUniqueCountries();

  
  return(
  <main>
    <Suspense fallback={<div className="p-10">Loading children…</div>}>
      <MeetTheChildrenUI groupSponsorship={false} />
    </Suspense>
    </main>
  );
}