"use client";

import React from "react";
import { useRouter } from "next/navigation";


import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";


const children = [
  { name: "John Doe1", img: "/children/girl2.jpg", gender: "Male", age: 8, country: "Uganda1" , grade: 3, bioText: "Short biography about the child goes here."},
  { name: "John Doe2", img: "/children/girl2.jpg", gender: "Male", age: 18, country: "Uganda" , grade: 4, bioText: "Short biography about the child goes here."},
  { name: "John Doe3", img: "/children/girl2.jpg", gender: "Female", age: 8, country: "Uganda1" , grade: 3, bioText: "Short biography about the child goes here."},
  { name: "John Doe4", img: "/children/girl2.jpg", gender: "Male", age: 8, country: "Uganda2" , grade: 5, bioText: "Short biography about the child goes here."},
  { name: "John Doe5", img: "/children/girl2.jpg", gender: "Female", age: 20, country: "Uganda" , grade: 5, bioText: "Short biography about the child goes here."},
  { name: "John Doe6", img: "/children/girl2.jpg", gender: "Male", age: 21, country: "Uganda2" , grade: 3, bioText: "Short biography about the child goes here."},
  { name: "John Doe7", img: "/children/girl2.jpg", gender: "Female", age: 8, country: "Uganda" , grade: 11, bioText: "Short biography about the child goes here."},
  { name: "John Doe8", img: "/children/girl2.jpg", gender: "Male", age: 11, country: "Uganda" , grade: 3, bioText: "Short biography about the child goes here."},
  { name: "John Doe9", img: "/children/girl2.jpg", gender: "Male", age: 12, country: "Uganda2" , grade: 12, bioText: "Short biography about the child goes here."},

];



let names = [];
let countries_set = new Set<string>();
const genders = ["Male", "Female"];
const gradeLevels = ["Kindergarten", "Pre-School", "1-3", "4-6", "7-9", "10-12", "College"];

for (const child of children) {
  if(child.name){
    names.push(child.name);
  }
  if(child.country){
    countries_set.add(child.country);
  }
}
let countries = Array.from(countries_set);


export default function MeetTheChildrenPage() {
  const router = useRouter();
  //const [planType, setPlanType] = React.useState<PlanType>("monthly");

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        Meet the Children
      </h1>
      <Divider/>
      <div id="filters">
            <Dropdown>
              <DropdownTrigger>
                <Button className="capitalize" variant="bordered">
                  Countries
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Multiple selection example"
                closeOnSelect={false}
                selectedKeys={countries}
                selectionMode="multiple"
                variant="flat"
                //onSelectionChange={setSelectedKeys}
              >
                {countries.map((country) => (
                  <DropdownItem key={country}>{country}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
      </div>

      <div id="children-grid" className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {children.map((item, index) => (
          /* eslint-disable no-console */
          <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.name}
                className="w-full object-cover h-[140px]"
                radius="lg"
                shadow="sm"
                src={item.img}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small">
              <div className="text-left">
              <b>{item.name}</b>
              <p className="text-default-500">{"Age: "+(item.age).toString()+", "+item.country}</p>
              <p className="text-default-500">{"Grade: "+(item.grade).toString()}</p>
              <p className="text-default-500">{item.bioText}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}