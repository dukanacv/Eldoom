using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KursPrijavaController : ControllerBase
    {
        private readonly Db _db;
        private readonly KursService _kursService;
        public KursPrijavaController(Db db, KursService kursService)
        {
            _kursService = kursService;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Kurs>>> GetAllKurseviByStudentId(int id)
        {
            List<Kurs> kurseviStudents = new List<Kurs>();

            int[] idKurseva = _db.kurs_prijave
                             .Where(k => k.students_id_student == id)
                             .Select(k => k.kursevi_id_kurs).ToArray();

            foreach (var svakiId in idKurseva)
            {
                var pojedinacni = await this._kursService.GetKursById(svakiId);
                kurseviStudents.Add(pojedinacni);
            }

            return kurseviStudents;

        }
    }
}