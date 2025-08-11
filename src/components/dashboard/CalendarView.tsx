import { Calendar } from "@/UIComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/UIComponents";
import { Badge } from "@/UIComponents";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: Date;
  type: "traffic" | "maintenance" | "billing" | "other";
}

export default function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Get events for the selected date
  const selectedDateEvents = events.filter(
    (event) => date && event.date.toDateString() === date.toDateString(),
  );

  // Function to determine if a date has events
  const hasEvents = (day: Date) => {
    return events.some(
      (event) => event.date.toDateString() === day.toDateString(),
    );
  };

  // Function to get event badge color
  const getEventColor = (type: Event["type"]) => {
    switch (type) {
      case "traffic":
        return "bg-blue-500";
      case "maintenance":
        return "bg-amber-500";
      case "billing":
        return "bg-emerald-500";
      case "other":
        return "bg-slate-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Calendar
        </h2>
        <p className="text-white">View scheduled events and important dates.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader>
            <CardTitle className="text-white">Event Calendar</CardTitle>
            <CardDescription className="text-gray-300">
              Select a date to view events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border text-white"
              modifiers={{
                hasEvents: (day) => hasEvents(day),
              }}
              modifiersStyles={{
                hasEvents: {
                  fontWeight: "bold",
                  textDecoration: "underline",
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-2 bg-[#1e1e2d] border-[#2a2a3a]">
          <CardHeader>
            <CardTitle className="text-white">
              {date
                ? date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No Date Selected"}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {selectedDateEvents.length} event
              {selectedDateEvents.length !== 1 ? "s" : ""} scheduled
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 rounded-lg border border-[#2a2a3a] p-4"
                  >
                    <div
                      className={`h-3 w-3 rounded-full mt-1.5 ${getEventColor(event.type)}`}
                    />
                    <div>
                      <h4 className="font-semibold text-white">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {event.date.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                      <Badge variant="outline" className="mt-2 text-white">
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-[#2a2a3a]">
                <p className="text-sm text-white">
                  No events scheduled for this date
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1e1e2d] border-[#2a2a3a]">
        <CardHeader>
          <CardTitle className="text-white">Upcoming Events</CardTitle>
          <CardDescription className="text-gray-300">
            Next 5 scheduled events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between rounded-lg border border-[#2a2a3a] p-4"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`h-3 w-3 rounded-full mt-1.5 ${getEventColor(event.type)}`}
                    />
                    <div>
                      <h4 className="font-semibold text-white">
                        {event.title}
                      </h4>
                      <Badge variant="outline" className="mt-1 text-white">
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">
                      {event.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-300">
                      {event.date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const events: Event[] = [
  {
    id: 1,
    title: "Peak Traffic Period",
    date: new Date(2023, 5, 15, 14, 0),
    type: "traffic",
  },
  {
    id: 2,
    title: "Database Maintenance",
    date: new Date(2023, 5, 16, 22, 0),
    type: "maintenance",
  },
  {
    id: 3,
    title: "Monthly Billing Cycle",
    date: new Date(2023, 5, 20, 9, 0),
    type: "billing",
  },
  {
    id: 4,
    title: "Team Meeting",
    date: new Date(2023, 5, 15, 10, 0),
    type: "other",
  },
  {
    id: 5,
    title: "Server Upgrade",
    date: new Date(2023, 5, 18, 23, 0),
    type: "maintenance",
  },
  {
    id: 6,
    title: "Marketing Campaign Launch",
    date: new Date(2023, 5, 22, 8, 0),
    type: "other",
  },
  {
    id: 7,
    title: "Expected Traffic Spike",
    date: new Date(2023, 5, 25, 12, 0),
    type: "traffic",
  },
];
