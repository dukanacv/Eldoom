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
    public class ProfesorController : ControllerBase
    {
        private readonly Db _db;
        private readonly TokenService _tokenService;
        public ProfesorController(Db db, TokenService tokenService)
        {
            _tokenService = tokenService;
            _db = db;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Profesor>> GetProfesorById(int id)
        {
            return await _db.Profesori.FindAsync(id);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ProfesorDto>> Login(ProfesorLoginDto profesorLoginDto)
        {
            var profesor = await _db.Profesori.SingleOrDefaultAsync(p => p.email == profesorLoginDto.email);

            if (profesor == null)
            {
                return Unauthorized("Profesor sa tim mejlom nije registorvan u bazi podataka. Obratite se adminu.");
            }


            if (!profesor.password.Equals(profesorLoginDto.password))
            {
                return Unauthorized("Niste uneli dobru lozinku");
            }

            return new ProfesorDto
            {
                Id = profesor.Id,
                ime = profesor.ime,
                prezime = profesor.prezime,
                email = profesor.email,
                token = _tokenService.CreateProfesorToken(profesor)
            };
        }
    }
}