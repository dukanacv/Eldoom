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
    }
}