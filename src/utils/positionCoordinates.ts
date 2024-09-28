export type positionCoordinatesKey = keyof typeof  positionCoordinates;
// Starting coordinates of each position in the form [x, y]
export const positionCoordinates = {

    "Goalkeeper": [4,40],

    // Defenders
    "Left Back": [20,15],   

    "Left Center Back": [15,28],   

    "Center Back": [15,40],    

    "Right Center Back": [15,52],  

    "Right Back": [20,65],    

    // Midfielders
    "Left Wing Back": [30,15], 

    "Left Defensive Midfield": [25,28],  

    "Center Defensive Midfield": [25,40],

    "Right Defensive Midfield": [25,52],  

    "Right Wing Back": [30,65],   

  
 
    "Left Midfield": [45,15],    

    "Left Center Midfield": [35,28],  

    "Center Midfield": [35,40],    

    "Right Center Midfield": [35,52],   

    "Right Midfield": [45,65],    
  
    // Attackers
    "Left Wing": [50,75],    

    "Left Attacking Midfield": [50,70],   

    "Center Attacking Midfield": [50,70], 

    "Right Attacking Midfield": [50,70],   

    "Right Wing": [50,75],    


    "Secondary Striker": [52,80],    

    "Left Center Forward": [55,80],   

    "Striker": [55,80],
    
    "Right Center Forward": [55,80],

    "Center Forward": [58,80]
  };
  
