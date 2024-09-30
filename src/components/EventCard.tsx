import React from "react";

const EventCard = ({ currentEvent }: { currentEvent: any }) => {
    
    const keys = Object.keys(currentEvent);
    
  
    return (
        <div className="bg-gray-200  mx-auto w-64 border border-black rounded-lg text-center">
        <div className="font-bold border-b border-black">Event Details</div>
        <div>
            <ul>
 
                {keys.map((k,v) => 
                    (
                        <li key={k}>{k}:{v}</li>
                    )
                )}
            </ul>
        </div>
        </div>
    );
};

export default EventCard;
