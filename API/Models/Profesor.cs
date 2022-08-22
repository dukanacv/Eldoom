using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Profesor
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Email nije unet")]
        [EmailAddress(ErrorMessage = "Nije dobar format email-a")]
        [StringLength(45, ErrorMessage = "Format se ne podudara")]
        public string email { get; set; }

        [Required(ErrorMessage = "Sifra nije uneta")]
        [StringLength(45, ErrorMessage = "Sifra ne sme biti duza od 45 karaktera")]
        public string password { get; set; }

        [Required(ErrorMessage = "Ime nije uneto")]
        [StringLength(45, ErrorMessage = "Ime ne sme biti duze od 45 karaktera")]
        public string ime { get; set; }

        [Required(ErrorMessage = "Prezime nije uneto")]
        [StringLength(45, ErrorMessage = "Prezime ne sme biti duze od 45 karaktera")]
        public string prezime { get; set; }
    }
}