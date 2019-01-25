import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from "@angular/forms";
import { HttpHelperService } from "../http-helper.service";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  Members: any;
  DataForm: FormGroup;
  sort_direction = 1;
  constructor(
    private fb: FormBuilder,
    private http: HttpHelperService
  ) { }

  ngOnInit() {
    this.GetData();
    this.DataForm = this.fb.group(
      { "members": this.fb.array([]) }
    );
  }

  GetData() {
    this.http.get('https://api.myjson.com/bins/jpfmg').subscribe((resp: any) => {
      this.Members = resp;
      resp.forEach((element, index) => {
        this.Members[index].class = 'nothing'; 
        this.membersArray.push(
          this.fb.group({
            "id": [element.id],
            "evaluation": [''],
            "comment": ['', [Validators.minLength(3), Validators.maxLength(50), Validators.required]]
          })
        )
      });
    });
  }
  get membersArray() {
    return this.DataForm.get("members") as FormArray;
  }

  MakeDecision(i, n){
    this.membersArray.controls[i].value.evaluation = n;
    this.http.post('https://demo0929535.mockable.io/evaluate', this.membersArray.controls[i].value).subscribe((resp:any)=>{
      if(n == 1){
        this.Members[i].class = 'approved'; 
      }else{
        this.Members[i].class = 'reject'; 
      }
    });
  }

  Sort(){
    if(this.sort_direction == 0){
      this.sort_direction = 1;
      return this.Members.sort((a, b) => {
        return <any>new Date(a.timestamp) - <any>new Date(b.timestamp);
      });
    }else{
      this.sort_direction = 0;
      return this.Members.sort((a, b) => {
        return <any>new Date(b.timestamp) - <any>new Date(a.timestamp);
      });
    }
  }
}
