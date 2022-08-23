using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Obavestenje
    {
        [Key]
        public int Id { get; set; }
        public string naslov { get; set; }
        public string sadrzaj { get; set; }
        public int kursevi_id_kurs { get; set; }
    }
}