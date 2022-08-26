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

    }
}