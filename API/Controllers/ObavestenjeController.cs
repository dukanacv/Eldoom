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
    public class ObavestenjeController : ControllerBase
    {
        private readonly Db _db;
        public ObavestenjeController(Db db)
        {
            _db = db;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Obavestenje>> GetObavestenje(int id)
        {
            return await this._db.Obavestenja.FindAsync(id);
        }

        [HttpGet("sva/{kurs_id}")]
        public async Task<ActionResult<IEnumerable<Obavestenje>>> GetObavestenjaByKursId(int kurs_id)
        {
            var kursId = await this._db.Kursevi.FindAsync(kurs_id);

            return await this._db.Obavestenja.Where(lista => lista.kursevi_id_kurs == kurs_id).ToListAsync();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteObavestenjeById(int id)
        {
            var obavestenjeZaObrisati = await _db.Obavestenja.FindAsync(id);

            _db.Obavestenja.Remove(obavestenjeZaObrisati);

            if (await _db.SaveChangesAsync() > 0)
            {
                return Ok();
            }

            return BadRequest("Greska pri brisanju obavestenja.");
        }

        [HttpPost("{id_kursa}")]
        public async Task<ActionResult<Obavestenje>> PostaviObavestenje(Obavestenje obavestenje, [FromRoute] int id_kursa)
        {
            var novoObavestenje = new Obavestenje
            {
                naslov = obavestenje.naslov,
                sadrzaj = obavestenje.sadrzaj,
                kursevi_id_kurs = id_kursa
            };

            _db.Obavestenja.Add(novoObavestenje);
            await _db.SaveChangesAsync();

            return novoObavestenje;
        }
    }
}