import React from "react";

const EventCard = ({ currentEvent }: { currentEvent: any }) => {
    
    const keys: string[] = Object.keys(currentEvent);
  
    return (
        <div className="bg-gray-200  mx-auto w-64 border border-black rounded-lg text-center">
        <div className="font-bold border-b border-black">Event Details</div>
        <div>
            <ul>
 
                {keys.map((k) => 
                    (
                        <li key={k}>{k}: {JSON.stringify(currentEvent[k])}</li>
                    )
                )}
            </ul>
        </div>
        </div>
    );
};

export default EventCard;
