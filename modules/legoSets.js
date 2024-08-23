//TO read our data files
const setData = require("../data/setData");
const themeData = require("../data/themeData");

//Empty array for sets
let sets =[];

//intialise function to fill sets array with the data
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            sets = []; // Clear the sets array

            // Iterate over each setData object
            setData.forEach(set => {
                // Find the corresponding theme object from themeData
                const theme = themeData.find(theme => theme.id === set.theme_id);

                // Add the theme name to the set object
                const setWithTheme = {
                    ...set,
                    theme: theme ? theme.name : 'Unknown'
                };

                // Add the modified set object to the sets array
                sets.push(setWithTheme);
            });

            resolve(); // Properly invoke resolve to indicate completion
        } catch (err) {
            reject(`Initialization Error: ${err.message}`); // Reject with an error message
        }
    });
}


//getAllSets
