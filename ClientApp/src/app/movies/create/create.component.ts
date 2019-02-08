import { Component} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: "app-fetch-data",
  templateUrl: "./create.component.html"
})
export class CreateComponent {
  public movies: Movie;
  
  constructor(private router: Router) {}

  public movie = {
    title: "",
    genre:"",
    releaseDate:"",
    price:""
  }

  add() {
    console.log(this.movie)
    fetch('https://localhost:5001/api/movies',{
      method:"POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(this.movie)
    })
  .then((response) => {
    this.router.navigate(['/movies'])
  })
  }
}
interface Movie {
  title: string;
  genre: string;
  releaseDate: string;
  price: number;
}
