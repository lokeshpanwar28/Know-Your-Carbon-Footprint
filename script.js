document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gather form values
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseInt(document.getElementById('age').value);
    const country = document.getElementById('country').value;
    const isVegan = document.getElementById('diet').value === 'true';
    const vehicleType = document.getElementById('vehicle').value;

    // Calculate BMI
    const bmi = weight / (height * height);

    // Base carbon footprint values (in kg CO2e per year)
    const baseFootprint = {
        'USA': 16000, // Source: U.S. EPA, 2021
        'UK': 5500,   // Source: UK Government, 2021
        'India': 1500, // Source: IEA, 2020
        'China': 7000  // Source: IEA, 2020
    };

    // Vehicle type adjustments (in kg CO2e per year)
    const vehicleAdjustment = {
        'Electric': 2000, // Source: EEA, 2020
        'Hybrid': 4000,   // Source: EPA, 2021
        'Gasoline': 8000, // Source: EPA, 2021
        'Diesel': 10000,  // Source: EPA, 2021
        'None': 0
    };

    // Adjustments based on BMI
    const bmiAdjustment = 1.0 + (bmi - 25) * 0.02;

    // Adjustments based on age
    let ageAdjustment = 1.0;
    if (age < 20) {
        ageAdjustment = 1.1;
    } else if (age > 60) {
        ageAdjustment = 0.9;
    }

    // Adjustments based on diet
    const dietAdjustment = isVegan ? 1.0 : 2.0; // Source: Poore & Nemecek, 2018

    // Get base footprint for the country
    const countryFootprint = baseFootprint[country] || 5000;

    // Get vehicle adjustment
    const vehicleFootprint = vehicleAdjustment[vehicleType] || 0;

    // Calculate total yearly carbon footprint
    const totalYearlyFootprint = (countryFootprint * bmiAdjustment * ageAdjustment * dietAdjustment) + vehicleFootprint;

    // Calculate daily carbon footprint
    const totalDailyFootprint = totalYearlyFootprint / 365;

    // Display the result
    document.getElementById('footprint-value').textContent = totalDailyFootprint.toFixed(2) + ' kg CO2e per day';
});
