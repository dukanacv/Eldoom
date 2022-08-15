using System.Threading.Tasks;
using API.Interfaces;
using API.Models;

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
    }
}