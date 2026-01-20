

import React from "react";
import { createClient } from "@/lib/supabase/server";
import MeetTheChildrenUI from "@/components/meet-the-children-ui";
import { Suspense } from "react";




const genders = ["Male", "Female"];
const gradeLevels = ["Infant", "Pre-School", "1-3", "4-6", "7-9", "10-12", "College"];


    
    

export default async function ChildrenClient() {
const supabase = await createClient();

    const { data: children, error: childrenError } = await supabase // TODO: pass and apply filters
        .from('children')
        .select(`id, first_name, last_name, gender, date_of_birth, location, school_grade, photo_path, favorite_activity, dream_job`)
        .eq('active', true)
        .range(0, 5 - 1);
        //.order('id', { ascending: true });

        if (childrenError) {
            console.log(childrenError)
            throw childrenError
        }


    const { data: countries, error: countriesError } = await supabase
        .from('children')
        .select('location')
        .neq('location', null)
        .eq('active', true);

    if (countriesError) {
        console.log(countriesError)
        throw countriesError
    }

    const uniqueCountries = Array.from(
        new Set(countries.map(row => row.location))
    ).sort();

    console.log('Unique countries:', uniqueCountries);
    console.log('Children:', children);
  
  return(
    <main>
      <MeetTheChildrenUI children={children} uniqueCountries={uniqueCountries} />
    </main>
  );
}