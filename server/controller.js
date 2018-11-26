const myRecipes = [];
const myGroceries =[];
let id = 0;

module.exports = {

    read: (req,res) =>{
        console.log(myRecipes)
        res.status(200).send(myRecipes);
    },

    create: (req,res)=>{
        console.log(req.body);
        req.body.newRecipe.id = id;
        id++
        myRecipes.push(req.body.newRecipe);
        
        res.status(200).send(myRecipes)
    },
    update:(req,res) =>{
        const {title,ingredients,image,date} = req.body.obj;
        console.log("body",req.body, "id", req.params.id)
        let recipeIndex = myRecipes.findIndex(recipe => recipe.id === +req.params.id);
        console.log('recipeIndex',recipeIndex)
        let updatedRecipe = myRecipes[recipeIndex];
        myRecipes[recipeIndex] = {
            title:title,
            ingredients:ingredients,
            image:image,
            date:date,
            id:updatedRecipe.id
        };
        console.log("updated",myRecipes)
        res.status(200).send(myRecipes);
    },
    delete:(req,res)=>{
        let recipeIndex = myRecipes.findIndex(recipe=> recipe.id === +req.params.id);
        console.log('delete index', recipeIndex)
        myRecipes.splice(recipeIndex,1);
        console.log("cehck delete",req.params.id)
        res.status(200).send(myRecipes);
    },
    readGroc: (req,res)=>{
        console.log(myGroceries);
        res.status(200).send(myGroceries);
    },
    createGroc:(req,res)=>{
        console.log(req.body);
        myGroceries.push(req.body.newItem);
        res.status(200).send(myGroceries)
    },
    deleteGroc:(req,res) =>{
        myGroceries.splice(req.params.index,1);
        res.status(200).send(myGroceries);
        console.log(myGroceries,"deleteGroc")
    }

}