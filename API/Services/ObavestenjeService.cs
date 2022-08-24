using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ObavestenjeService : IObavestenjeService
    {
        private readonly Db _db;
        public ObavestenjeService(Db db)
        {
            _db = db;
        }

        public void Update(Obavestenje obavestenje)
        {
            _db.Entry(obavestenje).State = EntityState.Modified;
        }
    }
}