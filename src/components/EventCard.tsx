import React from "react";

const EventCard = ({ currentEvent }: { currentEvent: any }) => {
  const keys: string[] = Object.keys(currentEvent); // all keys
  const excludedKeys = [
    "index",
    "period",
    "timestamp",
    "minute",
    "second",
    "tactics",
  ]; // keys to excluded
  const filteredKeys = keys.filter((k) => !excludedKeys.includes(k));

  return (
    <div className="bg-gray-200  mx-auto w-64 border border-black rounded-lg text-center">
      <div className="font-bold border-b border-black">Event Details</div>
      <div className="">
        <ul>
          {filteredKeys.map((k) => (
            <li key={k}>
              <span className='font-bold'>{k}</span>: {JSON.stringify(currentEvent[k])}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventCard;
