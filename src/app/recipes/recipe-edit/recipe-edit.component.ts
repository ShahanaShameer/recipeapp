import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  ngOnInit() {
    // this.recipeForm = this._formBuilder.group({
    //   name: [ "", Validators.required ],
    //   imagePath:[ "", Validators.required ],
    //   description:[ "", Validators.required ]

    // });
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.initForm();
    });
  }
  onSubmit() {
<<<<<<< HEAD
   
      // // const newRecipe =new Recipe(
      // //   this.recipeForm.value['name'],
      // //   this.recipeForm.value['description'],
      // //   this.recipeForm.value['imagePath'],
      // //   this.recipeForm.value['ingredients'],
      //   )
        if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
     }
     else{
      this.recipeService.addRecipe(this.recipeForm.value)
     }
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'Amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
=======
    console.log(this.recipeForm);
>>>>>>> aca3739a97358a594bf5d4d9703ec87e1c6ee8d2
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      console.log(this.id);

      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      this.recipeForm = new FormGroup({
<<<<<<< HEAD
        name: new FormControl(recipeName,Validators.required),
        imagePath: new FormControl(recipeImagePath,Validators.required),
        description: new FormControl(recipeDescription,Validators.required),
=======
        name: new FormControl(recipeName),
        imagePath: new FormControl(recipeImagePath),
        description: new FormControl(recipeDescription),
>>>>>>> aca3739a97358a594bf5d4d9703ec87e1c6ee8d2
        ingredients: new FormArray([]),
      });

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          const ingredients = this.recipeForm.get('ingredients') as FormArray;

          ingredients.push(
            new FormGroup({
<<<<<<< HEAD
              name: new FormControl(ingredient.name,Validators.required),
              amount: new FormControl(ingredient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ]),
=======
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount),
>>>>>>> aca3739a97358a594bf5d4d9703ec87e1c6ee8d2
            })
          );
        }
      }
    }
  }
  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  } 

}
