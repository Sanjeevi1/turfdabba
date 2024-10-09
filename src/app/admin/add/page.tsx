"use client";
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { UploadButton,UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image"

export default function AddPage() {
  const router=useRouter();
  const [turf,setTurf]=React.useState({
    name:"",
    category:"",
    
    size:"",
    location:"",
    address:"",
    characteristics:"",
    rate:""
    
  })
  const [imageUrl,setImageUrl]=React.useState('');
  interface Slot {
    startTime: string;
    endTime: string;
    isBooked: boolean;
  }

  const [slot, setSlot] = React.useState<Slot>({
    startTime: "",
    endTime: "",
    isBooked: false,
  });

  const [slots, setSlots] = React.useState<Slot[]>([]);

  const handleSlotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSlot({
      ...slot,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addSlot = (): void => {
    // Validate that startTime and endTime are provided
    if (!slot.startTime || !slot.endTime) {
      alert("Please provide both start time and end time for the slot.");
      return;
    }

    // Add the new slot to the slots array
    setSlots((prevSlots) => [...prevSlots, slot]);

    // Reset the slot input fields
    setSlot({ startTime: "", endTime: "", isBooked: false });
  };
  /*const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file
    if (file) {
      setTurf({ ...turf, image: file.name }); // Set the image field to the file name
    }
  };*/

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*const formData = new FormData(); // Create a new FormData object

    // Append all fields to FormData
    formData.append("name", turf.name);
    formData.append("category", turf.category);
    //formData.append("image", turf.image); // Append the image file
    formData.append("size", turf.size);
    formData.append("location", turf.location);
    formData.append("address", turf.address);
    formData.append("characteristics", turf.characteristics);
    formData.append("rate", turf.rate);
    formData.append("slots", JSON.stringify(slots)); // Convert slots array to JSON string*/
    const payload = {
      name: turf.name,
      category: turf.category,
      size: turf.size,
      location: turf.location,
      address: turf.address,
      characteristics: turf.characteristics,
      rate: turf.rate,
      slots: slots,
      image:imageUrl,
    };

    try {
      const response = await axios.post("/api/admin/add", payload);
      console.log("Turf Added", response.data);
      toast.success("Turf Added");
      router.push("/login");
    } catch (error: any) {
      console.log("Turf failed to add", error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Add new turf details
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" onChange={(e)=>setTurf({...turf,name:e.target.value})} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="Category">Category</Label>
            <Input id="Category" type="text" onChange={(e)=>setTurf({...turf,category:e.target.value})} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Size">Size</Label>
          <Input id="Size" type="text" onChange={(e)=>setTurf({...turf,size:e.target.value})} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Location">Location</Label>
          <Input id="Location" type="text" onChange={(e)=>setTurf({...turf,location:e.target.value})} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Address">Address</Label>
          <Input id="Address" type="text" onChange={(e)=>setTurf({...turf,address:e.target.value})} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Characteristics">Characteristics</Label>
          <Input id="Characteristics" type="text" onChange={(e)=>setTurf({...turf,characteristics:e.target.value})} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="Rate">Rate</Label>
          <Input id="Rate" type="number" onChange={(e)=>setTurf({...turf,rate:e.target.value})} />
        </LabelInputContainer>
        
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
          {imageUrl.length?<div>
            <Image src={imageUrl} alt='my image' width={500} height={300}/>
          </div>:null}
        </main>
        {/* Slot Input Container */}
        <div className="mb-4">
          <h3 className="font-medium text-lg mb-2">Add Slot</h3>
          <div className="flex flex-col space-y-2 mb-2">
            <LabelInputContainer>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={slot.startTime}
                onChange={handleSlotChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={slot.endTime}
                onChange={handleSlotChange}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="isBooked">Is Booked</Label>
              <input
                id="isBooked"
                name="isBooked"
                type="checkbox"
                checked={slot.isBooked}
                onChange={handleSlotChange}
                className="h-4 w-4"
              />
            </LabelInputContainer>
          </div>
          <button
            type="button"
            onClick={addSlot}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Slot
          </button>
        </div>

        {/* Display Added Slots */}
        {slots.length > 0 && (
          <div className="mb-4">
            <h3 className="font-medium text-lg mb-2">Added Slots</h3>
            <ul className="list-disc pl-5">
              {slots.map((slot, index) => (
                <li key={index}>
                  {slot.startTime} - {slot.endTime}{" "}
                  {slot.isBooked ? "(Booked)" : "(Available)"}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Add &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
