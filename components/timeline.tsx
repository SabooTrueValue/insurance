import React from "react";

interface TimelineEvent {
  time: string;
  title: string;
  address: string;
  color: string;
}

const events: TimelineEvent[] = [
  {
    time: "4:41 PM",
    title: "Drive Started",
    address: "unnamed road, Rasoolpura, - 500003, Telangana, India",
    color: "bg-green-500", // Green for Drive Started
  },
  {
    time: "4:59 PM",
    title: "Dropped",
    address: "unnamed road, Marredpally mandal, - 500026, Telangana, India",
    color: "bg-yellow-500", // Yellow for Dropped
  },
  {
    time: "5:00 PM",
    title: "Drive Ended",
    address: "unnamed road, Marredpally mandal, - 500026, Telangana, India",
    color: "bg-red-500", // Red for Drive Ended
  },
];

const Timeline: React.FC = () => {
  return (
    <div className="flex justify-center items-start pt-5 px-5 pb-0 ">
      <div className="w-full max-w-lg">
        <div className="relative">
          {/* Vertical dashed line - only from the first to the last dot */}
          <div
            className="absolute top-5 bottom-0 -left-6 border-l-2 border-dashed border-gray-400"
            style={{
              height: `${events.length * 55}px`,
            }}
          />

          {/* Mapping Events */}
          {events.map((event, index) => (
            <div key={index} className="relative mb-5">
              {/* Dot for each event */}
              <div
                className={`absolute w-3 h-3 ${event.color} rounded-full top-2 -left-[29px] `}
              />

              {/* Event Time and Title */}
              <div className="flex  items-center">
                <span className="font-semibold text-sm text-gray-800">
                  {event.title}
                </span>
                &nbsp;-&nbsp;
                <span className="text-sm text-gray-500">{event.time}</span>
              </div>

              {/* Event Address */}
              <p className="text-sm text-gray-700">{event.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
