// Import the required data files
const setData = require("../data/setData");
const themeData = require("../data/themeData");

// Initialize the sets array
let sets = [];

/*
* Initialize the sets array by combining setData and themeData.
*/
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

            resolve();
        } catch (error) {
            reject(`Initialization failed: ${error.message}`);
        }
    });
}

/*
 * Get all sets.
*/
function getAllSets() {
    return new Promise((resolve, reject) => {
        try {
            resolve(sets);
        } catch (error) {
            reject(`Failed to get all sets: ${error.message}`);
        }
    });
}

/**
 * Get a specific set by its set number.
 * @param {string} setNum - The set number to search for.
 * @returns {Promise<Object>} A promise that resolves with the set object or rejects with an error message.
 */
function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        try {
            const set = sets.find(set => set.set_num === setNum);
            if (set) {
                resolve(set);
            } else {
                reject(`Unable to find requested set: ${setNum}`);
            }
        } catch (error) {
            reject(`Failed to get set by number: ${error.message}`);
        }
    });
}

/**
 * Get sets by theme.
 * The theme parameter can be a partial string and case is ignored.
 * @param {string} theme - The theme to search for.
 * @returns {Promise<Array>} A promise that resolves with an array of set objects or rejects with an error message.
 */
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try {
            const themeLowerCase = theme.toLowerCase();
            const filteredSets = sets.filter(set => set.theme.toLowerCase().includes(themeLowerCase));
            if (filteredSets.length > 0) {
                resolve(filteredSets);
            } else {
                reject(`Unable to find requested sets with theme: ${theme}`);
            }
        } catch (error) {
            reject(`Failed to get sets by theme: ${error.message}`);
        }
    });
}

// Export the functions to be used in other parts of the application
module.exports = {
    initialize,
    getAllSets,
    getSetByNum,
    getSetsByTheme
};

// Test the functions
initialize()
    .then(() => {
        console.log("Initialization complete");

        // Test getAllSets
        return getAllSets();
    })
    .then(allSets => {
        console.log("All Sets:");
        console.log(allSets);

        // Test getSetByNum
        return getSetByNum("001-1");
    })
    .then(specificSet => {
        console.log("\nSet with number '001-1':");
        console.log(specificSet);

        // Test getSetsByTheme
        return getSetsByTheme("tech");
    })
    .then(technicSets => {
        console.log("\nSets with theme containing 'tech':");
        console.log(technicSets);
    })
    .catch(error => {
        console.error(error);
    });