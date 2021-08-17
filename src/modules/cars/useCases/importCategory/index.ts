import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUserCase";

const importCateogryUseCase = new ImportCategoryUseCase();
const importCategoryController = new ImportCategoryController(
  importCateogryUseCase
);

export { importCategoryController };
