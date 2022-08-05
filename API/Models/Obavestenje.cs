namespace API.Models
{
    public class Obavestenje
    {
        public int Id { get; set; }
        public string naslov { get; set; }
        public string sadrzaj { get; set; }
        public int kursevi_id_kurs { get; set; }
    }
}