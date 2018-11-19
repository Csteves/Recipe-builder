const myRecipes = [];
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
    update:{

    },
    delete:(req,res)=>{
        let recipeIndex = myRecipes.findIndex(recipe=> recipe.id === +req.params.id);
        console.log('delete index', recipeIndex)
        myRecipes.splice(recipeIndex,1);
        console.log("cehck delete",req.params.id)
        res.status(200).send(myRecipes);
    }

}