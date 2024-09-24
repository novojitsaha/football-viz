import { useState, useEffect } from "react";


const useEvents = (allEvents: any[]) => {

    const [startingTeams, setStartingTeams] = useState<any[]>([]);

    const [events, setEvents] = useState<any[]>([]);

    useEffect(
        () => {
            if (!allEvents) return;

            for (const event of allEvents) {
                // set Starting team 
                if (event.type.name === 'Starting XI') {
                    setStartingTeams([...startingTeams, event])
                }

                // if its a pass
                // else if(event.type.name === 'Pass') {

                //     const player = event.player;
                //     const playerLocation = event.location;
                //     const otherPlayerLocation = event.pass.end_location;

                //     // this is a pass if the other related_event is a ball receipt
                //     const relatedEventId = event.related_events[0];
                //     const relatedEvent = getEventFromId(relatedEventId);
                //     if (!relatedEvent) continue;

                //     // if (relatedEvent.type.name === 'Ball Receipt') {
                //     //     // check if this pass is actually a pass
                //     //     if (relatedEvent.)
                //     //         // add this event to the events
                //     // }

                // }
            }


        }, [allEvents]
    )



    return {
        startingTeams, events
    }

};

export default useEvents;