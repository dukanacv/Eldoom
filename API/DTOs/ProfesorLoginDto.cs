using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ProfesorLoginDto
    {
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
    }
}