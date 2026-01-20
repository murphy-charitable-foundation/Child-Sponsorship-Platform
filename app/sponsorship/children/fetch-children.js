

import { createClient } from "@/lib/supabase/server";

export async function fetchChildren(startIdx, endIdx) {
    const supabase = await createClient();

    const { data: children, error } = await supabase // TODO: pass and apply filters
        .from('children')
        .select(`id, first_name, last_name, gender, date_of_birth, country, school_grade, photo_path, favorite_activity, dream_job`)
        .eq('active', true)
        .range(startIdx, endIdx - 1);
        //.order('id', { ascending: true });

        if (error) {
            console.log(error)
            throw error
        }

        return children;
}

export async function getUniqueCountries(){
    const supabase = await createClient();

    const { data: countries, error } = await supabase
        .from('children')
        .select('country')
        .neq('country', null)
        .eq('active', true);

    if (error) {
        console.log(error)
        throw error
    }

    const uniqueCountries = Array.from(
        new Set(data.map(row => row.country))
    ).sort();
    
    return uniqueCountries;

}