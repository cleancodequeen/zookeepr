const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { animals } = require('./data/animals');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here: 
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //Save personalityTraints as a dedicated array.
        //If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            //Check the trait against each animal in teh filteredResults array.
            //Remember, it is initially a copy of the animalsArray, but here we're updating it for each trait int eh .forEach() loop.
            //For each trait being tageted by the filter, the filteredResults array will then contain only the entries that contain the trait, 
            //so at the end we'll have an array of animals that have very one of the trais when the .forEach() loop is finished. 
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
        
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
 });


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

//screwed up npm file paths trying to fix an error with the heroku app not being properly deployed. Now nothing else will work. 
//Start at 11.1.7