using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("kurs_prijave")]
    public class KursPrijava
    {

        [ForeignKey("students_id_student")]
        public Student Student { get; set; }
        public int students_id_student { get; set; }

        [ForeignKey("kursevi_id_kurs")]
        public Kurs Kurs { get; set; }
        public int kursevi_id_kurs { get; set; }

        public DateTime datum_prijave { get; set; }
    }
}