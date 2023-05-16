import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
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
    private recipeService: RecipeService,
    private router:Router) {}

  ngOnInit() {
    // Detect recipe index from route param and determine whether editMode or not
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('id') !== null) {
        this.id = Number(params.get('id'));
        this.editMode = true;
      }
    });

    // Initialize Recipe Form
    this.initForm();
  }

  /**
   * On clicking save button
   * Functionality to submit recipe form
   */
  public onSubmit(): void {
    if (this.editMode) {
      // Update Recipe details using current form details
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      // Add new Recipe using current form details
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    console.log('onSubmit', this.recipeForm);
    this.onCancel();
  }
  

  /**
   * On clicking add ingredient button
   * Functionality to add new ingredient form group to ingredients formArray
   */
  public onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onDeleteIngredient(index:number){
   (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  onCancel(){
     this.router.navigate(['../'],{relativeTo:this.route})
  }

  /**
   * Function to initialize the form
   * 1. Initialize recipe Form
   * 2. If in edit mode, fetch the current recipe details
   * 3. Pre-populate the recipeForm if editing a recipe
   * 4. Pre-populate the ingredients form array
   */
  private initForm(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imagePath: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
    }); //1

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id); //2

      this.recipeForm.patchValue({
        name: recipe.name,
        imagePath: recipe.imagePath,
        description: recipe.description,
      }); //3

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          const ingredients = <FormArray>(
            this.recipeForm.get('ingredients')
          );

          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          ); //4
        }
      }
    }
  }

  /**
   * A getter function to get form controls
   */
  get controls(): any {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
 
}
