export const  calculatePlantingDate =  (harvestDate, duration) => {
    // Parse the harvest date into a JavaScript Date object
    const parsedHarvestDate = new Date(harvestDate);
  
    // Calculate the planting date by subtracting the duration in milliseconds
    const plantingDate = new Date(parsedHarvestDate.getTime() - duration * 24 * 60 * 60 * 1000);
  
    // Format the planting date as 'YYYY-MM-DD'
    const formattedPlantingDate = plantingDate.toISOString().split('T')[0];
  
    return formattedPlantingDate;
  }
  
 export const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const options = {  day: 'numeric',month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
 }
  
 export const  getSeason = (dateString)  => {
    const date = new Date(dateString + ' UTC'); 
    const month = date.getMonth() + 1; // Months are zero-indexed
  
    switch (month) {
      case 12:
      case 1:
      case 2:
        return 'Winter';
      case 3:
      case 4:
      case 5:
        return 'Spring';
      case 6:
      case 7:
      case 8:
        return 'Summer';
      case 9:
      case 10:
      case 11:
        return 'Rainy';
      default:
        return 'Unknown Season';
    }
  }
  

  