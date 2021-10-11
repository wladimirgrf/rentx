import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const name = "Category Test";
    const description = "Category Description Test";

    await createCategoryUseCase.execute({
      name,
      description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(name);

    expect(categoryCreated).toHaveProperty("id");
    expect(categoryCreated).toHaveProperty("name");
    expect(categoryCreated.name).toBe(name);
  });

  it("should not be able to create a new category with an existing name", async () => {
    const name = "Category Test";
    const description = "Category Description Test";

    await createCategoryUseCase.execute({
      name,
      description,
    });

    await expect(
      createCategoryUseCase.execute({ name, description })
    ).rejects.toBeInstanceOf(AppError);
  });
});
