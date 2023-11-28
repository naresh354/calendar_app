import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import dayjs from "dayjs";
import { Typography } from "@mui/material";

function CalendarView() {
  const handleDateClick = async (arg: any) => {
    const dayjsValue = dayjs(arg.dateStr);
    const formattedDate = dayjsValue.format("YYYY/MM/DD");
    try {
      const response = await axios.get(
        `http://calapi.inadiutorium.cz/api/v0/en/calendars/default/${formattedDate}`
      );
      const celebrations = response?.data?.celebrations?.map(
        (e: any, index: number) => (
          <Typography key={index} sx={{ color: "#2196f3" }}>
            {e?.title}
          </Typography>
        )
      );
      const alertMessage = (
        <div>
          <Typography sx={{ color: "red" }}>
            Date clicked: {arg?.dateStr}
          </Typography>
          {celebrations}
        </div>
      );

      // Use toast from react-toastify
      toast.success(alertMessage, {
        autoClose: 5000, // Time for the notification
      });

      console.log("Date clicked:", arg.dateStr);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"85vh"}
        dateClick={handleDateClick}
      />
    </div>
  );
}

export default CalendarView;
