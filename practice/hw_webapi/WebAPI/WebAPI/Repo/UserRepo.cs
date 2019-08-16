using System;
using System.Linq;
using WebAPI.Models;

namespace WebAPI.Repo
{
    public class UserRepo
    {
        private UserContext _context;
        
        public UserRepo(UserContext context)
        {
            _context = context;
        }

        public IQueryable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetSingel(Guid id)
        {
            return _context.Users.FirstOrDefault(x => x.Id == id);
        }
    }
}