using System.Threading.Tasks;
using API.Models;

namespace API.Interfaces
{
    public interface IKursService
    {
        public Task<Kurs> GetKursById(int id);
    }
}