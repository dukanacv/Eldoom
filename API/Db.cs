using System;
using API.Models;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;

namespace API
{
    public class Db : DbContext
    {
        public Db(DbContextOptions<Db> options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
        public DbSet<Kurs> Kursevi { get; set; }
        public DbSet<Obavestenje> Obavestenja { get; set; }
        public DbSet<KursPrijava> kurs_prijave { get; set; }
        public DbSet<Profesor> Profesori { get; set; }
        public DbSet<Vest> Vesti { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<KursPrijava>()
                .HasKey(c => new { c.students_id_student, c.kursevi_id_kurs, c.datum_prijave });
        }
    }
}