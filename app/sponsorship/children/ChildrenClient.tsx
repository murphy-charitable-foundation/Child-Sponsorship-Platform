

import React from "react";
import { createClient } from "@/lib/supabase/server";
//import {fetchChildren, getUniqueCountries} from "./fetch-children";
import MeetTheChildrenUI from "@/components/meet-the-children-ui";
import { Suspense } from "react";


/*const children = [
  { id: 1, name: "John Doe1", img: "/children/girl2.jpg", gender: "Male", age: 8, country: "Uganda1" , grade: 3, bioText: "Short biography about the child goes here."},
  { id: 2, name: "John Doe2", img: "/children/girl2.jpg", gender: "Male", age: 18, country: "Uganda" , grade: 4, bioText: "Short biography about the child goes here."},
  { id: 3, name: "John Doe3", img: "/children/girl2.jpg", gender: "Female", age: 8, country: "Uganda1" , grade: 3, bioText: "Short biography about the child goes here."},
  { id: 4, name: "John Doe4", img: "/children/girl2.jpg", gender: "Male", age: 8, country: "Uganda2" , grade: 5, bioText: "Short biography about the child goes here."},
  { id: 5, name: "John Doe5", img: "/children/girl2.jpg", gender: "Female", age: 20, country: "Uganda" , grade: 5, bioText: "Short biography about the child goes here."},
  { id: 6, name: "John Doe6", img: "/children/girl2.jpg", gender: "Male", age: 21, country: "Uganda2" , grade: 3, bioText: "Short biography about the child goes here."},
  { id: 7, name: "John Doe7", img: "/children/girl2.jpg", gender: "Female", age: 8, country: "Uganda" , grade: 11, bioText: "Short biography about the child goes here."},
  { id: 8, name: "John Doe8", img: "/children/girl2.jpg", gender: "Male", age: 11, country: "Uganda" , grade: 3, bioText: "Short biography about the child goes here."},
  { id: 9, name: "John Doe9", img: "/children/girl2.jpg", gender: "Male", age: 12, country: "Uganda2" , grade: 12, bioText: "Short biography about the child goes here."},

];*/



const genders = ["Male", "Female"];
const gradeLevels = ["Infant", "Pre-School", "1-3", "4-6", "7-9", "10-12", "College"];


    
    

export default async function ChildrenClient() {
  //const children = await fetchChildren(0, 4);
  //const uniqueCountries = await getUniqueCountries();
const supabase = await createClient();

    const { data: children, error: childrenError } = await supabase // TODO: pass and apply filters
        .from('children')
        .select(`id, first_name, last_name, gender, date_of_birth, country, school_grade, photo_path, favorite_activity, dream_job`)
        .eq('active', true)
        .range(0, 5 - 1);
        //.order('id', { ascending: true });

        if (childrenError) {
            console.log(childrenError)
            throw childrenError
        }


    const { data: countries, error: countriesError } = await supabase
        .from('children')
        .select('country')
        .neq('country', null)
        .eq('active', true);

    if (countriesError) {
        console.log(countriesError)
        throw countriesError
    }

    const uniqueCountries = Array.from(
        new Set(countries.map(row => row.country))
    ).sort();
  
  return(
    <main>
      <MeetTheChildrenUI children={children} uniqueCountries={uniqueCountries} />
    </main>
  );
}