using System;

namespace API.Models
{
    public class Student
    {

        public int Id { get; set; }

        public string email { get; set; }
        public string password { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public string brIndexa { get; set; }
        public DateTime? datumRegistracije { get; set; } = DateTime.Now;
    }
}