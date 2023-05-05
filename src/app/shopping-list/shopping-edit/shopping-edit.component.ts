import { Component, ElementRef,ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  name:string;
  amount:number;

 @ViewChild('nameInput') nameInputRef:ElementRef;
 @ViewChild('amountInput') amountInputRef:ElementRef;
 @ViewChild('shoppinglistForm') shoppinglistForm:ElementRef;

 constructor(private slService : ShoppingListService){} 

  /**
   * function to add item to shopping list
   */
  // onAddItem(){
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient =new Ingredient(ingName , ingAmount);
  //   this.ingredientAdded.emit(newIngredient);
  // }
  onAdditem2(){
    console.log(this.name);
    console.log(this.amount);
    const newIngredient=new Ingredient(this.name,this.amount);
    this.slService.addIngredient(newIngredient); 
    
  }
  submit( ){
    console.log(JSON.stringify(this.name));
    console.log(this.shoppinglistForm);
    
    
  }
  
}
