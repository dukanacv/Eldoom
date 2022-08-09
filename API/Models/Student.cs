using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    [Table("students")]
    public class Student
    {

        public int Id { get; set; }

        [Required(ErrorMessage = "Email nije unet")]
        [EmailAddress(ErrorMessage = "Nije dobar format email-a")]
        [StringLength(40, ErrorMessage = "Format se ne podudara")]
        public string email { get; set; }

        [Required(ErrorMessage = "Sifra nije uneta")]
        [StringLength(40, ErrorMessage = "Sifra ne sme biti duza od 40 karaktera")]
        public string password { get; set; }

        [Required(ErrorMessage = "Ime nije uneto")]
        [StringLength(40, ErrorMessage = "Ime ne sme biti duze od 40 karaktera")]
        public string ime { get; set; }

        [Required(ErrorMessage = "Prezime nije uneto")]
        [StringLength(40, ErrorMessage = "Prezime ne sme biti duze od 40 karaktera")]
        public string prezime { get; set; }

        [Required(ErrorMessage = "Broj indeksa nije unet")]
        [StringLength(40, ErrorMessage = "Broj indeksa mora biti vazeci")]
        public string brIndexa { get; set; }
        public DateTime? datumRegistracije { get; set; } = DateTime.Now;

        public List<KursPrijava> Kurs_Prijave { get; set; }
    }
}