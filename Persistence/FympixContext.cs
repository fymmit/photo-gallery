using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Persistence
{
    public class FympixContext : DbContext
    {
        public DbSet<Image> Images { get; set; }

        public FympixContext(DbContextOptions<FympixContext> options): base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            builder.UseSqlite("Data Source=fympix.db");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

        }
    }
}