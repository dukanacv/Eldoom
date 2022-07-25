using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly Db _db;
        private readonly TokenService _tokenService;

        public StudentController(Db db, TokenService tokenService)
        {
            _tokenService = tokenService;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Student>>> GetAllStudents()
        {
            return await this._db.Students.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Student>> GetStudentById(int id)
        {
            return await _db.Students.FindAsync(id);
        }

        [HttpPost("register")]
        public async Task<ActionResult<StudentDto>> RegisterStudent([FromBody] Student student)
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

            return new StudentDto
            {
                ime = student.ime,
                prezime = student.prezime,
                brIndexa = student.brIndexa,
                token = _tokenService.CreateToken(student)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<StudentDto>> Login(LoginDto loginDto)
        {
            var student = await _db.Students.SingleOrDefaultAsync(student => student.brIndexa == loginDto.brIndexa);

            if (student == null)
            {
                return Unauthorized("Student sa brojem indeksa ne postoji.");
            }


            if (!student.password.Equals(loginDto.password))
            {
                return Unauthorized("Niste uneli dobru lozinku");
            }

            return new StudentDto
            {
                ime = student.ime,
                prezime = student.prezime,
                brIndexa = student.brIndexa,
                token = _tokenService.CreateToken(student)
            };
        }


        private async Task<bool> StudentExists(string brIndexa)
        {
            return await _db.Students.AnyAsync(s => s.brIndexa == brIndexa);
        }
    }
}