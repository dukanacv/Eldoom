using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class VestiController : ControllerBase
    {
        private readonly Db _db;
        public VestiController(Db db)
        {
            _db = db;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vest>> GetVestById(int id)
        {
            return await _db.Vesti.FindAsync(id);
        }

        [HttpGet("kurs-{id}")]
        public async Task<ActionResult<IEnumerable<Vest>>> GetAllVestiByKursId(int id)
        {
            return await this._db.Vesti.Where(v => v.kursevi_id_kurs == id).ToListAsync();
        }

        [HttpPost("{id_profesora}-{id_kursa}")]
        public async Task<ActionResult<Vest>> PostaviObavestenje(Vest vest,
        [FromRoute] int id_profesora, [FromRoute] int id_kursa)
        {
            var novaVest = new Vest
            {
                sadrzaj = vest.sadrzaj,
                naslov = vest.naslov,
                kursevi_id_kurs = id_kursa,
                profesori_id_profesor = id_profesora,
                datum_postavljanja = DateTime.Now
            };

            _db.Vesti.Add(novaVest);
            await _db.SaveChangesAsync();

            return novaVest;
        }
    }
}