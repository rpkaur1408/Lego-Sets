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


//getAllSets : to return the complete sets array
function getAllSets() {
    return new Promise((resolve, reject) => {
        try {
            resolve(sets); // Resolve with the current sets array
        } catch (err) {
            reject(`Failed to get all sets: ${err.message}`); // Reject with an error message if something goes wrong
        }
    });
}

//getSetByNum(setNum) : to return set object  with the set_num specified
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        // Find the set with the matching set_num
        const set = sets.find(set => set.set_num === setNum);

        // If set is found, resolve with the set; otherwise, reject with an error message
        if (set) {
            resolve(set);
        } else {
            reject(`Unable to find set with number: ${setNum}`);
        }
    });
}

//getSetsByTheme(theme) : to find sets with the expected theme
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try {
            // Convert the theme parameter to lower case for case-insensitive comparison
            const lowerCaseTheme = theme.toLowerCase();

            // Filter sets to find those where the theme matches the input
            const result = sets.filter(set => 
                set.theme.toLowerCase().includes(lowerCaseTheme)
            );

            // Resolve with the filtered results
            resolve(result);
        } catch (err) {
            // Reject with an error message if something goes wrong
            reject(`Failed to get sets with theme: ${theme}`);
        }
    });
}
