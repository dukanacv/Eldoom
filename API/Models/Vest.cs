using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Vest
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Sadrzaj nije unet")]
        [StringLength(100, ErrorMessage = "Sadrzaj ne sme biti duzi od 100 karaktera")]
        public string sadrzaj { get; set; }

        [Required(ErrorMessage = "Naslov nije unet")]
        [StringLength(30, ErrorMessage = "Naslov ne sme biti duzi od 30 karaktera")]
        public string naslov { get; set; }

        public int kursevi_id_kurs { get; set; }

        public int profesori_id_profesor { get; set; }

        [Required(ErrorMessage = "Datum nije unet")]
        public DateTime datum_postavljanja { get; set; } = DateTime.Now;
    }
}