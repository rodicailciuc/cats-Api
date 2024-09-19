// Initial array of cats, each cat has an id, name, and age.
let cats = [
    {id: '1' , name: 'bibi', age: 2},
    {id: '2' , name: 'lili', age: 5},
    {id: '3' , name: 'mimi', age: 1},
    {id: '4' , name: 'didi', age: 3},
    {id: '5' , name: 'gigi', age: 4}
]

// Cat controller object that holds all CRUD functions for managing cats
const catControllers = {

    // Get all cats from the list
    getCats:(req, res) => {
        res.status(200).json(cats);
    },

    // Get a specific cat by its ID
    getCatById: (req, res) => {
        const { id } =req.params;
        const catExist = cats.find((cat) => cat.id === id);
        // If the cat exists, return it with a 200 OK status
        if(catExist) {
            res.status(200).json(catExist);
            // If not found, send a 400 error response
        } else {
            res.status(400).send('Cat not found');
        }
    },

     // Add a new cat to the list
    addCat: (req, res) => {
        const { name, age } = req.body;
        if (!name || !age){
            res.status(400).send('Please provide a valid name and age');
        } else {
            const newCat = {id: String(cats.length + 1), name, age};
            cats.push(newCat);
            res.status(201).json(newCat);
        }
    },

    // Update an existing cat's name and age by ID
    updateCat: (req, res) => {
        const { id } = req.params;
        const { name, age } = req.body;
        const catExist = cats.find((cat) => cat.id === id);
        if (catExist) {
            if (name && age) {
                catExist.name = name;
                catExist.age = age;
                res.status(200).json(catExist)
            } else {
                res.status(400).send('Please provide a valid name & age please!')
            }
        } else {
            res.status(404).send('Cat not found');
        }
    },

    // Delete a specific cat by its ID
    deleteCat: (req, res) => {
        const { id } = req.params;
        cats = cats.filter((cat) => cat.id !== id);
        res.status(200).send('Cat deleted succesfully');
    }
};

export default catControllers;