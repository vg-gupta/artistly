"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const categories = ["Singers", "Dancers", "DJs", "Speakers"];
const languageOptions = ["English", "Spanish", "French", "Hindi", "Other"];

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  bio: yup.string().required("Bio is required"),
  category: yup.array().min(1, "Select at least one category"),
  languages: yup.array().min(1, "Select at least one language"),
  feeMin: yup.number().min(0).required(),
  feeMax: yup.number().min(yup.ref("feeMin"), "Max must be greater than min").required(),
  location: yup.string().required("Location is required"),
  image: yup.mixed().nullable(),
});

export default function OnboardPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeMin: 0,
      feeMax: 1000,
      location: "",
      image: null,
    },
  });

  const name = watch("name");
  const bio = watch("bio");
  const category = watch("category");
  const languages = watch("languages");
  const feeMin = watch("feeMin");
  const feeMax = watch("feeMax");
  const location = watch("location");

  const canProceed =
    step === 0
      ? !!name && !!bio
      : step === 1
      ? (category?.length ?? 0) > 0 && (languages?.length ?? 0) > 0
      : step === 2
      ? feeMin !== undefined && feeMax !== undefined && !!location
      : true;

  const onSubmit = (data: any) => {
    // Convert image to URL for preview (optional)
    let imageUrl = undefined;
    if (data.image && data.image.length) {
      imageUrl = URL.createObjectURL(data.image[0]);
    }
    // Prepare artist object for listing
    const newArtist = {
      id: Date.now(),
      name: data.name,
      category: Array.isArray(data.category) ? data.category[0] : data.category,
      location: data.location,
      price: data.feeMax,
      image: imageUrl,
    };
    // Save to localStorage
    const stored = localStorage.getItem('artistly_artists');
    const arr = stored ? JSON.parse(stored) : [];
    arr.unshift(newArtist);
    localStorage.setItem('artistly_artists', JSON.stringify(arr));
    console.log("Submitted Artist:", newArtist);
    toast.success("Artist submitted!");
    setSubmitted(true);
  };

  const steps = [
    {
      label: "Basic Info",
      content: (
        <>
          <Input {...register("name")}
            placeholder="Artist Name"
            className="mb-2" />
          {errors.name && <p className="text-xs text-red-500 mb-2">{errors.name.message as string}</p>}
          <Input {...register("bio")}
            placeholder="Short Bio"
            className="mb-2" />
          {errors.bio && <p className="text-xs text-red-500 mb-2">{errors.bio.message as string}</p>}
        </>
      ),
    },
    {
      label: "Categories & Languages",
      content: (
        <>
          <div className="mb-2">
            <div className="font-medium mb-1">Category</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={cat}
                    {...register("category")}
                  />
                  {cat}
                </label>
              ))}
            </div>
            {errors.category && <p className="text-xs text-red-500 mb-2">{errors.category.message as string}</p>}
          </div>
          <div className="mb-2">
            <div className="font-medium mb-1">Languages</div>
            <div className="flex flex-wrap gap-2">
              {languageOptions.map((lang) => (
                <label key={lang} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={lang}
                    {...register("languages")}
                  />
                  {lang}
                </label>
              ))}
            </div>
            {errors.languages && <p className="text-xs text-red-500 mb-2">{errors.languages.message as string}</p>}
          </div>
        </>
      ),
    },
    {
      label: "Fee & Location",
      content: (
        <>
          <div className="flex gap-2 mb-2">
            <Input type="number" {...register("feeMin")} placeholder="Min Fee" className="w-24" />
            <Input type="number" {...register("feeMax")} placeholder="Max Fee" className="w-24" />
          </div>
          {(errors.feeMin || errors.feeMax) && <p className="text-xs text-red-500 mb-2">{errors.feeMin?.message as string || errors.feeMax?.message as string}</p>}
          <Input {...register("location")} placeholder="Location" className="mb-2" />
          {errors.location && <p className="text-xs text-red-500 mb-2">{errors.location.message as string}</p>}
        </>
      ),
    },
    {
      label: "Image Upload",
      content: (
        <>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <Input
                type="file"
                accept="image/*"
                onChange={e => field.onChange(e.target.files)}
              />
            )}
          />
        </>
      ),
    },
  ];

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Onboard as an Artist</h1>
      <Card className="p-6 flex flex-col gap-4">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="w-20 h-20 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div className="text-xl font-semibold mb-2">Done!</div>
            <div className="text-gray-600">Artist submitted successfully.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center mb-4 gap-2">
              {steps.map((s, i) => (
                <div key={s.label} className={`flex-1 h-2 rounded-full ${i <= step ? "bg-indigo-500" : "bg-gray-200"}`}></div>
              ))}
            </div>
            <div>{steps[step].content}</div>
            <div className="flex gap-2 mt-6">
              {step > 0 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Back
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button type="button" onClick={() => canProceed && setStep(step + 1)} disabled={!canProceed}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </form>
        )}
      </Card>
    </div>
  );
} 