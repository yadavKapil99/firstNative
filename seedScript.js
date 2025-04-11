import "dotenv/config";
import mongoose from "mongoose";
import { Category, Product } from "./src/models/index.js";
import { categories, products } from "./seedData.js";

async function seedDatabase() {
  try {
    console.log("==> Called");
    
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoryDoc = await Category.insertMany(categories);
    console.log("==> categoryDoc",categoryDoc);
    

    const categoyMap = categoryDoc.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});
    console.log("==> categoyMap",categoyMap);
    
    // [{"Milk, Curd & Paneer" : '4658891af'}, {"Pharma & Wellness" : "26552652af"}]

    const productWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoyMap[product.category],
    }));
    console.log("==> productWithCategoryIds",productWithCategoryIds);
    

    await Product.insertMany(productWithCategoryIds) 

    console.log("Database SEED Successfully");
  } catch (error) {
    console.error("Error Seeding Database:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();