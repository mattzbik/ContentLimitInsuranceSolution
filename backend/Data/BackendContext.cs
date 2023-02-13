using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {
        public BackendContext (DbContextOptions<BackendContext> options)
            : base(options)
        {
        }

        public DbSet<Backend.Models.Item> Item { get; set; } = default!;
    }
}
