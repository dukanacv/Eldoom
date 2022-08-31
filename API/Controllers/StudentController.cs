using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
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
        public async Task<ActionResult<StudentDto>> RegisterStudent([FromBody] StudentRegisterDto studentRegisterDto)
        {
            if (await StudentExists(studentRegisterDto.brIndexa))
            {
                return BadRequest("Student sa tim brojem indeksa postoji");
            }

            using var hmac = new HMACSHA512();

            var noviStudent = new Student
            {
                email = studentRegisterDto.email,
                password_hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(studentRegisterDto.password)),
                password_salt = hmac.Key,
                ime = studentRegisterDto.ime,
                prezime = studentRegisterDto.prezime,
                brIndexa = studentRegisterDto.brIndexa,
                datumRegistracije = DateTime.Now
            };

            _db.Students.Add(noviStudent);
            await _db.SaveChangesAsync();

            return new StudentDto
            {
                ime = noviStudent.ime,
                prezime = noviStudent.prezime,
                brIndexa = noviStudent.brIndexa,
                token = _tokenService.CreateToken(noviStudent)
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

            using var hmac = new HMACSHA512(student.password_salt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != student.password_hash[i])
                {
                    return Unauthorized("Lozinka nije tacna");
                }
            }

            return new StudentDto
            {
                Id = student.Id,
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