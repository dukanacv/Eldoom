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
    public class KursController : ControllerBase
    {
        private readonly Db _db;

        public KursController(Db db)
        {
            _db = db;
        }

        [HttpGet("osnovni")]
        public async Task<ActionResult<IEnumerable<Kurs>>> GetOsnovni()
        {
            return await this._db.Kursevi.Where(kurs => kurs.pripadnost.Equals("osnovni")).ToListAsync();
        }

        [HttpGet("master")]
        public async Task<ActionResult<IEnumerable<Kurs>>> GetMaster()
        {
            return await this._db.Kursevi.Where(kurs => kurs.pripadnost.Equals("master")).ToListAsync();
        }

        [HttpGet("doktorski")]
        public async Task<ActionResult<IEnumerable<Kurs>>> GetDoktorski()
        {
            return await this._db.Kursevi.Where(kurs => kurs.pripadnost.Equals("doktorski")).ToListAsync();
        }
    }
}