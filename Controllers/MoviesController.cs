using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using angular_asp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace angular_asp.Controllers {
    [Route ("api/[controller]")]
    public class MoviesController : Controller {
        private readonly MvcMovieContext _context;

        public MoviesController (MvcMovieContext context) {
            _context = context;
        }

        [HttpGet]
        // GET: Movies
        public async Task<ActionResult<IEnumerable<Movie>>> Index () {
            return await _context.Movie.ToListAsync ();
        }

        
        // GET: Movies/5
        [HttpGet ("{id}")]
        public async Task<ActionResult<Movie>> Details (int id) {

            var movie = await _context.Movie.FindAsync (id);

            if (movie == null) {
                return NotFound ();
            }

            return movie;
        }

        // POST: Movies/Create

        [HttpPost]
        // [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create ([FromBody] Movie movie) {
            if (ModelState.IsValid) {
                _context.Add (movie);
                await _context.SaveChangesAsync ();
                return RedirectToAction (nameof (Index));
            } else {
                return BadRequest (ModelState);
            }
        }

        // POST: Movies/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut ("{id}")]
        public async Task<IActionResult> Edit (int id, [FromBody] Movie movie) {
            if (id != movie.Id) {
                return NotFound ();
            } else {
                if (ModelState.IsValid) {
                    try {
                        _context.Update (movie);
                        await _context.SaveChangesAsync ();
                    } catch (DbUpdateConcurrencyException) {
                        if (!MovieExists (movie.Id)) {
                            return NotFound ();
                        } else {
                            throw;
                        }
                    }

                } else {
                    return Ok();
                }
                return Ok();
            }

        }

        [HttpDelete ("{id}")]
        // POST: Movies/Delete/5
        public async Task<IActionResult> Delete (int id) {
            var movie = await _context.Movie.FindAsync (id);
            _context.Movie.Remove (movie);
            await _context.SaveChangesAsync ();
            return Ok ();
        }
        private bool MovieExists (int id) {
            return _context.Movie.Any (e => e.Id == id);
        }
    }
}