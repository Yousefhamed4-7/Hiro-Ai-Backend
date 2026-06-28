import mongoose, { Schema } from "mongoose";
import type {Document} from "mongoose";


// Interfaces 
export interface IIngrediant extends Document{
  name_en: string;
  name_ar: string;
  quantity: number;
  unit: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  image?: string;
}

export interface IMealItem extends Document{
  meal_name: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  ingredients: IIngrediant[];
  images?: string[];
  videos?: string[];
}




export interface IMealPlan extends Document{
  plan_code: string;
  name: string;
  goal: 'LW'| 'BM'| 'MC'| 'RI';
  target_calories: number;
  category: {
    id: number,
    name_en: string,
    name_ar: string
  };
  meals: IMealItem[],
  images?: string[]
}


const ingredientSchema = new Schema<IIngrediant>({
name_en: {
    type: String,
    required: [true, "English Ingrediant Name Is Required"],
    trim: true,
    unique: true,
  },
  name_ar: {
    type: String,
    required: [true, "Arabiic Ingrediant Name Is Required"],
    trim: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: [true, "Ingrediant Quantity is Required"],
  },
  unit: {
    type: String,
    required: [true, "Ingrediant Unit Is Required"],
  },
  calories: {
    type: Number,
    required: [true, "Ingrediant Calories Is Required"],
  },
  protein_g: {
    type: Number,
    required: [true, "Ingrediant Protein In Grams Is Required"],
  },
  carbs_g: {
    type: Number,
    required: [true, "Ingrediant Carbs In Grams Required"],
  },
  fat_g: {
    type: Number,
    required: [true, "Ingrediant Fats In Grams is Required"],
  },
  image: {
    type: String,
    default: "",
  },
},{
    timestamps: true,
});


const mealItemSchema = new Schema<IMealItem>({
  meal_name: {
    type: String,
    required: [true, "Meal Name Is Required"],
    trim: true,
    unqiue: true,
  },
  calories: {
    type: Number,
    required: [true, "Meal Calories Is Required"],
  },
  protein_g: {
    // TODO: Discuss if its in grams
    type: Number,
    required: [true, "Meal Protein In Grams Is Required"],
  },
  carbs_g: {
    // TODO: Discuss if its in grams
    type: Number,
    required: [true, "Meal Carbs In Grams Is Required"],
  },
  fat_g: {
    // TODO: Discuss if its in grams
    type: Number,
    required: [true, "Meal Fats In Grams Is Required"],
  },
  ingredients: [ingredientSchema],
  images: {
    type: [String],
    default: [],
  },
  videos: {
    type: [String],
    default: [],
  },
},{
    timestamps: true
});

const mealPlanSchema = new Schema<IMealPlan>({
  plan_code: {
    type: String,
    required: [true,"Meal Plan Code Is Required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Meal Plan Name Is Required"],
  },
  goal: {
    type: String,
    enum: ['LW', 'BM', 'MC', 'RI'],
  },
  target_calories: Number,
  category: {
    id: Number,
    name_en: String,
    name_ar: String,
  },
  meals: [mealItemSchema],
  images: {
    type: [String],
    default: [],
},
},{
    timestamps: true,
});

const MealPlan = mongoose.model('MealPlan',mealPlanSchema);

export default MealPlan;





