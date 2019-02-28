import { Component } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";

@Component({
  selector: "app-fetch-data",
  templateUrl: "./edit.component.html"
})
export class EditComponent {
  public movies: Movie;

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.getMovie();
  }

  public movie = {
    title: "",
    genre: "",
    releaseDate: "",
    price: 0
  };
  getMovie() {
    let id;
    this.route.paramMap.subscribe(params => (id = params.get("id")));

    console.log(id);
    return this.http
      .get<Movie>("https://localhost:5001/api/Movies/" + id)
      .subscribe(result => {
        let time = new Date(result.releaseDate),
          month = "" + (time.getMonth() + 1),
          day = "" + time.getDate(),
          year = time.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        result.releaseDate = [year, month, day].join("-");
        console.log(result);
        this.movie = result;
      });
  }
  edit() {
    let id;
    this.route.paramMap.subscribe(params => (id = params.get("id")));
    console.log(this.movie);
    fetch("https://localhost:5001/api/movies/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.movie)
    }).then(response => {
      this.router.navigate(["/movies"]);
    });
  }
}
interface Movie {
  title: string;
  genre: string;
  releaseDate: string;
  price: number;
}
