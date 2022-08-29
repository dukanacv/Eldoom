using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class KursService : IKursService
    {
        private readonly Db _db;
        public KursService(Db db)
        {
            _db = db;
        }

        public async Task<Kurs> GetKursById(int id)
        {
            return await this._db.Kursevi.FindAsync(id);
        }

        public async Task<int> GetProfesorIdByKursId(int id_kurs)
        {
            var kurs = await _db.Kursevi.FindAsync(id_kurs);

            return kurs.profesori_id_profesor;
        }
    }
}