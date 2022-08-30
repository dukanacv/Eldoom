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

            var profesorskaPrijava = await _db.profesor_prijave
            .FirstOrDefaultAsync(pp => pp.kursevi_id_kurs == kursPrijava1.kursevi_id_kurs
             && pp.students_id_student == kursPrijava1.students_id_student);


            _db.profesor_prijave.Remove(profesorskaPrijava);
            _db.kurs_prijave.Add(novaPrijava);
            await _db.SaveChangesAsync();

            return novaPrijava;
        }

        private async Task<bool> PrijavaPostoji(int id_student, int id_kurs)
        {
            return await _db.kurs_prijave.AnyAsync(kp => kp.students_id_student == id_student && kp.kursevi_id_kurs == id_kurs);
        }

        private async Task<bool> ProfesorPrijavaPostoji(int id_student, int id_kurs)
        {
            return await _db.profesor_prijave.AnyAsync(pp => pp.students_id_student == id_student && pp.kursevi_id_kurs == id_kurs);
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

        [HttpDelete("odjava/{id_student}-{id_kurs}")]
        public async Task<ActionResult> OdajavaSaKursa(int id_student, int id_kurs)
        {
            if (await PrijavaPostoji(id_student, id_kurs) == false)
            {
                return BadRequest("Niste prijavljeni na ovaj kurs");
            }

            var kureviSaDatimId = await _db.kurs_prijave.Where(kp => kp.students_id_student == id_student).ToListAsync();

            if (kureviSaDatimId == null)
            {
                return NotFound(0);
            }

            var konacni = kureviSaDatimId.Find(kp => kp.kursevi_id_kurs == id_kurs);

            if (konacni != null)
            {
                _db.kurs_prijave.Remove(konacni);
                await _db.SaveChangesAsync();
                return Ok();
            }

            return BadRequest("Greska pri odjavljivanju sa kursa");
        }

        [HttpPost("profesor")]
        public async Task<ActionResult<ProfesorPrijava>> PosaljiPrijavuProfesoru([FromBody] KursPrijava kursPrijava1)
        {

            if (await PrijavaPostoji(kursPrijava1.students_id_student, kursPrijava1.kursevi_id_kurs))
            {
                return BadRequest("Student je vec prijavljen na ovaj kurs");
            }
            if (await ProfesorPrijavaPostoji(kursPrijava1.students_id_student, kursPrijava1.kursevi_id_kurs))
            {
                return BadRequest("Prijava vec postoji");
            }

            var id_profesora = await _kursService.GetProfesorIdByKursId(kursPrijava1.kursevi_id_kurs);

            var brIndex = await _db.Students
                .Where(s => s.Id == kursPrijava1.students_id_student)
                .Select(s => s.brIndexa)
                .SingleOrDefaultAsync();

            var profesorPrijava = new ProfesorPrijava
            {
                students_id_student = kursPrijava1.students_id_student,
                kursevi_id_kurs = kursPrijava1.kursevi_id_kurs,
                profesori_id_profesor = id_profesora,
                student_brIndexa = brIndex
            };

            _db.profesor_prijave.Add(profesorPrijava);
            await _db.SaveChangesAsync();

            return profesorPrijava;
        }

        [HttpGet("profesor/{id}")]
        public async Task<ActionResult<IEnumerable<ProfesorPrijava>>> GetAllProfesorPrijave(int id)
        {
            return await this._db.profesor_prijave.Where(pp => pp.profesori_id_profesor == id).ToListAsync();
        }

    }
}