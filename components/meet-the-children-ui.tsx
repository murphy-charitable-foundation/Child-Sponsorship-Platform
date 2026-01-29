"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {createClient} from "@/lib/supabase/client";


import {
  Avatar,
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  Divider,
  Input,
  Select,
  SelectItem,
  Selection,
  Textarea,
  Button,
  Image,
  Drawer,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Slider,
  Skeleton,
  Pagination,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { get } from "http";
import { unique } from "next/dist/build/utils";
import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js";


const pageCapacities = ["20","60","100"];





export default function MeetTheChildrenUI({groupSponsorship}: {groupSponsorship: boolean}) {
  const router = useRouter(); // currently unused

  const supabase = createClient();
 

  
  const [selectedPageCapacity, setPageCapacity] = React.useState<Selection>(
    new Set(["20"])
  );
  const [page, setPage] = React.useState(1);

  const [children, setChildren] = React.useState<any[]>([]); 
  const [count, setCount] = React.useState(0);
  const [ageRange, setAgeRange] = React.useState<number[]>([0, 25]);
  const [genders, setGenders] = React.useState<string[]>(["Male", "Female"]);
  const [uniqueCountries, setUniqueCountries] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");


  function calculateRange(){
    let from = (page - 1) * Number(Array.from(selectedPageCapacity)[0]); 
    let to = from + Number(Array.from(selectedPageCapacity)[0]) - 1;

    return {from, to};
  }

  const fetchUniqueCountries = async () => {
      const { data: countries, error: countriesError } = await supabase
        .from('children_with_ages')
        .select('location')
        .neq('location', null)
        .eq('active', true);

    if (countriesError) {
        console.log(countriesError)
        throw countriesError
    }
  

    setUniqueCountries(
      Array.from(
          new Set(countries.map(row => row.location))
      ).sort());

      setSelectedCountries(
        new Set(
          Array.from(
            new Set(countries.map(row => row.location))
          )
        )
      );
  };

   const fetchData = async () => {
    setIsLoaded(false);
    

    const { from, to } = calculateRange();

    if (selectedCountries.size === 0) {
      console.log("no countries selected, skipping fetch");
      setChildren([]);
      setCount(0);
      setIsLoaded(true);
      return; // to resolve race condition between fetchData and fetchUniqueCountries, resulting in list being inaccurately filtered
    }


    const {data: newChildren, error: childrenError} = await supabase
      .from('children_with_ages')
      .select('*')
      .eq('active', true)
      .in('location', Array.from(selectedCountries))
      .gte('age', ageRange[0])
      .lte('age', ageRange[1])
      .in('gender', genders)
      .ilike('full_name', `%${searchTerm}%`)
      .range(from, to);

      if (childrenError) {
        console.log(childrenError);
        throw childrenError;
      }
      setChildren(newChildren || []);
      console.log(newChildren);


    

    const { count, error: countError } = await supabase
        .from('children_with_ages')
        .select('id', { count: 'exact', head: true })
        .eq('active', true)
        .in('location', Array.from(selectedCountries))
        .gte('age', ageRange[0])
        .lte('age', ageRange[1])
        .in('gender', genders)
        .ilike('full_name', `%${searchTerm}%`)

    if (countError) {
        console.log(countError)
        throw countError
    }
    setCount(count || 0);

    setIsLoaded(true);


    
  };

  const [selectedCountries, setSelectedCountries] = React.useState(
    new Set(uniqueCountries)
  );

  useEffect(() => { 
    // Fetch new data when page or filters change
    //fetchUniqueCountries();
    console.log("fetching data for page ", page);
    fetchData();
    console.log("fetched data");
  }, [page, uniqueCountries, selectedCountries, ageRange, genders, searchTerm, selectedPageCapacity]); 

  useEffect(() => {
    console.log("switching to page ", page);
    setPage(1); // Reset to first page on filter change
    console.log("switched to page ", page);
    //fetchData();
  }, [selectedCountries, ageRange, genders, searchTerm, selectedPageCapacity]);


  useEffect(() => {
    console.log("fetching unique countries");
    fetchUniqueCountries();
    console.log("fetched unique countries");
  }, []); // Fetch unique countries on component mount
    

  const [isLoaded, setIsLoaded] = React.useState(false);



  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-semibold">
          Meet the Children
        </h1>
        
        <Divider/>
        <p className="text-default-500 py-4">
          Browse children waiting for sponsorship
        </p>
        
        <div id="filters" className="gap-2 grid grid-cols-2 sm:grid-cols-5 my-4 p-4 border border-default-200 rounded-[12px]">
              <Input
                label="Search"
                labelPlacement="inside"
                variant="bordered"
                radius="md"
                size="sm"
                classNames={{ inputWrapper: "rounded-[12px]" }}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
              <Select
                label="Countries"
                labelPlacement="inside"
                variant="bordered"
                radius="md"
                size="sm"
                classNames={{ trigger: "rounded-[12px]" }}
                selectedKeys={selectedCountries}
                selectionMode="multiple"
                onSelectionChange={
                  (keys) => setSelectedCountries(keys as Set<string>)}
                //defaultSelectedKeys={uniqueCountries} // redundant
              >
                  {uniqueCountries.map((country) => (
                    <SelectItem key={country}>{country}</SelectItem>
                  ))}

              </Select>

              <Popover placement="bottom" showArrow={true} classNames={{ trigger: "rounded-[12px]" }}>
                <PopoverTrigger>
                  <Button className="capitalize" variant="bordered"
                radius="md">Age Range: {ageRange[0]}-{ageRange[1]}</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <Slider
                    className="w-full"
                    defaultValue={[0, 25]}
                    label="Age Range"
                    marks={[
                      {
                        value: 0,
                        label: "0",
                      },{
                        value: 5,
                        label: "5",
                      },{
                        value: 10,
                        label: "10",
                      },{
                        value: 15,
                        label: "15",
                      },{
                        value: 20,
                        label: "20",
                      },{
                        value: 25,
                        label: "25",
                      }
                    ]}
                    maxValue={25}
                    minValue={0}
                    showTooltip={true}
                    step={1}
                    //onChange={setAgeRange}
                    onChange={(keys) => setAgeRange(keys as number[])}
                    value={ageRange}
                  />  
                </PopoverContent>
              </Popover>
              
              
              <Select
                onSelectionChange={(keys) =>
                  setGenders(Array.from(keys) as string[])
                }
                selectedKeys={genders}
                selectionMode="multiple"
                label="Genders"
                labelPlacement="inside"
                variant="bordered"
                radius="md"
                size="sm"
                classNames={{ trigger: "rounded-[12px]" }}>
                <SelectItem
                  key="Male"
                  >
                    Male
                </SelectItem>
                <SelectItem
                  key="Female"
                  >
                    Female
                </SelectItem>
              </Select>
              <Button
                variant="bordered"
                color="danger"
                radius="md"
                size="md"
                onPress={
                  () => {
                    setSelectedCountries(new Set(uniqueCountries));
                    setAgeRange([0, 25]);
                    setSearchTerm("");
                    setGenders(["Male", "Female"]);
                  }
                }>
                Clear Filters
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

              </Button>
              
        </div>
        <p className="text-default-500 text-sm py-2">Showing {count} children</p>

        <div id="children-grid" className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {children.map((item, index) => (
            /* eslint-disable no-console */
            <Card key={item.id} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
              <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                <CardBody className="overflow-visible p-0">

                  <Avatar radius="none" color="primary" className="w-full object-cover h-[140px]"/>
                </CardBody>
                <CardFooter className="text-small">
                  <div className="text-left">
                  <b>{item.full_name}</b>
                  <p className="text-default-500"> Age: {item.age}{item.location ? `, ${item.location}` : ""}</p>
                  <p className="text-default-500">{"Grade: "+(item.school_grade ?? "N/A")}</p>
                  <p className="text-default-500">{"Dream job: " + (item.dream_job ?? "N/A")}</p>
                  <p className="text-default-500">{"Favorite activity: " + (item.favorite_activity ?? "N/A")}</p>
                  </div>
                </CardFooter>
              </Skeleton>
              
            </Card>
          ))}
        </div>
        <div className="flex items-center mt-4 justify-center">
          <Pagination 
            showControls 
            onChange={setPage}
            page={page}
            initialPage={1} 
            total={Math.ceil(count/Number(Array.from(selectedPageCapacity)[0]))} 
            className="my-4 flex justify-center" 
            color="primary" 
            variant="bordered"
          />{}
          <span className="text-sm text-default-500 whitespace-nowrap mx-4">
            Items per page: 
          </span>
          <Select
            aria-label="Items per page"
            variant="bordered"
            fullWidth={false}
            defaultSelectedKeys={["20"]}
            selectedKeys={selectedPageCapacity}
            onSelectionChange={
                  (keys) => setPageCapacity(keys as Set<string>)}
                  >
            {pageCapacities.map((capacity) => (
              <SelectItem key={capacity.toString()}>{capacity.toString()}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </main>
  );
}