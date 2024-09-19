let cats = [
    {id: '1' , name: 'bibi', age: 2},
    {id: '2' , name: 'lili', age: 5},
    {id: '3' , name: 'mimi', age: 1},
    {id: '4' , name: 'didi', age: 3},
    {id: '5' , name: 'gigi', age: 4}
]


const catControllers = {
    getCats:(req, res) => {
        res.status(200).json(cats);
    },
    getCatById: (req, res) => {
        const { id } =req.params;
        const catExist = cats.find((cat) => cat.id === id);
        if(catExist) {
            res.status(200).json(catExist);
        } else {
            res.status(400).send('Cat not found');
        }
    },
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

    deleteCat: (req, res) => {
        const { id } = req.params;
        cats = cats.filter((cat) => cat.id !== id);
        res.status(200).send('Cat deleted succesfully');
    }
};

export default catControllers;