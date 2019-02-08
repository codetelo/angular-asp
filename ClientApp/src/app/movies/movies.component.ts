import { Observable } from 'rxjs';
import { Component, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Router, ActivatedRoute} from "@angular/router";


@Component({
  selector: "app-fetch-data",
  templateUrl: "./movies.component.html",
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  public movies: Movie[];
  constructor(private http: HttpClient, private router: Router) {
    this.getMovies();

  }


  getMovies(){
    return this.http.get<Movie[]>("https://localhost:5001/api/Movies").subscribe(
      result => {
        result.map((item, i) => {
          let time = new Date(item.releaseDate),
            month = "" + (time.getMonth() + 1),
            day = "" + time.getDate(),
            year = time.getFullYear();
          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;

          item.releaseDate = [year, month, day].join(" / ");
        });
        this.movies = result;
        console.log(this.movies);
      },
      error => console.error(error)
    );
  }
  delete(movie){
    fetch("https://localhost:5001/api/movies/" + movie.id, {
      method: "DELETE"
  }).then(()=>{
    this.getMovies();
  })
      
  
  }
  edit(id){
    this.router.navigate(['/movies/edit/' + id])
  }
}

interface Movie {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  price: number;
}
