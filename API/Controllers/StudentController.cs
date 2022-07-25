using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly Db _db;

        public StudentController(Db db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents()
        {
            return await this._db.Students.ToListAsync();
        }

        [HttpPost("register")]
        public async Task<ActionResult<Student>> RegisterStudent([FromBody] Student student)
        {
            if (await StudentExists(student.brIndexa))
            {
                return BadRequest("Student sa tim brojem indeksa postoji");
            }

            var noviStudent = new Student
            {
                email = student.email,
                password = student.password,
                ime = student.ime,
                prezime = student.prezime,
                brIndexa = student.brIndexa,
                datumRegistracije = DateTime.Now
            };

            _db.Students.Add(noviStudent);
            await _db.SaveChangesAsync();

            return student;
        }


        private async Task<bool> StudentExists(string brIndexa)
        {
            return await _db.Students.AnyAsync(s => s.brIndexa == brIndexa);
        }
    }
}