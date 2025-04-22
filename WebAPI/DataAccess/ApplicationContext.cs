using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;


namespace WebAPI.DataAccess
{       

    public class MsSqlContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public MsSqlContext(DbContextOptions<MsSqlContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Quantity> Quantities { get; set; }
      
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
          => optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection")
          );


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Article>().ToTable("Articles");
            modelBuilder.Entity<Quantity>().ToTable("Quantities");
        }
    }
}
