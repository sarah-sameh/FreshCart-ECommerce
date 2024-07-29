import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../shared/services/authService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService, private _Router:Router){}

  msgError:string='';
  isLoading:boolean=false;


  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),



    rePassword: new FormControl(''),


    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , {validators:[this.confirmPassword]} as FormControlOptions);


  confirmPassword( group:FormGroup ):void{

    let password = group.get('password');
    let rePassword = group.get('rePassword');

   if(rePassword?.value == '')
   {
    rePassword?.setErrors({required:true})
   }
   else if(password?.value != rePassword?.value){
    rePassword?.setErrors({mismatch:true})
  }

  }

  handelForm(): void {
    // console.log(this.registerForm.value);

   if(this.registerForm.valid){
    this.isLoading=true;
     
    this._AuthService.setRegister(this.registerForm.value).subscribe({
      next:(response)=>{
       // console.log(response);
        if(response.message=='success'){  //login
          this.isLoading=false;
          this._Router.navigate(['/Login'])
        }
      },
      error:(err:HttpErrorResponse)=>{
        this.isLoading=false;
        this.msgError=err.error.message;
        console.log(err.error.message);
      }
    })
   }
  }
}
