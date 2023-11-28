// Calendar.js
import { useState, useEffect } from "react";
import View from "./View";
import { FormControl, Typography } from "@mui/material";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import Loader from "./Loader";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState("2023/09/01");
    const [events, setEvents] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false)

    
    //fetched date in a ref

    console.log(selectedDate, "select")


    const getCalenderData = (date: any) => {

        setIsLoading(true)
        axios.get(`http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${date}`)
        .then((data: any) => {
          console.log("Hi There", data)
          setIsLoading(false)
          setEvents(data);
        })
        .catch((error: any) => console.error(error));
    }

  useEffect(() => {
  
    getCalenderData(selectedDate);
  
  
  }, []);

  const handleDateChange = (newDate: any) => {
    setSelectedDate(newDate);

    // Fetch events
    getCalenderData(newDate);
  };

  console.log(events, "events");

  return (
    <div>
      <FormControl sx={{ width: "45ch", mt: 2.3 }} variant="standard">
        <Typography
          sx={{
            textAlign: "left",
            color: "#273240",
            fontSize: "0.8rem",
            fontWeight: "700",
          }}
        >
          Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    defaultValue={dayjs("2022-04-17")}
    onChange={(newValue: any) => {
      if (newValue) {
        // Ensure that newValue is a dayjs object
        const dayjsValue = dayjs(newValue);

        // Format the date using dayjs
        const formattedDate = dayjsValue.format("YYYY/MM/DD");
        console.log(formattedDate, "new value");
        handleDateChange(formattedDate);
      }
    }}
    slotProps={{ textField: { size: "small", name: "date" } }}
    sx={{
      width: "45ch",
      "& input::placeholder": {
        fontSize: "0.8rem",
      },
    }}
  />
</LocalizationProvider>

      </FormControl>
      
      { isLoading ? <Loader /> : <View events={events} />}
      
    </div>
  );
};

export default Calendar;
