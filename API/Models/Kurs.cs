using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("kursevi")]
    public class Kurs
    {
        public int Id { get; set; }
        public string naziv { get; set; }
        public string opis { get; set; }
        public int profesori_id_profesor { get; set; }
        public string pripadnost { get; set; }



    }
}