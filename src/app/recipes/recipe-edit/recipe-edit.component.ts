import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent {
  private id: number;
  private editMode = false;
  public recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // Detect recipe index from route param and determine whether editMode or not
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') !== null) {
        this.id = Number(params.get('id'));
        this.editMode = true;
      }
    });

    this.initForm();
  }

  public onSubmit(): void {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }

  public onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('recipeIngredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        Amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  private initForm(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imagePath: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      recipeIngredients: new FormArray([]),
    });

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);

      this.recipeForm.patchValue({
        name: recipe.name,
        imagePath: recipe.imagePath,
        description: recipe.description,
      });

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          const recipeIngredients = this.recipeForm.get(
            'recipeIngredients'
          ) as FormArray;
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
  }

  /**
   * A getter function to get form controls
   */
  get controls(): any {
    return (<FormArray>this.recipeForm.get('recipeIngredients')).controls;
  }
}
