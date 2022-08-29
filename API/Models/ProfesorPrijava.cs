using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("profesor_prijave")]
    public class ProfesorPrijava
    {
        [Key]
        public int Id { get; set; }
        public int students_id_student { get; set; }
        public string student_brIndexa { get; set; }
        public int kursevi_id_kurs { get; set; }
        public int profesori_id_profesor { get; set; }
    }
}