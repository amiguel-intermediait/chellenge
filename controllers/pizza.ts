import { Request, Response } from "express"
import { hasAllegensService, hasFoodTypeService } from "../services/pizzaService"
import {  arrayStringInterface, foodtypeInterface, ingredientInterface, ingredientTypeInterface, ingredientAllergent } from "../interfaces/interfaces";
const Recipe = require("../models/foodtype") ;
const Ingredient = require("../models/ingredient");
const Foodtype = require("../models/recipe");
export const hasAllergens = async(req: Request, res: Response) => {
    try {
        const { allergens, recipe } = req.body;
        return hasAllegensService(allergens,recipe);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg:"Recipe doesn't exist"
        })
    }
}

export const hasFoodTypes = async(req: Request, res: Response) => {
    try {
        const { foodtype, recipe } = req.body;
        return hasFoodTypeService(foodtype,recipe);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg:"Recipe doesn't exist"
        })
    }
}

export const removefoodTypes = async(req: Request, res: Response) => {
    try {

        return res.json(responseArray);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg:"Recipe doesn't exist"
        })
    }
}

export const removeAllergens = async(req: Request, res: Response) => {
    try {
        const { allergens, recipe } = req.body;
        const { ingredients } = await Recipe.findOne({where: { name: recipe  },
            include: [
              {
                model: Ingredient,
                include: [
                    Foodtype
                ],
              }
            ],
        });
        const ingredientsArray: ingredientAllergent[] = ingredients.map((ingredient: ingredientInterface) => ({
            name: ingredient.name,
            allergen: ingredient.foodtype.isAllergen,
            }
        ));
        const foodtypeArray: arrayStringInterface[] = allergens.map((allergen: string) => ({
            name:allergen
            }
        ));
        let responseArray : ingredientAllergent[] = [];
        for(let i = 0; i < ingredientsArray.length; i++){
            for(let j = 0; j < foodtypeArray.length; j++){
                if(!((ingredientsArray[i].allergen)&&(ingredientsArray[i].name == foodtypeArray[j].name))){
                    responseArray.push(ingredientsArray[i])
                }
            }
        }
        return res.json(responseArray);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg:"Recipe doesn't exist"
        })
    }
}


