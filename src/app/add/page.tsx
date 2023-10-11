"use client";

import SingleImageUpload from "@/components/SingleImageUpload";
import { apiService } from "@/services/api.service";
import { Button, Input, Option, Select } from "@material-tailwind/react";
import { useReducer, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type FormState = {
  title: string;
  year: string;
  month: string;
  description: string;
  image: File | null;
};

const initialState = {
  title: "",
  year: "",
  month: "1",
  description: "",
  image: null,
};

const reducer: React.Reducer<
  FormState,
  { payload: string; type: string; file: File | null }
> = (state, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "year":
      return { ...state, year: action.payload };
    case "month":
      return { ...state, month: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "image":
      return { ...state, image: action.file };
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsFetching(true);
    e.preventDefault();
    setErrorMessage("");
    try {
      const missingFields = Object.entries(state).filter(
        ([key, value]) => value === ""
      );
      if (missingFields.length) {
        setErrorMessage(
          `Missing fields: ${missingFields.map(([key]) => key).join(", ")}`
        );
        return;
      }
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("year", state.year);
      formData.append("month", state.month);
      formData.append("description", state.description);
      formData.append("image", state.image as Blob);
      const res = await apiService.post("/movie", formData);
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({ type: e.target.name, payload: e.target.value, file: null });
  };

  const handleImageChange = ({
    file,
    name,
  }: {
    file: File | null;
    name: string;
  }) => {
    dispatch({
      type: name,
      payload: "",
      file,
    });
  };

  const handleSelectChange = (value: string, name: string) => {
    dispatch({ type: name, payload: value, file: null });
  };

  return (
    <div className="flex flex-col h-main w-full items-center justify-center">
      <form className="flex flex-col w-fit gap-2" onSubmit={onSubmit}>
        <Input
          name="title"
          type="text"
          onChange={handleInputChange}
          crossOrigin={undefined}
          value={state.title}
          label="Title"
        />
        <Input
          name="year"
          type="number"
          onChange={handleInputChange}
          crossOrigin={undefined}
          value={state.year}
          label="Year"
        />
        <Select
          name="month"
          onChange={(v) => handleSelectChange(v as string, "month")}
          value={state.month}
          label="Month"
        >
          <Option value="1">January</Option>
          <Option value="2">February</Option>
          <Option value="3">March</Option>
          <Option value="4">April</Option>
          <Option value="5">May</Option>
          <Option value="6">June</Option>
          <Option value="7">July</Option>
          <Option value="8">August</Option>
          <Option value="9">September</Option>
          <Option value="10">October</Option>
          <Option value="11">November</Option>
          <Option value="12">December</Option>
        </Select>
        <Input
          name="description"
          type="text"
          onChange={handleInputChange}
          crossOrigin={undefined}
          value={state.description}
          label="Description"
        />
        <SingleImageUpload
          name="image"
          onChange={(file) => handleImageChange({ file, name: "image" })}
          currentImage={state.image}
        />
        {
          <p className="text-red-500 text-sm">
            {errorMessage ? errorMessage : ""}
          </p>
        }
        <Button
          disabled={isFetching}
          type="submit"
          className="w-fit disabled:opacity-100"
          color="amber"
        >
          {!isFetching ? (
            "Add"
          ) : (
            <AiOutlineLoading3Quarters className="animate-spin h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
