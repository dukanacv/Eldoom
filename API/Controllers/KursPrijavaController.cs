using System;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KursPrijavaController : ControllerBase
    {
        private readonly Db _db;
        public KursPrijavaController(Db db)
        {
            _db = db;
        }

        [HttpPost]
        public async Task<ActionResult<KursPrijava>> PrijavaNaKurs([FromBody] KursPrijava kursPrijava1)
        {

            if (await PrijavaPostoji(kursPrijava1.students_id_student, kursPrijava1.kursevi_id_kurs))
            {
                return BadRequest("Student je vec prijavljen na ovaj kurs");
            }

            var novaPrijava = new KursPrijava
            {
                students_id_student = kursPrijava1.students_id_student,
                kursevi_id_kurs = kursPrijava1.kursevi_id_kurs,
                datum_prijave = DateTime.Now
            };

            _db.kurs_prijave.Add(novaPrijava);
            await _db.SaveChangesAsync();

            return novaPrijava;
        }

        private async Task<bool> PrijavaPostoji(int id_student, int id_kurs)
        {
            return await _db.kurs_prijave.AnyAsync(kp => kp.students_id_student == id_student && kp.kursevi_id_kurs == id_kurs);
        }

    }
}