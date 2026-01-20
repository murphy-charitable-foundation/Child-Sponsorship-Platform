"use client";

import React from "react";
import { useRouter } from "next/navigation";


import {
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



const genders = ["Male", "Female"];
const gradeLevels = ["Infant", "Pre-School", "1-3", "4-6", "7-9", "10-12", "College"];




export default function MeetTheChildrenUI({children, uniqueCountries}) {
  const router = useRouter(); // currently unused

  const [selectedCountries, setCountries] = React.useState<Selection>(
    new Set(uniqueCountries)
  );
  const [selectedGradeLevels, setGradeLevels] = React.useState<Selection>(
    new Set(gradeLevels)
  );

  const [isLoaded, setIsLoaded] = React.useState(true);


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
              />
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
                  selectedKeys={selectedCountries}
                  selectionMode="multiple"
                  variant="flat"
                  onSelectionChange={setCountries}
                >
                  {uniqueCountries.map((country) => (
                    <DropdownItem key={country}>{country}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                  <Button className="capitalize" variant="bordered">Age Range</Button>
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
                  />  
                </PopoverContent>
              </Popover>
              
              
              <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                  <Button className="capitalize" variant="bordered">Gender</Button>
                </PopoverTrigger>
                <PopoverContent className="p-4">
                  <div className="flex gap-4">
                    <Checkbox defaultSelected radius="md">
                      Male
                    </Checkbox>
                    <Checkbox defaultSelected radius="md">
                      Female
                    </Checkbox>
                  </div>
                </PopoverContent>
              </Popover>
              <Dropdown>
                <DropdownTrigger>
                  <Button className="capitalize" variant="bordered">
                    Grade Levels
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Multiple selection example"
                  closeOnSelect={false}
                  selectedKeys={selectedGradeLevels}
                  selectionMode="multiple"
                  variant="flat"
                  onSelectionChange={setGradeLevels}
                >
                  {gradeLevels.map((gradeLevel) => (
                    <DropdownItem key={gradeLevel}>{gradeLevel}</DropdownItem>
                  ))}
                </DropdownMenu>
                  </Dropdown>
        </div>
        <p className="text-default-500 text-sm py-2">Showing {children.length} children</p>

        <div id="children-grid" className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {children.map((item, index) => (
            /* eslint-disable no-console */
            <Card key={item.id} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
              <Skeleton className="rounded-lg" isLoaded={isLoaded}>
                <CardBody className="overflow-visible p-0">
                  <Image
                    alt={item.first_name+" "+item.last_name}
                    className="w-full object-cover h-[140px]"
                    radius="lg"
                    shadow="sm"
                    src="/children/girl2.jpg"
                    width="100%"
                  />
                </CardBody>
                <CardFooter className="text-small">
                  <div className="text-left">
                  <b>{item.first_name+" "+item.last_name}</b>
                  <p className="text-default-500"> Age: X{item.location ? `, ${item.location}` : ""/*TODO: calculate age */}</p>
                  <p className="text-default-500">{"Grade: "+(item.school_grade ?? "N/A")}</p>
                  <p className="text-default-500">{"Dream job: "+item.dream_job/* TODO: check for null*/}</p> 
                  <p className="text-default-500">{"Favorite activity: "+item.favorite_activity/* TODO: check for null*/}</p> 
                  </div>
                </CardFooter>
              </Skeleton>
              
            </Card>
          ))}
        </div>
        <Pagination showControls initialPage={1} total={10} className="my-4 flex justify-center" color="primary" variant="bordered"/>
      </div>
    </main>
  );
}