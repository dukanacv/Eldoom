using API.Models;

namespace API.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(Student student);
    }
}